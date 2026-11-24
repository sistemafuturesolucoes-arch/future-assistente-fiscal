(() => {
  if (window.__futureAssistenteLoaded) return;
  window.__futureAssistenteLoaded = true;

  const API_URL = "https://itbppoailqkuxajesgys.supabase.co/functions/v1/ai-assistant";
  const MANUAL_URL = "https://crm.futuresolucoes.com.br/manual/";
  const host = document.createElement("div");
  host.id = "future-assistente-host";
  document.documentElement.appendChild(host);
  const shadow = host.attachShadow({ mode: "closed" });

  const style = document.createElement("style");
  style.textContent = `
    :host{all:initial}
    .launcher{position:fixed;z-index:2147483646;right:22px;bottom:22px;width:60px;height:60px;border:0;border-radius:50%;cursor:pointer;color:#fff;background:linear-gradient(145deg,#7838c8,#35105f);box-shadow:0 8px 28px #1d123b55;font:700 24px system-ui}
    .panel{position:fixed;z-index:2147483647;right:22px;bottom:94px;width:370px;height:min(590px,calc(100vh - 125px));display:none;flex-direction:column;background:#fff;color:#211b2b;border:1px solid #e6dff0;border-radius:18px;box-shadow:0 18px 60px #17102040;overflow:hidden;font:14px/1.45 system-ui,-apple-system,sans-serif}
    .panel.open{display:flex}.head{background:#35105f;color:#fff;padding:15px 16px;display:flex;align-items:center;justify-content:space-between}
    .brand{font-weight:750;font-size:15px}.sub{font-size:11px;opacity:.8}.close{border:0;background:transparent;color:#fff;font-size:23px;cursor:pointer}
    .actions{padding:10px;display:flex;gap:7px;flex-wrap:wrap;border-bottom:1px solid #eee9f4}
    .chip{border:1px solid #ded4eb;background:#faf8fd;color:#45236b;border-radius:20px;padding:7px 10px;font-size:11px;cursor:pointer}
    .messages{flex:1;overflow:auto;padding:13px;background:#faf9fc}.msg{max-width:90%;padding:10px 12px;margin:0 0 10px;border-radius:13px;white-space:pre-wrap;overflow-wrap:anywhere}.bot{background:#fff;border:1px solid #ece7f2}.user{background:#eee4fa;margin-left:auto;color:#32104f}
    .status{font-size:11px;color:#786c83;padding:5px 13px}.composer{display:flex;gap:8px;padding:10px;border-top:1px solid #eee9f4}.composer textarea{resize:none;flex:1;min-width:0;height:48px;border:1px solid #d9d0e3;border-radius:11px;padding:9px;font:13px system-ui;outline-color:#7840bd}.send{border:0;border-radius:11px;background:#54218a;color:white;padding:0 14px;font-weight:650;cursor:pointer}.send:disabled{opacity:.5;cursor:wait}
    .notice{font-size:10px;color:#81768b;padding:0 12px 9px}.link{color:#6933a5}
    @media(max-width:520px){.panel{right:8px;left:8px;bottom:82px;width:auto;height:calc(100vh - 105px)}.launcher{right:14px;bottom:14px}}
  `;
  shadow.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "launcher";
  launcher.type = "button";
  launcher.title = "Abrir Assistente Future";
  launcher.textContent = "F";
  const panel = document.createElement("section");
  panel.className = "panel";
  panel.innerHTML = `
    <header class="head"><div><div class="brand">Future Assistente Fiscal</div><div class="sub">Ajuda dentro do Emissor</div></div><button class="close" aria-label="Fechar">×</button></header>
    <nav class="actions">
      <button class="chip" data-prompt="Me ajude a entender esta tela e os próximos passos.">Entender esta tela</button>
      <button class="chip" data-prompt="Quero identificar e resolver um erro nesta tela.">Identificar erro</button>
      <button class="chip" data-prompt="Abra o manual relacionado a esta etapa.">Abrir manual</button>
    </nav>
    <div class="messages" aria-live="polite"><div class="msg bot">Olá! Sou o assistente da Future. Posso ajudar a entender a tela, localizar campos e interpretar mensagens de erro. Não vou emitir nem transmitir documentos por você.</div></div>
    <div class="status">Contexto da tela será enviado somente quando você conversar.</div>
    <form class="composer"><textarea aria-label="Digite sua dúvida" placeholder="Digite sua dúvida..." maxlength="3000"></textarea><button class="send" type="submit">Enviar</button></form>
    <div class="notice">Evite enviar CPF/CNPJ, dados de notas, senhas ou PINs. Orientações fiscais devem ser confirmadas com a contabilidade.</div>
  `;
  shadow.append(launcher, panel);

  const messages = panel.querySelector(".messages");
  const form = panel.querySelector("form");
  const input = panel.querySelector("textarea");
  const send = panel.querySelector(".send");
  const status = panel.querySelector(".status");
  const addMessage = (text, role) => {
    const el = document.createElement("div");
    el.className = "msg " + role;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };
  const open = () => { panel.classList.add("open"); input.focus(); };
  launcher.addEventListener("click", () => panel.classList.toggle("open"));
  panel.querySelector(".close").addEventListener("click", () => panel.classList.remove("open"));
  panel.querySelectorAll("[data-prompt]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.prompt === "Abra o manual relacionado a esta etapa.") {
      window.open(MANUAL_URL, "_blank", "noopener");
      return;
    }
    input.value = button.dataset.prompt;
    form.requestSubmit();
  }));

  function safeScreenContext() {
    const title = (document.title || "").slice(0, 120);
    const route = location.pathname.slice(0, 180);
    const headings = [...document.querySelectorAll("h1,h2,h3,[role=heading]")]
      .slice(0, 12).map(el => (el.innerText || "").trim()).filter(Boolean);
    const labels = [...document.querySelectorAll("label")]
      .slice(0, 35).map(el => (el.innerText || "").trim()).filter(Boolean);
    const errors = [...document.querySelectorAll('[role=alert],.error,.invalid-feedback,[aria-live="assertive"]')]
      .slice(0, 10).map(el => (el.innerText || "").trim()).filter(Boolean);
    const redact = value => value
      .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[CPF ocultado]")
      .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, "[CNPJ ocultado]")
      .replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[e-mail ocultado]");
    const text = redact([...headings, ...labels, ...errors].join(" | "));
    return [
      "Aplicação: Emissor Fiscal Online",
      "Rota: " + route,
      "Título: " + title,
      "Títulos e rótulos visíveis (sem valores preenchidos): " + text.slice(0, 5000)
    ].join("\n");
  }

  async function readStream(response, target) {
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error("A IA retornou HTTP " + response.status + (detail ? ": " + detail.slice(0, 300) : ""));
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() || "";
      for (const chunk of chunks) {
        const line = chunk.split("\n").find(item => item.startsWith("data: "));
        if (!line) continue;
        const payload = line.slice(6);
        if (payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload);
          if (event.type === "text-delta" && typeof event.delta === "string") {
            answer += event.delta;
            target.textContent = answer;
            messages.scrollTop = messages.scrollHeight;
          }
        } catch {}
      }
    }
    return answer;
  }

  async function ask(question) {
    const context = safeScreenContext();
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: question + "\n\nCONTEXTO ATUAL DA TELA:\n" + context }]
    };
    const target = addMessage("", "bot");
    send.disabled = true;
    status.textContent = "Consultando o assistente compartilhado da Future...";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMessage], tela: location.pathname.slice(0, 80), knowledge })
      });
      const answer = await readStream(response, target);
      if (!answer) target.textContent = "Não recebi uma resposta desta vez. Tente novamente.";
      status.textContent = knowledge ? "Conectado ao assistente e ao conhecimento publicado do Manual Future." : "Conectado à IA; o Manual não carregou nesta tentativa.";
    } catch (error) {
      target.textContent = "Não consegui conectar ao assistente agora. " + (error?.message || "Tente novamente.");
      status.textContent = "Falha de conexão.";
    } finally {
      send.disabled = false;
      input.focus();
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || send.disabled) return;
    input.value = "";
    addMessage(question, "user");
    ask(question);
  });
})();