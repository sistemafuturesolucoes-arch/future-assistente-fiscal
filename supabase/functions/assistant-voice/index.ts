import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://itbppoailqkuxajesgys.supabase.co";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status: number, error: string) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isRetryable(status: number) {
  return [408, 409, 425, 429, 500, 502, 503, 504].includes(status);
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function resolveVoiceId(apiKey: string): Promise<string | null> {
  const configured = Deno.env.get("ELEVENLABS_VOICE_ID");
  if (configured) return configured;
  const response = await fetch("https://api.elevenlabs.io/v2/voices", {
    headers: { "xi-api-key": apiKey },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return null;
  const data = await response.json() as { voices?: Array<{ voice_id?: string; labels?: Record<string, string>; name?: string }> };
  const voices = data.voices || [];
  const portuguese = voices.find(v => /portuguese|brazil|brasil|pt[-_ ]?br/i.test(
    [v.labels?.language, v.labels?.accent, v.labels?.description, v.name].filter(Boolean).join(" ")
  ));
  return portuguese?.voice_id || null;
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json(405, "Método não permitido.");

  try {
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!apiKey || !serviceKey) return json(503, "Voz natural indisponível; use a voz alternativa do navegador.");

    const clientIp = request.headers.get("cf-connecting-ip")?.trim();
    if (!clientIp) return json(503, "Não foi possível identificar a origem da conexão para proteger o uso de voz. A voz alternativa do navegador continuará disponível.");
    const rateKey = await sha256(clientIp + ":" + serviceKey);
    const rateResponse = await fetch(SUPABASE_URL + "/rest/v1/rpc/consume_assistant_rate_limit", {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: "Bearer " + serviceKey, "Content-Type": "application/json" },
      body: JSON.stringify({ p_rate_key: rateKey }),
      signal: AbortSignal.timeout(4000),
    });
    if (!rateResponse.ok) {
      console.error("Voice rate-limit check failed", rateResponse.status);
      return json(503, "Não foi possível verificar o limite de uso. Tente novamente.");
    }
    const rate = await rateResponse.json();
    if ((rate.minute_count || 0) > 30 || (rate.day_count || 0) > 1000) {
      return new Response(JSON.stringify({ error: "Limite temporário de áudio atingido. A voz alternativa continuará disponível." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
      });
    }

    const body = await request.json() as { text?: unknown; voice_id?: unknown };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text) return json(400, "Texto para narração não informado.");
    if (text.length > 1800) return json(413, "Texto muito longo para uma única narração.");

    const voiceId = typeof body.voice_id === "string" && /^[a-zA-Z0-9_-]{8,64}$/.test(body.voice_id)
      ? body.voice_id
      : await resolveVoiceId(apiKey);
    if (!voiceId) return json(503, "Nenhuma voz disponível na conta ElevenLabs.");

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/stream`, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: Deno.env.get("ELEVENLABS_MODEL_ID") || "eleven_multilingual_v2",
        voice_settings: { stability: 0.48, similarity_boost: 0.78, style: 0.18, use_speaker_boost: true },
        optimize_streaming_latency: 3,
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn("ElevenLabs TTS unavailable", { status: response.status, detail: detail.slice(0, 240) });
      return json(isRetryable(response.status) ? 503 : response.status, "Voz natural temporariamente indisponível; use a voz alternativa.");
    }

    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", response.headers.get("Content-Type") || "audio/mpeg");
    headers.set("Cache-Control", "no-store");
    headers.set("X-Content-Type-Options", "nosniff");
    return new Response(response.body, { status: 200, headers });
  } catch (error) {
    console.error("assistant-voice error", error);
    return json(503, "Voz natural temporariamente indisponível; use a voz alternativa.");
  }
});
