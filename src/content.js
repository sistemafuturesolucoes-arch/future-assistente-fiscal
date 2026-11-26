(() => {
  if (window.__futureAssistenteLoaded) return;
  window.__futureAssistenteLoaded = true;

  const API_URL = "https://itbppoailqkuxajesgys.supabase.co/functions/v1/ai-assistant";
  const MANUAL_URL = "https://crm.futuresolucoes.com.br/manual/";
  const host = document.createElement("div");
  host.id = "future-assistente-host";
  host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;margin:0;padding:0;border:0;width:0;height:0;";
  document.documentElement.appendChild(host);
  const shadow = host.attachShadow({ mode: "closed" });

  const style = document.createElement("style");
  style.textContent = `
    :host{all:initial;pointer-events:none}
    .launcher{pointer-events:auto;position:fixed;z-index:2147483646;right:22px;bottom:22px;left:auto;top:auto;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:60px;height:60px;border:0;border-radius:50%;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;color:#fff;background:linear-gradient(145deg,#7838c8,#35105f);box-shadow:0 8px 28px #1d123b55;font:700 24px system-ui;transition:box-shadow .15s,transform .15s}.launcher:active{cursor:grabbing;transform:scale(.96)}.launcher.dragging{box-shadow:0 12px 34px #1d123b88,0 0 0 4px #b98aff55}
    .panel{pointer-events:auto;position:fixed;z-index:2147483647;right:22px;bottom:94px;width:min(420px,calc(100vw - 16px));height:min(620px,calc(100vh - 32px));max-height:calc(100dvh - 16px);min-height:280px;display:none;flex-direction:column;background:#fff;color:#211b2b;border:1px solid #e6dff0;border-radius:18px;box-shadow:0 18px 60px #17102040;overflow:hidden;font:14px/1.45 system-ui,-apple-system,sans-serif;box-sizing:border-box}
    .panel.open{display:flex}.head{background:#35105f;color:#fff;padding:12px 14px;display:flex;flex-direction:column;align-items:stretch;gap:10px;flex:0 0 auto;box-sizing:border-box}
    .head-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}.brand-wrap{min-width:0;flex:1}.brand{font-weight:750;font-size:15px;line-height:1.25;overflow-wrap:anywhere}.sub{font-size:11px;opacity:.8;margin-top:3px}.head-tools{display:flex;align-items:center;justify-content:flex-start;gap:6px;flex-wrap:wrap;width:100%;min-width:0}.manual-link,.sound-toggle,.review-button,.voice-toggle,.tour-button{border:1px solid #ffffff55;background:#ffffff16;color:#fff;border-radius:8px;padding:7px 9px;font:600 11px/1.2 system-ui;cursor:pointer;min-height:32px;box-sizing:border-box;white-space:nowrap}.review-button{background:#a875e8;border-color:#d6b7ff;color:#241039}.review-button:disabled{opacity:.7;cursor:wait}.sound-toggle{min-width:34px;padding:6px}.sound-toggle[aria-pressed="false"],.voice-toggle[aria-pressed="false"]{opacity:.55}.close{flex:0 0 34px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:1px solid #ffffff66;border-radius:9px;background:#ffffff18;color:#fff;font-size:24px;line-height:1;cursor:pointer;position:relative;z-index:2}.close:hover{background:#ffffff32}.close:focus-visible,.head-tools button:focus-visible{outline:2px solid #fff;outline-offset:2px}
    .messages{flex:1 1 auto;min-height:0;overflow:auto;padding:13px;background:#faf9fc}.msg{max-width:90%;padding:10px 12px;margin:0 0 10px;border-radius:13px;white-space:pre-wrap;overflow-wrap:anywhere}.msg a{color:#6530a0;text-decoration:underline;font-weight:650;cursor:pointer}.bot{background:#fff;border:1px solid #ece7f2}.user{background:#eee4fa;margin-left:auto;color:#32104f}
    .status{flex:0 0 auto;min-width:0;overflow-wrap:anywhere;font-size:11px;color:#786c83;padding:5px 13px}.composer{flex:0 0 auto;display:flex;align-items:flex-end;gap:7px;padding:10px;border-top:1px solid #eee9f4;flex-wrap:wrap}.composer textarea{display:block;position:relative;z-index:1;pointer-events:auto;user-select:text;-webkit-user-select:text;touch-action:manipulation;box-sizing:border-box;resize:vertical;flex:1 1 150px;min-width:110px;min-height:48px;height:48px;max-height:120px;border:1px solid #d9d0e3;border-radius:11px;padding:9px;font:13px/1.35 system-ui;outline-color:#7840bd;background:#fff;color:#211b2b;opacity:1}.send{border:0;border-radius:11px;background:#54218a;color:white;padding:0 14px;height:48px;font-weight:650;cursor:pointer}.send:disabled{opacity:.5;cursor:wait}.stop{width:42px;height:48px;border:1px solid #e4c7d0;border-radius:11px;background:#fff5f6;color:#b4234c;font-size:17px;font-weight:800;cursor:pointer}.stop:disabled{opacity:.35;cursor:default}.attach,.record{height:42px;min-width:38px;border:1px solid #d9d0e3;border-radius:10px;background:#fff;color:#54218a;font-size:18px;cursor:pointer}.record.recording{background:#fff0f0;border-color:#d33;color:#b21f2d}.pending-files{display:flex;gap:5px;flex-wrap:wrap;width:100%;padding:0 1px}.pending-file{display:flex;align-items:center;gap:5px;background:#f0e8f8;border-radius:7px;padding:4px 7px;font-size:10px;color:#452069;max-width:100%}.pending-file span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:190px}.pending-file button{border:0;background:transparent;color:#6c3a90;cursor:pointer;font-size:13px}.hidden-file{display:none}
    .notice{flex:0 0 auto;font-size:10px;color:#81768b;padding:0 12px 9px}
    .review-wash{position:fixed;z-index:2147483640;inset:0;background:rgba(111,45,180,.12);box-shadow:inset 0 0 0 5px rgba(126,65,190,.42);pointer-events:none;transition:background .2s}.review-frame{position:fixed;z-index:2147483644;border:3px solid #8d43d6;border-radius:8px;box-shadow:0 0 0 3px #ffffffcc,0 0 18px #7b2bc8aa;pointer-events:none;box-sizing:border-box}.review-frame.error{border-color:#d83c68;box-shadow:0 0 0 3px #ffffffdd,0 0 18px #d83c68aa}.review-label{position:absolute;left:-3px;top:-25px;max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:6px;padding:3px 7px;background:#54218a;color:white;font:700 10px/1.3 system-ui;box-shadow:0 2px 8px #25103f55}.review-frame.error .review-label{background:#b4234c}
    .spotlight{position:fixed;z-index:2147483645;border:3px solid #ffbf36;border-radius:9px;box-shadow:0 0 0 9999px #160d2866,0 0 12px 5px #ffbf36,0 0 30px 10px #ff8c00;pointer-events:none;transition:all .18s ease}
    .guide-card{position:fixed;z-index:2147483647;width:min(330px,calc(100vw - 28px));box-sizing:border-box;background:#25103f;color:#fff;border:1px solid #b88aff;border-radius:14px;padding:13px;box-shadow:0 12px 40px #12091f88;font:13px/1.45 system-ui;pointer-events:auto}
    .guide-card .guide-kicker{font-size:10px;color:#d7baff;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .guide-card .guide-title{font-size:15px;font-weight:800;margin:4px 0 6px}
    .guide-card .guide-desc{font-size:12px;color:#f2eafa;white-space:pre-wrap}
    .guide-card .guide-controls{display:flex;gap:6px;margin-top:12px;justify-content:flex-end}
    .guide-card button{border:1px solid #9d73c8;border-radius:8px;background:#48216e;color:#fff;padding:7px 9px;font:600 11px system-ui;cursor:pointer}
    .guide-card .guide-end{background:#fff;color:#35105f}.guide-card .guide-hint{font-size:10px;color:#d7baff;margin-top:8px}
    .guide-question{position:fixed;z-index:2147483646;width:34px;height:34px;border:2px solid #fff;border-radius:50%;background:#54218a;color:#fff;font:800 18px/1 system-ui;box-shadow:0 3px 14px #160d2877;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.guide-dismiss{position:fixed;z-index:2147483647;width:19px;height:19px;border:1px solid #fff;border-radius:50%;background:#b4234c;color:#fff;font:800 13px/1 system-ui;box-shadow:0 2px 8px #160d2877;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
    .guide-card[hidden],.guide-question[hidden]{display:none!important}
    .proposal-card{margin-top:9px;padding:10px;border:1px solid #d8c5ef;border-radius:11px;background:#fbf8ff;color:#30213e;font-size:12px}.proposal-title{font-weight:750;margin-bottom:5px}.proposal-field{font-weight:700;margin-top:7px}.proposal-value{padding:7px;margin:4px 0 8px;background:#fff;border:1px solid #e7deef;border-radius:7px;white-space:pre-wrap;overflow-wrap:anywhere}.proposal-actions{display:flex;gap:7px}.proposal-actions button{border:0;border-radius:8px;padding:7px 10px;font:650 11px system-ui;cursor:pointer}.proposal-confirm{background:#54218a;color:#fff}.proposal-cancel{background:#eee8f4;color:#4d3b5c}.proposal-note{font-size:10px;color:#756782;margin-top:7px}
    @media(max-width:520px){.panel{right:8px;left:8px;top:8px;bottom:8px;width:auto;height:auto;max-height:none;min-height:0;border-radius:14px}.head{padding:10px 11px;gap:8px}.head-tools{gap:5px}.head-tools button{font-size:10px;padding:6px 7px;min-height:30px}.close{width:34px;height:34px;flex-basis:34px}.launcher{right:14px;bottom:14px}.messages{min-height:0}.notice{padding-bottom:7px}}
  `;
  shadow.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "launcher";
  launcher.type = "button";
  launcher.title = "Abrir Assistente Future — arraste para mover";
  launcher.textContent = "🤖";
  const panel = document.createElement("section");
  panel.className = "panel";
  panel.innerHTML = `
    <header class="head"><div class="head-top"><div class="brand-wrap"><div class="brand">Future Assistente Fiscal</div><div class="sub">Seu copiloto dentro do Emissor</div></div><button class="close" type="button" aria-label="Fechar" title="Fechar assistente">×</button></div><nav class="head-tools" aria-label="Ferramentas do assistente"><button class="tour-button" type="button" title="Aprenda uma função do Emissor passo a passo">🧭 Tour guiado</button><button class="review-button" type="button">Revisar documento</button><button class="voice-toggle" type="button" aria-label="Ativar conversa por voz" aria-pressed="false" title="Ativar conversa por voz">🎙️ Voz</button><button class="sound-toggle" type="button" aria-label="Ativar ou desativar alertas sonoros" aria-pressed="true" title="Alertas sonoros">🔔 Som</button><button class="manual-link" type="button">Manual</button></nav></header>
    <div class="messages" aria-live="polite"><div class="msg bot">Olá! Sou o assistente da Future. Posso ajudar a entender a tela, localizar campos e interpretar mensagens de erro. Também posso destacar campos e botões para orientar você visualmente. Não vou emitir nem transmitir documentos por você.</div></div>
    <div class="status">O Manual será consultado conforme a tela atual.</div>
    <form class="composer"><div class="pending-files" aria-live="polite"></div><input class="hidden-file" type="file" accept="image/*,audio/*,application/xml,text/xml,.xml" multiple><button class="attach" type="button" title="Anexar print, áudio ou XML" aria-label="Anexar print, áudio ou XML">📎</button><button class="record" type="button" title="Gravar áudio" aria-label="Gravar áudio">🎙</button><textarea aria-label="Digite sua dúvida" placeholder="Digite sua dúvida ou cole um print..." maxlength="3000"></textarea><button class="stop" type="button" title="Parar a conversa atual" aria-label="Parar a conversa atual" disabled>■</button><button class="send" type="submit">Enviar</button></form>
    <div class="notice">Evite enviar CPF/CNPJ, dados de notas, senhas ou PINs. Orientações fiscais devem ser confirmadas com a contabilidade.</div>
  `;
  shadow.append(launcher, panel);

  const messages = panel.querySelector(".messages");
  const form = panel.querySelector("form");
  const input = panel.querySelector("textarea");
  const send = panel.querySelector(".send");
  const stopButton = panel.querySelector(".stop");
  const fileInput = panel.querySelector(".hidden-file");
  const attachButton = panel.querySelector(".attach");
  const recordButton = panel.querySelector(".record");
  const pendingFilesEl = panel.querySelector(".pending-files");
  const pendingAttachments = [];
  let mediaRecorder = null;
  let recordingStream = null;
  let recordingTimer = null;
  const status = panel.querySelector(".status");
  let conversationMessages = [];
  let guideState = null;
  const GUIDE_SESSION_KEY = "futureAssistenteGuideSession";
  const SOUND_KEY = "futureAssistenteErrorSound";
  let soundEnabled = true;
  let audioContext = null;

  function renderPendingAttachments() {
    pendingFilesEl.replaceChildren();
    pendingAttachments.forEach((file, index) => {
      const chip = document.createElement("div");
      chip.className = "pending-file";
      const name = document.createElement("span");
      const fileIcon = file.mediaType.startsWith("image/") ? "🖼 " : file.mediaType.includes("xml") ? "📄 " : "🎧 ";
      name.textContent = fileIcon + file.name;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "×";
      remove.title = "Remover anexo";
      remove.addEventListener("click", () => {
        pendingAttachments.splice(index, 1);
        renderPendingAttachments();
      });
      chip.append(name, remove);
      pendingFilesEl.appendChild(chip);
    });
  }

  function fileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
      reader.readAsDataURL(file);
    });
  }

  async function addAttachment(file) {
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isAudio = file.type.startsWith("audio/");
    const isXml = file.type.includes("xml") || (file.name || "").toLowerCase().endsWith(".xml");
    if (!isImage && !isAudio && !isXml) {
      status.textContent = "Anexe imagens, áudio ou arquivos XML (.xml).";
      return;
    }
    if (isImage && file.size > 6 * 1024 * 1024) {
      status.textContent = "Cada imagem deve ter até 6 MB.";
      return;
    }
    if (isAudio && file.size > 8 * 1024 * 1024) {
      status.textContent = "O áudio deve ter até 8 MB.";
      return;
    }
    if (isXml && file.size > 1500 * 1024) {
      status.textContent = "O XML deve ter até 1,5 MB.";
      return;
    }
    const queuedBytes = pendingAttachments.reduce((total, item) => total + item.size, 0);
    if (queuedBytes + file.size > 12 * 1024 * 1024) {
      status.textContent = "O total de anexos por mensagem deve ter até 12 MB para manter o envio estável.";
      return;
    }
    if (isImage && pendingAttachments.filter(item => item.mediaType.startsWith("image/")).length >= 3) {
      status.textContent = "Envie no máximo três imagens por mensagem.";
      return;
    }
    if (isAudio && pendingAttachments.some(item => item.mediaType.startsWith("audio/"))) {
      status.textContent = "Envie apenas um áudio por mensagem.";
      return;
    }
    if (isXml && pendingAttachments.some(item => item.mediaType.includes("xml"))) {
      status.textContent = "Envie apenas um XML por mensagem.";
      return;
    }
    try {
      const url = await fileAsDataUrl(file);
      pendingAttachments.push({ name: file.name || (isImage ? "print.png" : isXml ? "documento.xml" : "audio.webm"), mediaType: isXml ? "application/xml" : isAudio ? (file.type || "audio/webm") : file.type, size: file.size, url });
      renderPendingAttachments();
      status.textContent = "Anexo pronto. Escreva sua pergunta ou envie diretamente.";
    } catch (error) {
      status.textContent = error.message || "Falha ao preparar o anexo.";
    }
  }

  attachButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const files = [...(fileInput.files || [])];
    for (const file of files) await addAttachment(file);
    fileInput.value = "";
  });

  input.addEventListener("pointerdown", () => {
    if (!panel.classList.contains("open")) return;
    input.focus({ preventScroll: true });
  });

  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (!send.disabled) form.requestSubmit();
    }
  });

  input.addEventListener("paste", async event => {
    const images = [...(event.clipboardData?.items || [])]
      .filter(item => item.type.startsWith("image/"))
      .map(item => item.getAsFile()).filter(Boolean);
    if (!images.length) return;
    event.preventDefault();
    for (const file of images) await addAttachment(file);
  });

  recordButton.addEventListener("click", async () => {
    if (mediaRecorder?.state === "recording") {
      mediaRecorder.stop();
      recordButton.disabled = true;
      recordButton.textContent = "…";
      status.textContent = "Finalizando gravação...";
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      status.textContent = "Este navegador não disponibilizou gravação de áudio. Você pode anexar um áudio já gravado.";
      return;
    }
    try {
      recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      mediaRecorder = new MediaRecorder(recordingStream, { mimeType });
      const chunks = [];
      mediaRecorder.ondataavailable = event => { if (event.data?.size) chunks.push(event.data); };
      mediaRecorder.onstop = async () => {
        clearTimeout(recordingTimer);
        recordingStream?.getTracks().forEach(track => track.stop());
        recordingStream = null;
        const blob = new Blob(chunks, { type: "audio/webm" });
        if (blob.size) await addAttachment(new File([blob], "gravacao-future.webm", { type: "audio/webm" }));
        mediaRecorder = null;
        recordButton.disabled = false;
        recordButton.textContent = "🎙";
        recordButton.classList.remove("recording");
        recordButton.title = "Gravar áudio";
      };
      mediaRecorder.start();
      recordButton.classList.add("recording");
      recordButton.textContent = "⏹";
      recordButton.title = "Parar gravação";
      status.textContent = "Gravando. Clique novamente para finalizar (máximo de 60 segundos).";
      recordingTimer = setTimeout(() => {
        if (mediaRecorder?.state === "recording") mediaRecorder.stop();
      }, 60000);
    } catch (error) {
      status.textContent = "Não foi possível acessar o microfone. Verifique a permissão do site no Chrome.";
      recordButton.classList.remove("recording");
    }
  });

  function renderSafeMarkdown(value, target) {
    target.replaceChildren();
    const appendInline = (parent, line) => {
      const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*/g;
      let cursor = 0;
      let match;
      while ((match = pattern.exec(line))) {
        if (match.index > cursor) parent.appendChild(document.createTextNode(line.slice(cursor, match.index)));
        if (match[1] !== undefined) {
          const label = match[1];
          const rawHref = match[2].trim();
          let href = null;
          try {
            const manualBase = new URL(MANUAL_URL);
            const normalizedPath = rawHref.startsWith("/aula/") ? rawHref.slice(1) : rawHref;
            const parsed = new URL(normalizedPath, manualBase);
            if (parsed.protocol === "https:" && (parsed.origin === manualBase.origin || /^https:/.test(rawHref))) href = parsed.href;
          } catch {}
          if (href) {
            const anchor = document.createElement("a");
            anchor.href = href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.textContent = label;
            parent.appendChild(anchor);
          } else parent.appendChild(document.createTextNode(label));
        } else {
          const strong = document.createElement("strong");
          strong.textContent = match[3];
          parent.appendChild(strong);
        }
        cursor = pattern.lastIndex;
      }
      if (cursor < line.length) parent.appendChild(document.createTextNode(line.slice(cursor)));
    };
    const lines = String(value || "").split(/\r?\n/);
    lines.forEach((line, index) => {
      if (index) target.appendChild(document.createElement("br"));
      appendInline(target, line);
    });
  }

  const addMessage = (text, role) => {
    const el = document.createElement("div");
    el.className = "msg " + role;
    if (role === "bot") renderSafeMarkdown(text, el);
    else el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };

  // Modo de conversa por voz: frases livres seguem para a mesma IA, sem comandos decorados.
  const voiceButton = panel.querySelector(".voice-toggle");
  const VOICE_API_URL = "https://itbppoailqkuxajesgys.supabase.co/functions/v1/assistant-voice";
  let voiceModeActive = false;
  let voiceRecognition = null;
  let voiceAudio = null;
  let voiceObjectUrl = null;
  let voiceRestartTimer = null;
  let voiceIsSpeaking = false;
  let voiceRequestPending = false;

  function cleanSpeechText(value) {
    return String(value || "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[FUTURE_FIELD_PROPOSAL\][\s\S]*?\[\/FUTURE_FIELD_PROPOSAL\]/g, "")
      .replace(/\[VISUAL:[^\]]+\]/g, "")
      .replace(/\[ERROR_MEDIA_(?:IMAGE|VIDEO):[^\]]+\]/g, "")
      .replace(/\[\[\/FUTURE_FIELD_PROPOSAL\]\]/g, "")
      .replace(/[*_#`]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ").trim().slice(0, 1800);
  }

  function stopVoicePlayback() {
    voiceIsSpeaking = false;
    if (voiceAudio) { voiceAudio.onended = null; voiceAudio.onerror = null; voiceAudio.pause(); voiceAudio.removeAttribute("src"); voiceAudio.load?.(); voiceAudio = null; }
    if (voiceObjectUrl) { URL.revokeObjectURL(voiceObjectUrl); voiceObjectUrl = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function startVoiceRecognition() {
    if (!voiceModeActive || voiceRequestPending || voiceIsSpeaking || !voiceRecognition) return;
    try { voiceRecognition.start(); } catch {}
  }

  function scheduleVoiceRecognition() {
    clearTimeout(voiceRestartTimer);
    if (voiceModeActive && !voiceRequestPending && !voiceIsSpeaking) {
      voiceRestartTimer = window.setTimeout(startVoiceRecognition, 450);
    }
  }

  function speakWithBrowserVoice(text) {
    if (!voiceModeActive || !("speechSynthesis" in window)) {
      voiceIsSpeaking = false;
      status.textContent = "O áudio não está disponível neste dispositivo. O chat continua funcionando.";
      scheduleVoiceRecognition();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const portuguese = voices.find(voice => /^pt-BR$/i.test(voice.lang)) || voices.find(voice => /^pt/i.test(voice.lang));
    if (portuguese) utterance.voice = portuguese;
    utterance.onend = () => {
      voiceIsSpeaking = false;
      status.textContent = "Modo de voz ativo. Pode continuar falando naturalmente.";
      scheduleVoiceRecognition();
    };
    utterance.onerror = () => {
      voiceIsSpeaking = false;
      status.textContent = "Não consegui reproduzir a voz. O chat continua disponível.";
      scheduleVoiceRecognition();
    };
    window.speechSynthesis.speak(utterance);
    status.textContent = "Usando a voz alternativa do dispositivo.";
  }

  async function speakAssistantReply(value) {
    if (!voiceModeActive) return;
    const text = cleanSpeechText(value);
    if (!text) return;
    voiceIsSpeaking = true;
    status.textContent = "Preparando resposta falada...";
    try {
      const response = await fetch(VOICE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": "sb_publishable_J3-cgRigKn2QardNRaOFRQ_Jja51yof" },
        body: JSON.stringify({ text })
      });
      if (!response.ok) throw new Error("ElevenLabs indisponível: " + response.status);
      if (!voiceModeActive) return;
      const blob = await response.blob();
      if (!voiceModeActive) return;
      if (!blob.size) throw new Error("Áudio vazio.");
      voiceObjectUrl = URL.createObjectURL(blob);
      voiceAudio = new Audio(voiceObjectUrl);
      voiceAudio.onended = () => {
        stopVoicePlayback();
        status.textContent = "Modo de voz ativo. Pode continuar falando naturalmente.";
        scheduleVoiceRecognition();
      };
      voiceAudio.onerror = () => {
        stopVoicePlayback();
        voiceIsSpeaking = true;
        speakWithBrowserVoice(text);
      };
      await voiceAudio.play();
      status.textContent = "Future está falando.";
    } catch (error) {
      console.warn("ElevenLabs indisponível; usando voz do navegador.", error);
      voiceIsSpeaking = true;
      speakWithBrowserVoice(text);
    }
  }

  function submitVoiceText(transcript) {
    const question = String(transcript || "").trim();
    if (!question || requestInProgress) return;
    addMessage(question, "user");
    voiceRequestPending = true;
    ask(question, []).finally(() => {
      voiceRequestPending = false;
      scheduleVoiceRecognition();
    });
  }

  function setVoiceMode(enabled) {
    voiceModeActive = enabled;
    voiceButton.setAttribute("aria-pressed", String(enabled));
    voiceButton.textContent = enabled ? "🎧" : "🎙️";
    voiceButton.title = enabled ? "Desativar conversa por voz" : "Ativar conversa por voz";
    if (!enabled) {
      clearTimeout(voiceRestartTimer);
      try { voiceRecognition?.stop(); } catch {}
      stopVoicePlayback();
      status.textContent = "Modo de voz desativado. Você pode continuar pelo chat.";
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      voiceModeActive = false;
      voiceButton.setAttribute("aria-pressed", "false");
      voiceButton.textContent = "🎙️";
      status.textContent = "Este navegador não oferece reconhecimento de voz. Atualize o Chrome.";
      return;
    }
    if (!voiceRecognition) {
      voiceRecognition = new Recognition();
      voiceRecognition.lang = "pt-BR";
      voiceRecognition.continuous = false;
      voiceRecognition.interimResults = false;
      voiceRecognition.maxAlternatives = 1;
      voiceRecognition.onresult = event => {
        const transcript = event.results?.[event.results.length - 1]?.[0]?.transcript || "";
        if (transcript.trim()) submitVoiceText(transcript);
      };
      voiceRecognition.onerror = event => {
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setVoiceMode(false);
          status.textContent = "Permita o acesso ao microfone para conversar por voz.";
        } else if (event.error !== "no-speech" && event.error !== "aborted") {
          status.textContent = "Não consegui ouvir com clareza. Pode falar novamente.";
        }
      };
      voiceRecognition.onend = scheduleVoiceRecognition;
    }
    status.textContent = "Modo de voz ativado. Pode falar naturalmente; a Future está ouvindo.";
    startVoiceRecognition();
  }

  voiceButton.addEventListener("click", () => setVoiceMode(!voiceModeActive));

  const UPDATE_NOTICE_KEY = "futureAssistentePendingUpdateNotice";
  if (globalThis.chrome?.storage?.local) {
    chrome.storage.local.get(UPDATE_NOTICE_KEY).then(result => {
      const notice = result?.[UPDATE_NOTICE_KEY];
      if (!notice || notice.version === chrome.runtime.getManifest().version) return;
      addMessage("Future Assistente atualizado para a versão " + notice.version + ". As melhorias já estão disponíveis.", "bot");
      chrome.storage.local.remove(UPDATE_NOTICE_KEY);
    }).catch(() => {});
  }
  const LAUNCHER_POSITION_KEY = "futureAssistenteLauncherPosition";
  let launcherPosition = null;
  let dragPointer = null;
  let suppressLauncherClickUntil = 0;

  function applyLauncherPosition(xRatio, yRatio) {
    const maxX = Math.max(0, window.innerWidth - launcher.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - launcher.offsetHeight);
    const x = Math.min(maxX, Math.max(0, xRatio * maxX));
    const y = Math.min(maxY, Math.max(0, yRatio * maxY));
    launcher.style.left = x + "px";
    launcher.style.top = y + "px";
    launcher.style.right = "auto";
    launcher.style.bottom = "auto";
    launcherPosition = { xRatio: maxX ? x / maxX : 1, yRatio: maxY ? y / maxY : 1 };
  }

  function saveLauncherPosition() {
    if (!launcherPosition || !globalThis.chrome?.storage?.local) return;
    chrome.storage.local.set({ [LAUNCHER_POSITION_KEY]: launcherPosition });
  }

  if (globalThis.chrome?.storage?.local) {
    chrome.storage.local.get(LAUNCHER_POSITION_KEY, result => {
      const saved = result?.[LAUNCHER_POSITION_KEY];
      if (saved && Number.isFinite(saved.xRatio) && Number.isFinite(saved.yRatio)) {
        applyLauncherPosition(saved.xRatio, saved.yRatio);
      }
    });
  }

  launcher.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;
    const rect = launcher.getBoundingClientRect();
    dragPointer = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false
    };
    launcher.setPointerCapture?.(event.pointerId);
  });

  launcher.addEventListener("pointermove", event => {
    if (!dragPointer || dragPointer.id !== event.pointerId) return;
    const dx = event.clientX - dragPointer.startX;
    const dy = event.clientY - dragPointer.startY;
    if (!dragPointer.moved && Math.hypot(dx, dy) < 5) return;
    dragPointer.moved = true;
    launcher.classList.add("dragging");
    const maxX = Math.max(0, window.innerWidth - launcher.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - launcher.offsetHeight);
    const x = Math.min(maxX, Math.max(0, event.clientX - dragPointer.offsetX));
    const y = Math.min(maxY, Math.max(0, event.clientY - dragPointer.offsetY));
    applyLauncherPosition(maxX ? x / maxX : 1, maxY ? y / maxY : 1);
    positionPanelNearLauncher();
  });

  function finishLauncherDrag(event) {
    if (!dragPointer || (event && dragPointer.id !== event.pointerId)) return;
    if (dragPointer.moved) {
      saveLauncherPosition();
      suppressLauncherClickUntil = Date.now() + 350;
    }
    dragPointer = null;
    launcher.classList.remove("dragging");
  }
  launcher.addEventListener("pointerup", finishLauncherDrag);
  launcher.addEventListener("pointercancel", finishLauncherDrag);
  window.addEventListener("resize", () => {
    if (launcherPosition) applyLauncherPosition(launcherPosition.xRatio, launcherPosition.yRatio);
    positionPanelNearLauncher();
  });

  function positionPanelNearLauncher() {
    if (!panel.classList.contains("open")) return;
    const launcherRect = launcher.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const width = panelRect.width || Math.min(370, window.innerWidth - 16);
    const height = panelRect.height || Math.min(590, window.innerHeight - 125);
    let left = Math.max(8, Math.min(window.innerWidth - width - 8, launcherRect.right - width));
    let top = launcherRect.top - height - 12;
    if (top < 8) top = launcherRect.bottom + 12;
    top = Math.max(8, Math.min(window.innerHeight - height - 8, top));
    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  }

  const panelHeader = panel.querySelector(".head");
  let panelDrag = null;
  panelHeader.style.cursor = "move";
  panelHeader.style.touchAction = "none";
  panelHeader.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest("button, a, input, textarea, select")) return;
    const rect = panel.getBoundingClientRect();
    panelDrag = { id: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
    panelHeader.setPointerCapture?.(event.pointerId);
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  });
  panelHeader.addEventListener("pointermove", event => {
    if (!panelDrag || panelDrag.id !== event.pointerId) return;
    const maxX = Math.max(0, window.innerWidth - panel.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - panel.offsetHeight);
    const left = Math.min(maxX, Math.max(0, event.clientX - panelDrag.offsetX));
    const top = Math.min(maxY, Math.max(0, event.clientY - panelDrag.offsetY));
    panel.style.left = left + "px";
    panel.style.top = top + "px";
  });
  const finishPanelDrag = event => {
    if (!panelDrag || (event && panelDrag.id !== event.pointerId)) return;
    panelDrag = null;
  };
  panelHeader.addEventListener("pointerup", finishPanelDrag);
  panelHeader.addEventListener("pointercancel", finishPanelDrag);

  launcher.addEventListener("click", () => {
    if (Date.now() < suppressLauncherClickUntil) return;
    const opening = !panel.classList.contains("open");
    panel.classList.toggle("open", opening);
    positionPanelNearLauncher();
    if (opening) requestAnimationFrame(() => input.focus({ preventScroll: true }));
  });
  if (globalThis.chrome?.runtime?.onMessage) {
    chrome.runtime.onMessage.addListener(message => {
      if (message?.type === "FUTURE_ASSISTENTE_OPEN") {
        panel.classList.add("open");
        positionPanelNearLauncher();
        input.focus();
      }
    });
  }
  panel.querySelector(".close").addEventListener("click", () => { if (reviewActive) clearDocumentReview(); panel.classList.remove("open"); launcher.focus({ preventScroll: true }); });
  panel.querySelector(".manual-link").addEventListener("click", () => window.open(MANUAL_URL, "_blank", "noopener"));

  const tourButton = panel.querySelector(".tour-button");
  tourButton.addEventListener("click", () => {
    if (requestInProgress) return;
    const question = "[TOUR GUIADO] Faça um tour interativo da função disponível nesta tela. Consulte primeiro o Manual Future e identifique a aula correspondente. Explique em português simples, uma etapa por vez. Comece por uma única ação que exista e esteja visível agora, usando o rótulo exato do controle. Destaque esse elemento na tela e aguarde o usuário clicar; depois detecte a mudança de tela e continue do ponto correto até concluir o procedimento. Não liste várias etapas de uma vez, não repita ações já confirmadas, não clique nem preencha pelo usuário e nunca execute emissão, transmissão ou autorização. Se não houver uma aula correspondente ou não localizar o controle com segurança, explique isso e peça um print.";
    addMessage("Vamos começar o tour guiado desta tela.", "user");
    ask(question, []);
  });

  const reviewButton = panel.querySelector(".review-button");
  let reviewActive = false;
  let reviewWash = null;
  let reviewFrames = [];
  let reviewReposition = null;

  function clearDocumentReview() {
    reviewActive = false;
    reviewWash?.remove();
    reviewWash = null;
    reviewFrames.forEach(item => item.frame.remove());
    reviewFrames = [];
    shadow.querySelectorAll(".review-issue-cards").forEach(card => card.remove());
    if (reviewReposition) {
      document.removeEventListener("scroll", reviewReposition, true);
      window.removeEventListener("resize", reviewReposition);
    }
    reviewReposition = null;
    reviewButton.disabled = false;
    reviewButton.textContent = "Revisar documento";
  }

  function isVisibleOnPage(el) {
    if (!el || host.contains(el) || !el.isConnected) return false;
    const rect = el.getBoundingClientRect();
    const css = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && css.display !== "none" && css.visibility !== "hidden" && css.opacity !== "0";
  }

  function fieldForErrorNode(errorNode) {
    if (!errorNode) return null;
    const id = errorNode.id;
    if (id) {
      const described = [...document.querySelectorAll("[aria-describedby]")].filter(control =>
        (control.getAttribute("aria-describedby") || "").split(/\s+/).includes(id) &&
        control.matches("input,select,textarea,[role=combobox],[role=textbox]") && isVisibleOnPage(control)
      );
      if (described.length === 1) return described[0];
    }
    const wrapper = errorNode.closest(".form-group,.form-field,.field,.form-item,[data-field-wrapper],fieldset,[class*=field]");
    if (wrapper) {
      const controls = [...wrapper.querySelectorAll("input,select,textarea,[role=combobox],[role=textbox]")].filter(isVisibleOnPage);
      if (controls.length === 1) return controls[0];
    }
    const previous = errorNode.previousElementSibling;
    if (previous?.matches?.("input,select,textarea,[role=combobox],[role=textbox]") && isVisibleOnPage(previous)) return previous;
    return null;
  }

  function collectVisibleFiscalReturnMessages() {
    const candidates = [...document.querySelectorAll("body *")].filter(el => {
      if (host.contains(el) || !isVisibleOnPage(el)) return false;
      const text = String(el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
      return text.length >= 20 && text.length <= 1200 &&
        (/\bE\d{4,5}\b/i.test(text) || /retorno\s+(?:da\s+)?prefeitura/i.test(text)) &&
        /(não é permitido|nao e permitido|não está de acordo|nao esta de acordo|divergência|divergencia|Simples Nacional|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(text);
    });
    const minimal = candidates.filter(el => ![...el.children].some(child => {
      const t = String(child.innerText || child.textContent || "").replace(/\s+/g, " ").trim();
      return t.length >= 20 && t.length <= 1200 &&
        (/\bE\d{4,5}\b/i.test(t) || /retorno\s+(?:da\s+)?prefeitura/i.test(t)) &&
        /(não é permitido|nao e permitido|não está de acordo|nao esta de acordo|divergência|divergencia|Simples Nacional|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(t);
    }));
    return minimal.map(el => String(el.innerText || el.textContent || "").replace(/\s+/g, " ").trim()).slice(0, 5);
  }

  function collectDocumentIssues() {
    const issues = [];
    const seen = new Set();
    const add = (element, message, source) => {
      if (!element || !isVisibleOnPage(element)) return;
      const names = getElementNames(element).filter(Boolean);
      const errorCode = String(message || "").match(/\bE\d{4,5}\b/i)?.[0];
      const title = names[0] || (errorCode ? "Retorno da Prefeitura — " + errorCode : element.matches?.("input,select,textarea") ? "Campo sem rótulo acessível" : "Mensagem de validação");
      const key = title + "|" + normalize(message || source);
      if (seen.has(key)) return;
      seen.add(key);
      issues.push({ element, title: title.slice(0, 100), message: redactSensitiveText(String(message || source || "Validação pendente").slice(0, 350)), source });
    };
    const invalidControls = [...document.querySelectorAll('input:invalid,select:invalid,textarea:invalid,[aria-invalid="true"]')].filter(isVisibleOnPage);
    for (const control of invalidControls) {
      const message = getVisibleErrorMessage(control) || control.getAttribute("aria-errormessage") || "O campo está marcado como inválido ou obrigatório.";
      add(control, message, "campo inválido");
    }
    const errorNodes = [...document.querySelectorAll('[role="alert"],[aria-live="assertive"],.invalid-feedback,.toast-error,[data-state="error"],[class*="error" i],[class*="invalid" i],[class*="alert" i],[class*="toast" i],[data-testid*="error" i],[data-testid*="alert" i]')].filter(isVisibleOnPage);
    const fiscalReturnNodes = [...document.querySelectorAll("body *")].filter(el => {
      if (host.contains(el) || !isVisibleOnPage(el)) return false;
      const text = String(el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length < 20 || text.length > 1200) return false;
      if (!(/\bE\d{4,5}\b/i.test(text) || /retorno\s+(?:da\s+)?prefeitura/i.test(text))) return false;
      return /(não é permitido|nao e permitido|não está de acordo|nao esta de acordo|divergência|divergencia|Simples Nacional|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(text) &&
        ![...el.children].some(child => { const t = String(child.innerText || child.textContent || "").replace(/\s+/g, " ").trim(); return t.length >= 20 && t.length <= 1200 && (/\bE\d{4,5}\b/i.test(t) || /retorno\s+(?:da\s+)?prefeitura/i.test(t)) && /(não é permitido|nao e permitido|não está de acordo|nao esta de acordo|divergência|divergencia|Simples Nacional|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(t); });
    });
    for (const node of fiscalReturnNodes) if (!errorNodes.includes(node)) errorNodes.push(node);
    for (const node of errorNodes) {
      const message = getVisibleErrorMessage(node);
      const fiscalReturn = /\bE\d{4,5}\b/i.test(message) || /retorno\s+(?:da\s+)?prefeitura/i.test(message);
      if (!isLikelyFiscalError(node, message) && !fiscalReturn) continue;
      const target = fieldForErrorNode(node);
      add(target || node, message, target ? "erro associado ao campo" : "rejeição fiscal da prefeitura");
      if (/\bE0160\b/i.test(message)) {
        const simpleNationalFields = [...document.querySelectorAll("input,select,textarea,[role=combobox],[role=radio],[role=checkbox]")]
          .filter(control => isGuideNodeVisible(control) && getElementNames(control).some(name => /simples nacional|situação.*tribut|regime.*tribut|opção.*simples/i.test(name)));
        for (const control of simpleNationalFields.slice(0, 4)) {
          add(control, "O retorno E0160 indica divergência entre a opção do Simples Nacional informada na DPS e a situação cadastrada para o prestador no mês de competência. Confira este campo com o cadastro oficial do Simples Nacional para a competência da nota; não altere por tentativa.", "campo relacionado à rejeição E0160");
        }
      }
      const normalizedMessage = normalize(message);
      if (/\bE0625\b/i.test(message) || (normalizedMessage.includes("aliquota") && normalizedMessage.includes("issqn") && normalizedMessage.includes("retencao"))) {
        const controls = [...document.querySelectorAll("input,select,textarea,[role=combobox],[role=checkbox]")].filter(isGuideNodeVisible);
        const targets = controls.filter(control => getElementNames(control).some(name => {
          const n = normalize(name);
          const groupText = normalize(control.closest(".form-group,.form-field,.field,.form-item,[data-field-wrapper],fieldset")?.innerText || "");
          return n.includes("aliq") && n.includes("iss") || n.includes("iss retido") || n === "retido" && groupText.includes("iss");
        }));
        for (const control of targets.slice(0, 3)) {
          const names = getElementNames(control);
          const name = names.find(value => /aliq.*iss|iss.*retido|retido/i.test(value)) || names[0] || "Campo relacionado ao ISSQN";
          const guidance = /aliq/i.test(name)
            ? "A rejeição E0625 menciona informação de alíquota do ISSQN. Confira se a alíquota informada é permitida para esta operação e para o enquadramento do prestador."
            : "A rejeição E0625 também depende da indicação de retenção do ISSQN. Confira se o ISS deve ser retido nesta operação. Não marque ou desmarque sem validar o enquadramento e a regra aplicável.";
          add(control, guidance, "campo relacionado à rejeição E0625");
        }
      }
    }
    return issues.slice(0, 12);
  }

  function positionReviewFrames() {
    reviewFrames.forEach(({ frame, element }) => {
      if (!element.isConnected) { frame.remove(); return; }
      const rect = element.getBoundingClientRect();
      Object.assign(frame.style, {
        left: Math.max(2, rect.left - 4) + "px", top: Math.max(2, rect.top - 4) + "px",
        width: Math.max(14, rect.width + 8) + "px", height: Math.max(14, rect.height + 8) + "px"
      });
    });
  }

  async function reviewDocument() {
    if (reviewActive || requestInProgress) return;
    reviewActive = true;
    reviewButton.disabled = true;
    reviewButton.textContent = "Revisando…";
    panel.classList.add("open");
    dismissErrorSpotlight();
    reviewWash = document.createElement("div");
    reviewWash.className = "review-wash";
    shadow.appendChild(reviewWash);
    const issues = collectDocumentIssues();
    reviewFrames = issues.map(issue => {
      const frame = document.createElement("div");
      frame.className = "review-frame" + (issue.source.includes("erro") || issue.source.includes("inválido") ? " error" : "");
      const label = document.createElement("span");
      label.className = "review-label";
      label.textContent = issue.title;
      frame.appendChild(label);
      shadow.appendChild(frame);
      return { frame, element: issue.element };
    });
    if (issues[0]) issues[0].element.scrollIntoView?.({ behavior: "smooth", block: "center", inline: "nearest" });
    reviewReposition = positionReviewFrames;
    document.addEventListener("scroll", reviewReposition, true);
    window.addEventListener("resize", reviewReposition);
    positionReviewFrames();
    addMessage("🟣 Revisão iniciada. A tela está destacada em roxo enquanto verifico os campos e mensagens de validação visíveis.", "bot");
    status.textContent = "IA revisando o documento…";
    const issueSummary = issues.length
      ? issues.map((issue, index) => (index + 1) + ". " + issue.title + ": " + issue.message + " (" + issue.source + ")").join("\n")
      : "Nenhum campo inválido ou alerta de erro visível foi identificado pelo navegador nesta tela.";
    const question = [
      "Faça uma revisão orientativa do documento atualmente aberto no Emissor Fiscal.",
      "Sinais visíveis de validação identificados pela extensão (ela não leu os valores preenchidos):", issueSummary,
      "",
      "RESPOSTA DIRETA E CURTA: comece pelo erro identificado e pelo código. Use este formato: ERRO: [o que a prefeitura rejeitou]. ONDE: [nome exato do campo destacado]. CORREÇÃO: [uma ação objetiva para o usuário conferir/fazer]. Se houver dois campos envolvidos, liste os dois separadamente. Explique por que em no máximo duas frases. Não comece com saudação, não faça introdução longa, não repita o manual e não gere roteiro genérico de emissão de nota.",
      "Use o Manual Future e os metadados da tela para explicar a correção. Separe erros confirmados de pontos que apenas merecem conferência. Não invente regras fiscais, NCM, CNAE, códigos, alíquotas ou valores. Se o contexto não permitir afirmar qual valor deve ser usado, diga exatamente qual campo conferir e qual informação falta; não mande alterar por tentativa.",
      "A extensão não lê os valores preenchidos da nota, documentos pessoais, senhas ou certificados. Não afirme que conferiu cálculos ou conteúdo que não foi disponibilizado. Se não houver alertas, diga que a revisão visual não encontrou validações visíveis, mas isso não garante correção fiscal.",
      "Não altere campos, não clique, não salve, não emita, não transmita, não autorize e não encerre o documento. Oriente o usuário sobre cada campo identificado e peça conferência manual quando necessário."
    ].join("\n");
    try {
      const reviewMessage = await ask(question, []);
      const reviewText = String(reviewMessage?.textContent || "").trim();
      if (!reviewText || /Não recebi uma resposta desta vez|Não consegui conectar ao assistente agora|A IA retornou HTTP/i.test(reviewText)) {
        throw new Error("A IA não retornou uma análise válida. Os destaques visuais foram mantidos; tente novamente quando a conexão estiver normal.");
      }
      if (issues.length) renderReviewIssueCards(issues, reviewMessage);
      status.textContent = "Revisão concluída. Confira cada item e use “Destacar no Emissor” para localizar o campo ou aviso."
      addMessage("Revisão concluída. Os contornos mostram os campos ou avisos encontrados. Clique em “Finalizar revisão” para voltar à tela normal.", "bot");
    } catch (error) {
      status.textContent = "Não foi possível concluir a revisão. " + (error?.message || "Tente novamente.");
    } finally {
      reviewButton.disabled = false;
      reviewButton.textContent = "Revisar novamente";
    }
  }

  reviewButton.addEventListener("click", () => {
    if (reviewActive) clearDocumentReview();
    reviewDocument();
  });

  const soundToggle = panel.querySelector(".sound-toggle");
  function renderSoundToggle() {
    soundToggle.textContent = soundEnabled ? "🔔" : "🔕";
    soundToggle.setAttribute("aria-pressed", String(soundEnabled));
    soundToggle.title = soundEnabled ? "Alertas sonoros ativados" : "Alertas sonoros desativados";
  }
  if (globalThis.chrome?.storage?.local) {
    chrome.storage.local.get(SOUND_KEY, result => {
      if (typeof result?.[SOUND_KEY] === "boolean") soundEnabled = result[SOUND_KEY];
      renderSoundToggle();
    });
  }
  soundToggle.addEventListener("click", async () => {
    soundEnabled = !soundEnabled;
    renderSoundToggle();
    if (globalThis.chrome?.storage?.local) chrome.storage.local.set({ [SOUND_KEY]: soundEnabled });
    if (soundEnabled) {
      try {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (AudioCtor) {
          audioContext ||= new AudioCtor();
          await audioContext.resume();
        }
      } catch {}
    }
  });

  function safeScreenContext() {
    const title = (document.title || "").slice(0, 120);
    const route = location.pathname.slice(0, 180);
    const isVisible = el => {
      const rect = el.getBoundingClientRect();
      const css = window.getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && css.display !== "none" && css.visibility !== "hidden";
    };
    const headings = [...document.querySelectorAll("h1,h2,h3,[role=heading]")]
      .filter(isVisible).slice(0, 16).map(el => (el.innerText || "").trim()).filter(Boolean);
    const labels = [...document.querySelectorAll("label")]
      .filter(isVisible).slice(0, 60).map(el => (el.innerText || "").trim()).filter(Boolean);
    const focused = document.activeElement instanceof Element && !host.contains(document.activeElement) ? document.activeElement : null;
    const focusedLabel = focused ? getElementNames(focused).slice(0, 3).join(" / ") : "";
    const controls = [...document.querySelectorAll("input,select,textarea,[role=combobox]")]
      .filter(isVisible).slice(0, 70).map(el => {
        const label = el.labels ? [...el.labels].map(item => (item.innerText || "").trim()).filter(Boolean).join(" / ") : "";
        const aria = el.getAttribute("aria-label") || "";
        const placeholder = el.getAttribute("placeholder") || "";
        const type = el.tagName.toLowerCase() === "input" ? (el.getAttribute("type") || "text") : el.tagName.toLowerCase();
        const flags = [el.required ? "obrigatório" : "", el.disabled ? "desabilitado" : "", el.getAttribute("aria-invalid") === "true" ? "inválido" : ""].filter(Boolean).join(", ");
        const helpIds = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
        const help = helpIds.map(id => document.getElementById(id)?.innerText || "").join(" ").replace(/\s+/g, " ").slice(0, 180);
        return [label || aria || placeholder || el.getAttribute("name") || "Campo sem rótulo", "tipo=" + type, flags, help].filter(Boolean).join(" — ");
      });
    const buttons = [...document.querySelectorAll("button,a,[role=button],[role=menuitem],[role=tab],[data-menu-item],summary,input[type=button],input[type=submit]")]
      .filter(isVisible).slice(0, 120).map(el => (el.innerText || el.textContent || el.getAttribute("aria-label") || el.getAttribute("title") || "").replace(/\s+/g, " ").trim()).filter(Boolean);
    const navigationRoots = [...document.querySelectorAll("nav,aside,[role=navigation],[role=menu],[role=menubar],[role=tree],.dropdown-menu,[class*=submenu i],[class*=sidebar i],[data-sidebar]")].filter(isVisible);
    const navigationSelector = "a,button,[role=menuitem],[role=treeitem],[role=tab],[data-menu-item],[aria-expanded],summary";
    const rootItems = navigationRoots.flatMap(root => [...root.querySelectorAll(navigationSelector)]);
    const navigationCandidates = rootItems.length ? rootItems : [...document.querySelectorAll(navigationSelector)];
    const navigationItems = [...new Set(navigationCandidates)].filter(isVisible).slice(0, 220).map(el => {
      const name = (el.innerText || el.textContent || el.getAttribute("aria-label") || el.getAttribute("title") || "").replace(/\s+/g, " ").trim();
      const disabled = el.disabled || el.getAttribute("aria-disabled") === "true" || el.classList.contains("disabled") ? " [DESABILITADO]" : "";
      const expanded = el.getAttribute("aria-expanded");
      const state = expanded === "true" ? " [ABERTO]" : expanded === "false" ? " [FECHADO]" : "";
      const parent = el.closest("li,[role=group],.dropdown,.submenu,.nav-item");
      const parentName = parent && parent !== el ? (parent.querySelector(":scope > a,:scope > button,:scope > [role=menuitem]")?.innerText || "").replace(/\s+/g, " ").trim() : "";
      return name ? (parentName && normalize(parentName) !== normalize(name) ? parentName + " > " : "") + name.slice(0, 100) + disabled + state : "";
    }).filter(Boolean);
    const visibleMenuText = navigationRoots.map(el => (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim()).filter(text => text.length > 0 && text.length < 2400).slice(0, 24);
    const semanticErrors = [...document.querySelectorAll('[role=alert],.error,.invalid-feedback,[aria-live="assertive"]')]
      .filter(isVisible).slice(0, 15).map(el => (el.innerText || "").trim()).filter(Boolean);
    const fiscalReturns = collectVisibleFiscalReturnMessages();
    const errors = [...new Set([...semanticErrors, ...fiscalReturns])].slice(0, 15);
    const redact = value => value
      .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[CPF ocultado]")
      .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, "[CNPJ ocultado]")
      .replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[e-mail ocultado]");
    return [
      "Aplicação: Emissor Fiscal Online",
      "Rota: " + route,
      "Título: " + title,
      "Títulos e rótulos visíveis (sem valores preenchidos): " + redact([...headings, ...labels, ...errors].join(" | ")).slice(0, 6500),
      "Campo em foco (sem ler o valor digitado): " + redact(focusedLabel || "nenhum") + "\nMetadados dos campos visíveis (nenhum valor digitado é lido): " + redact(controls.join(" | ")).slice(0, 6000),
      "Botões visíveis: " + redact(buttons.join(" | ")).slice(0, 3500),
      "MAPA COMPLETO DA NAVEGAÇÃO VISÍVEL (menus laterais, itens, submenus e estado aberto/fechado): " + redact([...new Set([...navigationItems, ...visibleMenuText])].join(" | ")).slice(0, 14000)
    ].join("\n");
  }

  function redactSensitiveText(value) {
    return String(value || "")
      .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[CPF ocultado]")
      .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, "[CNPJ ocultado]")
      .replace(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[e-mail ocultado]");
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function getElementNames(el) {
    const names = [];
    const add = value => {
      const clean = String(value || "").replace(/\s+/g, " ").trim();
      if (clean && clean.length <= 180 && !names.includes(clean)) names.push(clean);
    };
    try {
      if (el.labels) [...el.labels].forEach(label => add(label.innerText || label.textContent));
    } catch {}
    const labelledBy = (el.getAttribute("aria-labelledby") || "").split(/\s+/).filter(Boolean);
    labelledBy.forEach(id => {
      const label = document.getElementById(id);
      add(label?.innerText || label?.textContent);
    });
    add(el.getAttribute("aria-label"));
    add(el.getAttribute("data-label"));
    add(el.getAttribute("data-field"));
    add(el.getAttribute("data-testid"));
    add(el.getAttribute("data-cy"));
    add(el.getAttribute("data-tooltip"));
    add(el.getAttribute("data-tooltip-content"));
    add(el.getAttribute("aria-description"));
    add(el.getAttribute("placeholder"));
    add(el.getAttribute("title"));
    const wrappingLabel = el.closest("label");
    if (wrappingLabel) add(wrappingLabel.innerText || wrappingLabel.textContent);
    const group = el.closest(".form-group,.form-field,.field,.form-item,[data-field-wrapper],fieldset");
    if (group) {
      group.querySelectorAll(":scope > label,:scope > legend,:scope > .form-label,:scope > .field-label,:scope > [data-label]").forEach(label => {
        if (label !== el && !label.contains(el)) add(label.innerText || label.textContent);
      });
      if (group.tagName === "FIELDSET") add(group.querySelector("legend")?.innerText);
    }
    const id = el.getAttribute("id");
    if (id) {
      const explicit = [...document.querySelectorAll("label[for]")].find(label => label.htmlFor === id);
      if (explicit) add(explicit.innerText || explicit.textContent);
    }
    if (el.matches("button,[role=button],[role=tab],[role=menuitem],[role=treeitem],[data-menu-item],a")) add(el.innerText || el.textContent);
    add(el.getAttribute("name"));
    return names;
  }

  function getElementName(el) {
    return getElementNames(el)[0] || el.getAttribute("name") || el.id || "";
  }

  const GUIDE_NODE_SELECTOR = "input,select,textarea,button,a,[role=button],[role=combobox],[role=checkbox],[role=tab],[role=textbox],[role=radio],[role=switch],[role=menuitem],[role=treeitem],[data-menu-item],nav [tabindex],[role=menu] [tabindex]";

  function isGuideNodeVisible(el) {
    if (!el || host.contains(el)) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" &&
      s.opacity !== "0" && !el.disabled && el.getAttribute("aria-disabled") !== "true" && el.getAttribute("aria-hidden") !== "true";
  }

  function findElementByName(name) {
    const wanted = normalize(name);
    if (!wanted) return null;
    const nodes = [...document.querySelectorAll(GUIDE_NODE_SELECTOR)].filter(isGuideNodeVisible);
    const exact = nodes.filter(el => getElementNames(el).some(label => normalize(label) === wanted));
    return exact.length === 1 ? exact[0] : null;
  }

  function findGuideSteps(answer) {
    // Marcadores automáticos só são permitidos para rótulos exatos em uma instrução
    // acionável. Correspondência aproximada pode apontar para outro menu e foi removida.
    const nodes = [...document.querySelectorAll(GUIDE_NODE_SELECTOR)].filter(isGuideNodeVisible);
    const lines = String(answer || "").split(/\n+/).map(x => x.replace(/[*#`]/g, "").trim()).filter(Boolean);
    const actionable = /\b(clique|clicar|selecione|selecionar|acesse|acessar|abra|abrir|localize|localizar|procure|procurar|preencha|preencher|informe|informar|escolha|escolher|vá|ir até|campo|botão)\b/i;
    const candidates = [];
    lines.forEach((line, lineIndex) => {
      if (!actionable.test(line)) return;
      const lineNorm = normalize(line);
      const lineMatches = [];
      for (const el of nodes) {
        const names = getElementNames(el);
        for (const name of names) {
          const key = normalize(name);
          if (key.length < 2) continue;
          const at = lineNorm.indexOf(key);
          if (at < 0) continue;
          const before = at === 0 ? "" : lineNorm[at - 1];
          const after = lineNorm[at + key.length] || "";
          if ((before && /[a-z0-9]/.test(before)) || (after && /[a-z0-9]/.test(after))) continue;
          lineMatches.push({ element: el, title: name, key, at, lineIndex, line });
        }
      }
      // Se o mesmo texto identifica mais de um controle, não arrisca escolher um.
      const byKey = new Map();
      for (const match of lineMatches) {
        if (!byKey.has(match.key)) byKey.set(match.key, new Set());
        byKey.get(match.key).add(match.element);
      }
      for (const match of lineMatches) {
        if (byKey.get(match.key)?.size !== 1) continue;
        candidates.push(match);
      }
    });
    candidates.sort((a, b) => a.lineIndex - b.lineIndex || a.at - b.at);
    const steps = [];
    const seenElements = new Set();
    for (const candidate of candidates) {
      if (seenElements.has(candidate.element)) continue;
      seenElements.add(candidate.element);
      steps.push({
        element: candidate.element,
        title: candidate.title.slice(0, 90),
        description: candidate.line.length > candidate.title.length + 8
          ? candidate.line.slice(0, 420)
          : "Confira este elemento indicado pela orientação antes de fazer qualquer alteração."
      });
      if (steps.length >= 12) break;
    }
    return steps;
  }

  function persistGuideProgress(index = guideState?.pendingIndex ?? guideState?.index ?? 0) {
    if (!guideState) return;
    try {
      sessionStorage.setItem(GUIDE_SESSION_KEY, JSON.stringify({
        titles: guideState.steps.map(step => step.title).slice(0, 12),
        index: Math.max(0, Math.min(index, guideState.steps.length - 1)),
        savedAt: Date.now()
      }));
    } catch {}
  }

  function clearGuideProgress() {
    try { sessionStorage.removeItem(GUIDE_SESSION_KEY); } catch {}
  }

  function closeGuide() {
    if (!guideState) {
      clearGuideProgress();
      return;
    }
    document.removeEventListener("scroll", guideState.reposition, true);
    document.removeEventListener("click", guideState.onTargetClick, true);
    window.removeEventListener("resize", guideState.reposition);
    clearTimeout(guideState.waitTimer);
    clearTimeout(guideState.navigationTimer);
    clearTimeout(guideState.mutationTimer);
    guideState.observer?.disconnect();
    cancelAnimationFrame(guideState.positionFrame);
    guideState.frame.remove();
    guideState.marker?.remove();
    guideState.dismiss?.remove();
    guideState.card.remove();
    guideState = null;
    if (!requestInProgress && !voiceIsSpeaking) stopButton.disabled = true;
    clearGuideProgress();
  }

  function suspendGuideForNavigation() {
    if (!guideState) return;
    persistGuideProgress();
    document.removeEventListener("scroll", guideState.reposition, true);
    document.removeEventListener("click", guideState.onTargetClick, true);
    window.removeEventListener("resize", guideState.reposition);
    clearTimeout(guideState.waitTimer);
    clearTimeout(guideState.navigationTimer);
    clearTimeout(guideState.mutationTimer);
    guideState.observer?.disconnect();
    cancelAnimationFrame(guideState.positionFrame);
    guideState.frame.remove();
    guideState.marker?.remove();
    guideState.dismiss?.remove();
    guideState.card.remove();
    guideState = null;
  }

  function showGuideStep(index) {
    if (!guideState) return;
    const step = guideState.steps[index];
    if (!step?.element?.isConnected) {
      guideState.card.querySelector(".guide-desc").textContent = "Este elemento não está mais disponível nesta tela. Avance para o próximo passo.";
      return;
    }
    guideState.index = index;
    guideState.pendingIndex = null;
    persistGuideProgress(index);
    step.element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    const rect = step.element.getBoundingClientRect();
    const pad = 5;
    Object.assign(guideState.frame.style, {
      left: Math.max(2, rect.left - pad) + "px",
      top: Math.max(2, rect.top - pad) + "px",
      width: Math.max(12, rect.width + pad * 2) + "px",
      height: Math.max(12, rect.height + pad * 2) + "px"
    });
    guideState.card.querySelector(".guide-kicker").textContent = "ORIENTAÇÃO VISUAL · PASSO " + (index + 1) + " DE " + guideState.steps.length;
    guideState.card.querySelector(".guide-title").textContent = step.title;
    guideState.card.querySelector(".guide-desc").textContent = step.description;
    const hint = guideState.card.querySelector(".guide-hint");
    if (hint) hint.textContent = step.waitForInput
      ? "Preencha este campo conforme a orientação e saia dele para avançar. A extensão não digita por você."
      : step.kind === "final_action"
        ? "Confira os dados. Quando estiver pronto, clique você mesmo neste botão; a extensão não executa a ação."
        : "Clique no item destacado para continuar. Você está no controle: nada será preenchido ou enviado automaticamente.";
    guideState.card.hidden = true;
    guideState.marker.hidden = false;
    const markerLeft = Math.min(Math.max(8, rect.right - 17), window.innerWidth - 42);
    const markerTop = Math.max(8, Math.min(window.innerHeight - 42, rect.top - 17));
    guideState.marker.style.left = markerLeft + "px";
    guideState.marker.style.top = markerTop + "px";
    guideState.dismiss.style.left = Math.min(window.innerWidth - 22, markerLeft + 26) + "px";
    guideState.dismiss.style.top = Math.max(4, markerTop - 7) + "px";
    const cardWidth = Math.min(330, window.innerWidth - 28);
    const cardHeight = guideState.card.getBoundingClientRect().height || 170;
    const roomRight = window.innerWidth - rect.right;
    const roomLeft = rect.left;
    const left = roomRight >= cardWidth + 18 ? rect.right + 12 : roomLeft >= cardWidth + 18 ? rect.left - cardWidth - 12 : Math.max(8, Math.min(window.innerWidth - cardWidth - 8, rect.left));
    const top = rect.bottom + cardHeight + 18 < window.innerHeight ? rect.bottom + 12 : Math.max(8, rect.top - cardHeight - 12);
    guideState.card.style.top = Math.max(8, Math.min(window.innerHeight - cardHeight - 8, top)) + "px";
    guideState.card.style.left = left + "px";
    if (guideState.waitTimer) clearTimeout(guideState.waitTimer);
    const waitingAtStep = index;
    guideState.waitTimer = window.setTimeout(() => {
      if (!guideState || guideState.index !== waitingAtStep) return;
      const reminder = "Estou aguardando você. Se precisar, posso explicar de outro jeito ou ajudar com outra coisa.";
      addMessage(reminder, "bot");
      if (voiceModeActive) speakAssistantReply(reminder);
    }, 20000);
  }

  let navigationTask = "";
  let navigationGuideActive = false;
  let navigationLastCompletedStep = "";
  let navigationLastCompletedRoute = "";
  let navigationPlan = [];
  let navigationPlanIndex = 0;
  const NAVIGATION_PLAN_OPEN = "[[FUTURE_NAVIGATION_PLAN]]";
  const NAVIGATION_PLAN_CLOSE = "[[/FUTURE_NAVIGATION_PLAN]]";
  const NAVIGATION_SESSION_KEY = "futureAssistenteNavigationTask";
  function persistNavigationTask() {
    if (!navigationTask || !navigationGuideActive) return;
    const snapshot = {
      task: navigationTask, lastCompletedStep: navigationLastCompletedStep,
      lastCompletedRoute: navigationLastCompletedRoute, currentRoute: location.pathname,
      plan: navigationPlan, planIndex: navigationPlanIndex, savedAt: Date.now()
    };
    try { sessionStorage.setItem(NAVIGATION_SESSION_KEY, JSON.stringify(snapshot)); } catch {}
    // O service worker mantém o mesmo roteiro associado à aba, como no motor Lovable.
    try {
      chrome.runtime.sendMessage({
        type: "FUTURE_GUIDE_SET",
        guide: { task: snapshot.task, plan: snapshot.plan, step: snapshot.planIndex }
      }).catch(() => {});
    } catch {}
  }
  function extractNavigationPlan(answer) {
    let plan = null;
    // Compatibilidade com versões do backend que emitiram FUTURE_NAVIGATION_PLAN_PATH
    // e com delimitadores de uma ou duas chaves. O conteúdo nunca é texto para o usuário.
    const marker = /\[{1,2}FUTURE_NAVIGATION_PLAN(?:_PATH)?\]{1,2}([\s\S]*?)\[{1,2}\/FUTURE_NAVIGATION_PLAN(?:_PATH)?\]{1,2}/gi;
    let cleanAnswer = String(answer || "").replace(marker, (_, raw) => {
      try {
        const text = raw.trim();
        const jsonStart = text.indexOf("[");
        const jsonEnd = text.lastIndexOf("]");
        const parsed = JSON.parse(jsonStart >= 0 && jsonEnd > jsonStart ? text.slice(jsonStart, jsonEnd + 1) : text);
        if (!Array.isArray(parsed)) return "";
        const valid = parsed.slice(0, 30).filter(item =>
          item && typeof item.label === "string" && item.label.trim() &&
          typeof item.description === "string" && item.description.trim()
        ).map(item => ({
          label: item.label.trim().slice(0, 100),
          description: item.description.trim().slice(0, 360),
          path: typeof item.path === "string" ? item.path.trim().slice(0, 240) : "",
          kind: item.kind === "field" ? "field" : item.kind === "final_action" ? "final_action" : "click"
        }));
        if (valid.length) plan = valid;
      } catch {}
      return "";
    });
    cleanAnswer = cleanAnswer.replace(/\[{1,2}\/?FUTURE_NAVIGATION_PLAN(?:_PATH)?\]{1,2}/gi, "").trim();
    return { cleanAnswer, plan };
  }
  function activateNavigationPlan(plan) {
    navigationPlan = Array.isArray(plan) ? plan : [];
    navigationPlanIndex = 0;
    persistNavigationTask();
  }
  function advanceLocalNavigationPlan() {
    if (!navigationGuideActive || !navigationPlan.length) return false;
    if (navigationPlanIndex >= navigationPlan.length) {
      const lastStep = navigationPlan[navigationPlan.length - 1];
      // Depois de Salvar/Concluir, a IA confere a resposta da tela antes de declarar sucesso.
      if (lastStep?.kind === "final_action" && navigationLastCompletedStep === lastStep.label) return false;
      clearNavigationTask();
      closeGuide();
      status.textContent = "Roteiro concluído. Confira a confirmação apresentada pelo sistema.";
      addMessage("Chegamos ao fim das etapas de orientação. Confira a mensagem do Emissor para confirmar se a operação foi concluída.", "bot");
      return true;
    }
    const next = navigationPlan[navigationPlanIndex];
    const element = findElementByName(next.label);
    if (!element) return false;
    startVisualGuide([{
      element, title: next.label,
      description: (next.path ? "Caminho: " + next.path + ". " : "") + next.description,
      waitForInput: next.kind === "field",
      kind: next.kind
    }]);
    status.textContent = "Navegação local ativa — próximo passo " + (navigationPlanIndex + 1) + " de " + navigationPlan.length + ".";
    return true;
  }
  function clearNavigationTask() {
    navigationGuideActive = false;
    navigationPlan = [];
    navigationPlanIndex = 0;
    try { sessionStorage.removeItem(NAVIGATION_SESSION_KEY); } catch {}
    try { chrome.runtime.sendMessage({ type: "FUTURE_GUIDE_STOP" }).catch(() => {}); } catch {}
  }
  function navigationSnapshot() {
    // Inclui componentes customizados comuns em SPAs sem transformar qualquer div em alvo clicável.
    const selector = "a,button,[role=button],[role=menuitem],[role=treeitem],[role=tab],[data-menu-item],[data-action],[aria-expanded],summary,[aria-controls],[tabindex]:not([tabindex='-1'])";
    const items = [...document.querySelectorAll(selector)].filter(el => {
      if (el.hidden || el.getAttribute("aria-hidden") === "true") return false;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });
    const fingerprint = items.slice(0, 420).map(el => [
      normalize(el.innerText || el.textContent || el.getAttribute("aria-label") || el.title).slice(0, 90),
      el.getAttribute("aria-expanded") || "",
      el.getAttribute("aria-controls") || "",
      el.getAttribute("data-state") || "",
      el.getAttribute("aria-disabled") || (el.disabled ? "true" : "")
    ].join(":")).join("|");
    const notices = [...document.querySelectorAll('[role=alert],[aria-live],.toast,.alert,[class*=notification]')]
      .filter(isGuideNodeVisible)
      .map(el => normalize(el.innerText || el.textContent).slice(0, 300))
      .filter(Boolean).join("|");
    return [location.pathname, location.hash, fingerprint, notices].join("::");
  }

  async function waitForNavigationTarget(label, timeoutMs = 3000) {
    return new Promise(resolve => {
      let settled = false;
      let pollTimer = null;
      let observer = null;
      const startedAt = Date.now();
      const finish = found => {
        if (settled) return;
        settled = true;
        if (observer) observer.disconnect();
        clearInterval(pollTimer);
        resolve(Boolean(found));
      };
      const check = () => {
        if (findElementByName(label)) finish(true);
        else if (Date.now() - startedAt >= timeoutMs) finish(false);
      };
      observer = new MutationObserver(check);
      if (document.documentElement) observer.observe(document.documentElement, {
        childList: true, subtree: true, characterData: true, attributes: true,
        attributeFilter: ["class", "aria-expanded", "aria-hidden", "aria-controls", "data-state", "hidden", "disabled"]
      });
      pollTimer = window.setInterval(check, 100);
      check();
    });
  }

  async function waitForNavigationUpdate(beforeSnapshot, timeoutMs = 3000) {
    return new Promise(resolve => {
      let settled = false;
      let checkTimer = null;
      let pollTimer = null;
      const startedAt = Date.now();
      const finish = changed => {
        if (settled) return;
        settled = true;
        observer.disconnect();
        clearTimeout(checkTimer);
        clearInterval(pollTimer);
        resolve(Boolean(changed));
      };
      const check = () => {
        if (navigationSnapshot() !== beforeSnapshot) finish(true);
        else if (Date.now() - startedAt >= timeoutMs) finish(false);
      };
      const observer = new MutationObserver(() => {
        clearTimeout(checkTimer);
        checkTimer = window.setTimeout(check, 80);
      });
      if (document.documentElement) observer.observe(document.documentElement, {
        childList: true, subtree: true, characterData: true, attributes: true,
        attributeFilter: ["class", "aria-expanded", "aria-hidden", "aria-controls", "data-state", "hidden", "disabled"]
      });
      pollTimer = window.setInterval(check, 120);
      checkTimer = window.setTimeout(check, timeoutMs);
    });
  }

  async function continueNavigationGuide() {
    if (!navigationGuideActive || requestInProgress) return;
    closeGuide();
    if (advanceLocalNavigationPlan()) return;
    status.textContent = "Não encontrei com segurança o próximo item do caminho do Manual. Vou pedir ajuda à IA para reavaliar esta tela...";
    navigationPlan = [];
    navigationPlanIndex = 0;
    const prompt = "[CONTINUAR NAVEGAÇÃO ASSISTIDA] Tarefa original: " + navigationTask +
      ". Última ação confirmada pelo usuário: " + (navigationLastCompletedStep || "ainda não confirmada") +
      ". Rota em que essa ação ocorreu: " + (navigationLastCompletedRoute || "não registrada") +
      ". Rota atual: " + location.pathname +
      ". Continue exatamente do ponto em que parou, sem reiniciar o roteiro. Consulte o Manual Future e siga a sequência da aula correspondente, usando o caminho e os nomes dos controles cadastrados como referência principal. Analise a tela ATUAL e todos os itens clicáveis visíveis em qualquer região do documento, inclusive submenus renderizados fora de nav/aside. Escolha UMA próxima ação e use o rótulo exato que realmente aparece na tela. Antes de orientar, confirme que o elemento existe e está visível. Não repita a última ação confirmada. Se a etapa seguinte for um campo, localize pelo label, aria-label, placeholder ou nome acessível e explique o que o usuário deve preencher sem ler valores existentes. Se a etapa for Salvar, primeiro verifique apenas indicadores de obrigatoriedade, sem transmitir ou concluir automaticamente. Se não localizar o alvo com segurança, não invente nem repita: peça um print. Se o recurso estiver comprovadamente desabilitado no perfil, explique isso. Se a tarefa estiver concluída, diga claramente que terminou. Não execute cliques nem alterações.";
    const responseMessage = await ask(prompt, []);
    if (!guideState && navigationGuideActive) {
      const responseText = responseMessage?.textContent || "";
      clearNavigationTask();
      status.textContent = /conclu[ií]d[oa]|finalizad[oa]|cadastro realizado|tarefa terminada/i.test(responseText)
        ? "A orientação foi concluída."
        : "Não identifiquei com segurança o próximo elemento nesta tela. Você pode me perguntar como continuar.";
    }
  }

  function startVisualGuide(steps, initialIndex = 0) {
    closeGuide();
    if (!steps.length) return;
    const frame = document.createElement("div");
    frame.className = "spotlight";
    const marker = document.createElement("button");
    marker.className = "guide-question";
    marker.type = "button";
    marker.textContent = "?";
    marker.title = "Ver orientação deste item";
    marker.setAttribute("aria-label", "Ver orientação deste item");
    const dismiss = document.createElement("button");
    dismiss.className = "guide-dismiss";
    dismiss.type = "button";
    dismiss.textContent = "×";
    dismiss.title = "Fechar este indicador";
    dismiss.setAttribute("aria-label", "Fechar este indicador");
    const card = document.createElement("div");
    card.className = "guide-card";
    card.hidden = true;
    card.innerHTML = `
      <div class="guide-kicker"></div><div class="guide-title"></div><div class="guide-desc"></div>
      <div class="guide-controls"><button class="guide-back" type="button">← Voltar</button><button class="guide-retry" type="button">Procurar novamente</button><button class="guide-end" type="button">Encerrar</button></div><div class="guide-hint">Clique no item destacado para continuar. Você está no controle: nada será preenchido ou enviado automaticamente.</div>
    `;
    shadow.append(frame, marker, dismiss, card);
    const onTargetClick = event => {
      if (!guideState) return;
      const target = event.target;
      const isNode = value => Boolean(value && typeof value === "object" && typeof value.nodeType === "number");
      if (isNode(target) && (card.contains(target) || host.contains(target))) return;
      const current = guideState.steps[guideState.index];
      if (!current?.element || !isNode(current.element)) return;
      const path = typeof event.composedPath === "function" ? event.composedPath() : [target];
      const clicked = path.find(node => isNode(node) && (node === current.element || current.element.contains(node)));
      if (!clicked) return;
      if (current.validationField || current.waitForInput) return;
      navigationLastCompletedStep = current.title || getElementName(current.element) || "item destacado";
      navigationLastCompletedRoute = location.pathname;
      if (navigationPlan.length) navigationPlanIndex = Math.min(navigationPlan.length, navigationPlanIndex + 1);
      persistNavigationTask();
      const nextPlannedLabel = navigationPlan[navigationPlanIndex]?.label || "";
      const beforeSnapshot = navigationSnapshot();
      const navigationUpdate = nextPlannedLabel
        ? waitForNavigationTarget(nextPlannedLabel, 5000)
        : waitForNavigationUpdate(beforeSnapshot, current.kind === "final_action" ? 12000 : 5000);
      const nextIndex = guideState.index + 1;
      guideState.pendingIndex = nextIndex;
      guideState.waitingForNavigation = true;
      guideState.card.querySelector(".guide-desc").textContent = "Aguarde: estou verificando o que apareceu depois do clique.";
      status.textContent = "Lendo a nova tela ou submenu...";
      persistGuideProgress(nextIndex);
      guideState.navigationTimer = window.setTimeout(async () => {
        if (!navigationGuideActive) return;
        const changed = await navigationUpdate;
        if (!navigationGuideActive) return;
        if (!changed) {
          if (navigationPlan.length) {
            navigationPlanIndex = Math.max(0, navigationPlanIndex - 1);
            persistNavigationTask();
          }
          if (guideState) {
            guideState.waitingForNavigation = false;
            guideState.card.querySelector(".guide-desc").textContent = "Não detectei mudança na tela. Verifique se o menu abriu ou envie um print para eu localizar a opção correta. Não vou repetir o mesmo clique automaticamente.";
          }
          status.textContent = "A tela não mudou; aguardando você conferir o menu.";
          return;
        }
        // Quando o próximo alvo já está no DOM, avance diretamente no plano local.
        // Não passe pelo bloqueio requestInProgress: ele protege chamadas à IA, mas não
        // deve impedir uma transição visual que não faz nenhuma requisição.
        if (navigationPlan.length && advanceLocalNavigationPlan()) return;
        continueNavigationGuide();
      }, 0);
    };
    navigationGuideActive = true;
    persistNavigationTask();
    guideState = { steps, index: 0, pendingIndex: null, frame, marker, dismiss, card, onTargetClick, waitTimer: null, navigationTimer: null, mutationTimer: null, observer: null, positionFrame: 0, reposition: () => showGuideStep(guideState?.index || 0) };
    // O motor Lovable acompanha re-renderizações do emissor e reposiciona o destaque continuamente.
    guideState.observer = new MutationObserver(() => {
      if (!guideState || guideState.waitingForNavigation) return;
      clearTimeout(guideState.mutationTimer);
      guideState.mutationTimer = window.setTimeout(() => {
        if (!guideState) return;
        const current = guideState.steps[guideState.index];
        if (current?.element && (!current.element.isConnected || !isGuideNodeVisible(current.element))) {
          const replacement = findElementByName(current.title);
          if (replacement) {
            current.element = replacement;
            showGuideStep(guideState.index);
          } else {
            guideState.card.querySelector(".guide-desc").textContent = "Este item mudou ou ainda não está visível. Abra o menu correspondente e use “Procurar novamente”.";
          }
        }
      }, 140);
    });
    if (document.body) guideState.observer.observe(document.body, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ["class", "hidden", "aria-expanded", "aria-hidden", "disabled"]
    });
    const followTarget = () => {
      if (!guideState) return;
      const current = guideState.steps[guideState.index];
      if (current?.element?.isConnected && isGuideNodeVisible(current.element)) {
        const rect = current.element.getBoundingClientRect();
        const pad = 5;
        Object.assign(frame.style, {
          left: Math.max(2, rect.left - pad) + "px",
          top: Math.max(2, rect.top - pad) + "px",
          width: Math.max(12, rect.width + pad * 2) + "px",
          height: Math.max(12, rect.height + pad * 2) + "px"
        });
      }
      guideState.positionFrame = requestAnimationFrame(followTarget);
    };
    guideState.positionFrame = requestAnimationFrame(followTarget);
    stopButton.disabled = false;
    dismiss.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      if (!guideState) return;
      clearNavigationTask();
      closeGuide();
      status.textContent = "Indicador fechado. A orientação foi encerrada e não será retomada.";
    });
    marker.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      if (!guideState) return;
      const activeCard = guideState.card;
      activeCard.hidden = !activeCard.hidden;
      marker.setAttribute("aria-expanded", String(!activeCard.hidden));
      if (activeCard.hidden) return;
      // Primeiro torna o balão visível; só então mede e posiciona para evitar
      // coordenadas 0x0 quando o elemento estava hidden.
      const cardRect = activeCard.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();
      const left = Math.max(8, Math.min(window.innerWidth - cardRect.width - 8, markerRect.left - cardRect.width + markerRect.width));
      const top = markerRect.bottom + cardRect.height + 12 < window.innerHeight ? markerRect.bottom + 8 : Math.max(8, markerRect.top - cardRect.height - 8);
      activeCard.style.left = left + "px";
      activeCard.style.top = top + "px";
      status.textContent = "Orientação desta etapa aberta.";
    });
    card.querySelector(".guide-back").addEventListener("click", () => {
      if (!navigationGuideActive || navigationPlanIndex <= 0) {
        card.querySelector(".guide-desc").textContent = "Este é o primeiro passo disponível deste caminho.";
        return;
      }
      navigationPlanIndex = Math.max(0, navigationPlanIndex - 1);
      persistNavigationTask();
      closeGuide();
      if (!advanceLocalNavigationPlan()) status.textContent = "Não consegui localizar o passo anterior nesta tela. Confira o menu e tente novamente.";
    });
    card.querySelector(".guide-retry").addEventListener("click", () => {
      if (!guideState) return;
      const current = guideState.steps[guideState.index];
      const replacement = current?.title ? findElementByName(current.title) : null;
      if (replacement) {
        current.element = replacement;
        showGuideStep(guideState.index);
      } else {
        card.querySelector(".guide-desc").textContent = "Ainda não encontrei este item com segurança. Confira se o menu correto está aberto.";
      }
    });
    card.querySelector(".guide-end").addEventListener("click", () => { clearNavigationTask(); closeGuide(); });
    document.addEventListener("scroll", guideState.reposition, true);
    document.addEventListener("click", onTargetClick, true);
    window.addEventListener("resize", guideState.reposition);
    showGuideStep(Math.max(0, Math.min(initialIndex, steps.length - 1)));
  }

  let guideRestoreAttempts = 0;
  let guideRestoreTimer = null;
  function restoreVisualGuide() {
    if (guideState) return;
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(GUIDE_SESSION_KEY) || "null"); } catch {}
    if (!saved || !Array.isArray(saved.titles) || !saved.titles.length) return;
    if (!Number.isFinite(saved.savedAt) || Date.now() - saved.savedAt > 20 * 60 * 1000) {
      clearGuideProgress();
      return;
    }
    const matches = saved.titles.map((title, originalIndex) => ({
      originalIndex,
      element: findElementByName(title),
      title,
      description: "A orientação foi retomada nesta tela. Confira este elemento antes de prosseguir."
    })).filter(step => step.element);
    if (!matches.length) {
      if (guideRestoreAttempts++ < 24) {
        clearTimeout(guideRestoreTimer);
        guideRestoreTimer = window.setTimeout(restoreVisualGuide, 500);
      } else {
        clearGuideProgress();
        guideRestoreAttempts = 0;
      }
      return;
    }
    const wantedIndex = Number.isInteger(saved.index) ? saved.index : 0;
    let visibleIndex = matches.findIndex(step => step.originalIndex >= wantedIndex);
    if (visibleIndex < 0) visibleIndex = 0;
    const steps = matches.map(({ element, title, description }) => ({ element, title, description }));
    guideRestoreAttempts = 0;
    startVisualGuide(steps, visibleIndex);
    status.textContent = "Orientação visual retomada. Confira o destaque e continue no seu ritmo.";
  }

  function scheduleGuideRestore() {
    window.setTimeout(restoreVisualGuide, 650);
  }

  async function restoreNavigationAfterPageLoad() {
    if (guideState || requestInProgress) return;
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(NAVIGATION_SESSION_KEY) || "null"); } catch {}
    if (!saved?.task) {
      // Recupera o progresso do service worker caso a página tenha sido recriada.
      try {
        const response = await chrome.runtime.sendMessage({ type: "FUTURE_GUIDE_GET" });
        if (response?.ok && response.guide?.task && Array.isArray(response.guide.plan)) {
          saved = {
            task: response.guide.task,
            plan: response.guide.plan,
            planIndex: response.guide.step,
            savedAt: response.guide.updatedAt || Date.now()
          };
        }
      } catch {}
    }
    if (!saved?.task || !Number.isFinite(saved.savedAt) || Date.now() - saved.savedAt > 20 * 60 * 1000) {
      if (saved) clearNavigationTask();
      return;
    }
    navigationTask = saved.task;
    navigationLastCompletedStep = saved.lastCompletedStep || "";
    navigationLastCompletedRoute = saved.lastCompletedRoute || "";
    navigationPlan = Array.isArray(saved.plan) ? saved.plan : [];
    navigationPlanIndex = Number.isInteger(saved.planIndex) ? Math.max(0, saved.planIndex) : 0;
    navigationGuideActive = true;
    persistNavigationTask();
    status.textContent = navigationPlan.length
      ? "Retomando o caminho do Manual nesta tela..."
      : "Retomando a navegação assistida na nova tela...";
    continueNavigationGuide();
  }

  window.addEventListener("pageshow", scheduleGuideRestore);
  window.setTimeout(restoreNavigationAfterPageLoad, 1100);
  window.addEventListener("popstate", () => {
    suspendGuideForNavigation();
    scheduleGuideRestore();
  });
  window.addEventListener("hashchange", () => {
    suspendGuideForNavigation();
    scheduleGuideRestore();
  });

  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (...args) {
      const previousPath = location.pathname;
      const result = original.apply(this, args);
      if (location.pathname !== previousPath) {
        suspendGuideForNavigation();
        scheduleGuideRestore();
      }
      return result;
    };
  }

  scheduleGuideRestore();

  const ERROR_TEXT_PATTERN = /\b(erro|error|falha|failed|inv[aá]lid[oa]|invalid|obrigat[oó]ri[oa]|required|n[aã]o foi poss[ií]vel|n[aã]o permitido|n[aã]o pode|n[aã]o corresponde|n[aã]o autorizado|n[aã]o informado|rejeitad[oa]|rejei[cç][aã]o|inconsist[eê]ncia|incompat[ií]vel|duplicad[oa]|j[aá] cadastrad[oa]|fora do padr[aã]o|excede|limite|ausente|n[aã]o encontrado|n[aã]o localizado|preencha|informe|selecione|corrija|aten[cç][aã]o)\b/i;
  const NON_ERROR_TEXT_PATTERN = /\b(sucesso|conclu[ií]d[oa]|salvo com sucesso|opera[cç][aã]o realizada|processado com sucesso)\b/i;
  let requestInProgress = false;

  function dismissErrorSpotlight() {}

  function isLikelyFiscalError(el, message) {
    if (!message || message.length < 4 || message.length > 500) return false;
    if (NON_ERROR_TEXT_PATTERN.test(message) && !/\b(erro|falha|inv[aá]lid[oa]|rejeitad[oa])\b/i.test(message)) return false;
    const classText = String(el.className?.baseVal || el.className || "");
    const hasStrongSemantic = el.getAttribute("role") === "alert" ||
      el.getAttribute("aria-live") === "assertive" ||
      el.matches(".invalid-feedback,[data-state=error],.toast-error,[aria-invalid=true]");
    const hasErrorClass = /\b(invalid|error|danger|toast-error)\b/i.test(classText);
    const hasErrorLanguage = ERROR_TEXT_PATTERN.test(message);
    if (el.matches(".text-danger") && !hasErrorLanguage) return false;
    return hasErrorLanguage && (hasStrongSemantic || hasErrorClass || el.matches("[role=alert],[aria-live=assertive]"));
  }

  function maybeStartAutomaticGuide(answer) {
    if (lastRequestKind === "document-review" || lastRequestKind === "error-diagnosis") return false;
    const parsedPlan = extractNavigationPlan(answer);
    if (parsedPlan.plan) {
      activateNavigationPlan(parsedPlan.plan);
      answer = parsedPlan.cleanAnswer;
    }
    if (/não está habilitado|nao esta habilitado|sem permissão|sem permissao|chame o suporte|chamar o suporte|não aparece no seu perfil|nao aparece no seu perfil/i.test(answer)) {
      clearNavigationTask();
      return false;
    }
    if (navigationPlan.length && navigationTask) {
      navigationGuideActive = true;
      if (advanceLocalNavigationPlan()) return true;
      navigationGuideActive = false;
      navigationPlan = [];
      navigationPlanIndex = 0;
    }
    // Em pedidos de cadastro passo a passo, nunca deduza o alvo pela prosa.
    // Sem roteiro estruturado e controle exato, não mostre marcador algum.
    if (navigationTask && /\b(cadastrar|cadastre|cadastro|criar|crie|incluir|adicione|adicionar|novo|nova|passo a passo|me guie|como faço|como faco)\b/i.test(navigationTask)) {
      status.textContent = "Não encontrei um controle com identificação exata para destacar. Envie um print da tela atual para eu localizar com segurança.";
      return false;
    }
    const instructionIntent = /(?:clique|selecione|acesse|abra|localize|procure|preencha|informe|escolha|vá até|avance|primeiro passo|próximo passo|passo\s*\d|para continuar|para corrigir|corrija|verifique o campo)/i.test(answer);
    if (!instructionIntent) return false;
    const asksToSave = /\b(salvar|salve|gravar|grave|confirmar cadastro|finalizar cadastro)\b/i.test(answer);
    if (asksToSave) {
      const missing = [...document.querySelectorAll("input,select,textarea,[role=checkbox],[role=radio]")].filter(el => {
        if (!isGuideNodeVisible(el) || !(el.required || el.getAttribute("aria-required") === "true")) return false;
        if (el.matches("[type=checkbox],[type=radio],[role=checkbox],[role=radio]")) return !(el.checked || el.getAttribute("aria-checked") === "true");
        return !String(el.value ?? "").trim();
      });
      if (missing.length) {
        const first = missing[0];
        const fieldName = getElementName(first) || "Campo obrigatório";
        const names = missing.slice(0, 6).map(el => getElementName(el) || "Campo obrigatório");
        addMessage("Antes de salvar, faltam campos obrigatórios: " + names.join(", ") + ". Ainda não clique em Salvar. Vou indicar o primeiro campo que precisa ser preenchido.", "bot");
        startVisualGuide([{ element: first, title: fieldName, description: "Este campo é obrigatório. Preencha ou selecione uma opção; depois você poderá tentar salvar novamente.", validationField: true }]);
        return true;
      }
    }
    const steps = findGuideSteps(answer);
    if (navigationPlan.length) {
      if (advanceLocalNavigationPlan()) return true;
      navigationPlan = [];
      navigationPlanIndex = 0;
      persistNavigationTask();
    }
    if (!steps.length) return false;
    startVisualGuide(steps.slice(0, 1));
    status.textContent = "Navegação assistida ativa. Clique no destaque; vou ler a próxima tela e orientar o próximo passo.";
    return true;
  }


  const FIELD_PROPOSAL_OPEN = "[[FUTURE_FIELD_PROPOSAL]]";
  const FIELD_PROPOSAL_CLOSE = "[[/FUTURE_FIELD_PROPOSAL]]";
  const SENSITIVE_FIELD_NAME = /\b(cpf|cnpj|e-?mail|telefone|celular|senha|password|pin|token|certificado|chave privada)\b/i;
  const SENSITIVE_VALUE = /(?:\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b|\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|(?:\+?55\s*)?\(?\d{2}\)?\s*9?\d{4}[- ]?\d{4})/i;

  function extractFieldProposals(answer) {
    const proposals = [];
    const cleanAnswer = answer.replace(/\[\[FUTURE_FIELD_PROPOSAL\]\]([\s\S]*?)\[\[\/FUTURE_FIELD_PROPOSAL\]\]/g, (_, raw) => {
      try {
        const parsed = JSON.parse(raw.trim());
        const entries = Array.isArray(parsed) ? parsed : [parsed];
        for (const item of entries.slice(0, 8)) {
          if (!item || typeof item.field !== "string" || typeof item.value !== "string") continue;
          const field = item.field.trim().slice(0, 120);
          const value = item.value.trim().slice(0, 1000);
          if (!field || !value || SENSITIVE_FIELD_NAME.test(field) || SENSITIVE_VALUE.test(value)) continue;
          proposals.push({ field, value });
        }
      } catch {}
      return "";
    }).trim();
    return { cleanAnswer, proposals };
  }

  function resolveSafeField(fieldName) {
    const matches = [...document.querySelectorAll("input,textarea,select,[role=textbox],[role=combobox]")]
      .filter(el => isGuideNodeVisible(el) && getElementNames(el).some(name => normalize(name) === normalize(fieldName)));
    if (matches.length !== 1) return { error: matches.length ? "Encontrei mais de um campo com esse nome. Não fiz nenhuma alteração." : "Não localizei esse campo na tela atual." };
    const el = matches[0];
    if (el.matches("input")) {
      const type = (el.getAttribute("type") || "text").toLowerCase();
      if (!["text", "number", "date"].includes(type)) return { error: "Esse tipo de campo não está liberado para preenchimento assistido." };
    } else if (!el.matches("textarea,select")) {
      return { error: "Esse componente não permite preenchimento assistido seguro." };
    }
    const label = getElementNames(el).join(" ");
    if (SENSITIVE_FIELD_NAME.test(label) || el.disabled || el.readOnly || el.getAttribute("aria-disabled") === "true") {
      return { error: "Esse campo está protegido e não será preenchido pela extensão." };
    }
    return { element: el };
  }

  function renderFieldProposals(answer, target) {
    const { cleanAnswer, proposals } = extractFieldProposals(answer);
    const proposalRoute = location.pathname;
    renderSafeMarkdown(cleanAnswer, target);
    if (!proposals.length) return cleanAnswer;
    const card = document.createElement("section");
    card.className = "proposal-card";
    const heading = document.createElement("div");
    heading.className = "proposal-title";
    heading.textContent = "Sugestão de preenchimento — confirme antes de aplicar";
    card.appendChild(heading);
    proposals.forEach((proposal, index) => {
      const item = document.createElement("div");
      const field = document.createElement("div");
      field.className = "proposal-field";
      field.textContent = proposal.field;
      const value = document.createElement("div");
      value.className = "proposal-value";
      value.textContent = proposal.value;
      const actions = document.createElement("div");
      actions.className = "proposal-actions";
      const confirm = document.createElement("button");
      confirm.type = "button";
      confirm.className = "proposal-confirm";
      confirm.textContent = "Confirmar e preencher";
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "proposal-cancel";
      cancel.textContent = "Cancelar";
      confirm.addEventListener("click", () => {
        if (location.pathname !== proposalRoute) {
          value.textContent = "A tela mudou desde esta sugestão. Peça uma nova análise antes de preencher. Nada foi alterado.";
          confirm.disabled = true;
          return;
        }
        const resolved = resolveSafeField(proposal.field);
        if (resolved.error) {
          value.textContent = resolved.error;
          confirm.disabled = true;
          return;
        }
        const el = resolved.element;
        let nextValue = proposal.value;
        if (el.matches("select")) {
          const options = [...el.options].filter(opt =>
            !opt.disabled && !opt.closest("optgroup")?.disabled &&
            (opt.value === nextValue || normalize(opt.textContent) === normalize(nextValue))
          );
          if (options.length !== 1) {
            value.textContent = options.length
              ? "Há mais de uma opção correspondente. Nada foi alterado."
              : "A opção sugerida não corresponde a uma opção disponível. Nada foi alterado.";
            confirm.disabled = true;
            return;
          }
          nextValue = options[0].value;
        } else if (el.matches("input") && el.type === "number") {
          if (!/^-?(?:\d+|\d*[.,]\d+)$/.test(nextValue)) {
            value.textContent = "O valor sugerido não é um número válido para este campo. Nada foi alterado.";
            confirm.disabled = true;
            return;
          }
          nextValue = nextValue.replace(",", ".");
        } else if (el.matches("input") && el.type === "date") {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(nextValue) ||
              (() => {
                const [year, month, day] = nextValue.split("-").map(Number);
                const date = new Date(Date.UTC(year, month - 1, day));
                return date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day;
              })()) {
            value.textContent = "A data sugerida não é uma data válida. Nada foi alterado.";
            confirm.disabled = true;
            return;
          }
        }
        const prototype = el.matches("textarea") ? HTMLTextAreaElement.prototype :
          el.matches("select") ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
        if (setter) setter.call(el, nextValue);
        else el.value = nextValue;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
        el.focus();
        value.textContent = "Preenchimento aplicado. Confira o conteúdo no campo antes de continuar.";
        confirm.disabled = true;
        cancel.disabled = true;
        confirm.textContent = "Preenchido";
      });
      cancel.addEventListener("click", () => {
        item.remove();
        if (!card.querySelector(".proposal-field")) card.remove();
      });
      actions.append(confirm, cancel);
      item.append(field, value, actions);
      card.appendChild(item);
    });
    const note = document.createElement("div");
    note.className = "proposal-note";
    note.textContent = "A extensão só altera o campo após sua confirmação. Não executa emissão, transmissão, autorização ou encerramento.";
    card.appendChild(note);
    target.appendChild(card);
    return cleanAnswer;
  }

  function renderReviewIssueCards(issues, target) {
    if (!issues.length) return;
    const card = document.createElement("section");
    card.className = "proposal-card review-issue-cards";
    const heading = document.createElement("div");
    heading.className = "proposal-title";
    heading.textContent = "Pontos encontrados nesta revisão — confira um por um";
    card.appendChild(heading);
    issues.forEach((issue, index) => {
      const item = document.createElement("div");
      item.className = "review-issue-item";
      const field = document.createElement("div");
      field.className = "proposal-field";
      field.textContent = (index + 1) + ". " + issue.title;
      const description = document.createElement("div");
      description.className = "proposal-value";
      description.textContent = issue.message;
      const action = document.createElement("button");
      action.type = "button";
      action.className = "proposal-confirm";
      action.textContent = "Destacar no Emissor";
      action.addEventListener("click", () => {
        const current = reviewFrames.find(entry => entry.element === issue.element);
        if (!current || !issue.element.isConnected) {
          description.textContent = "O elemento não está mais disponível nesta tela. Faça uma nova revisão.";
          action.disabled = true;
          return;
        }
        issue.element.scrollIntoView?.({ block: "center", inline: "nearest" });
        positionReviewFrames();
        current.frame.animate?.([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(1.035)", opacity: .55 }, { transform: "scale(1)", opacity: 1 }], { duration: 650, iterations: 2 });
        status.textContent = "Campo ou mensagem destacado. Confira a orientação da IA antes de alterar qualquer informação.";
      });
      item.append(field, description, action);
      card.appendChild(item);
    });
    const note = document.createElement("div");
    note.className = "proposal-note";
    note.textContent = "Cada item pode ser destacado novamente. A extensão não altera dados fiscais sem confirmação explícita e nunca executa emissão ou transmissão.";
    card.appendChild(note);
    target.appendChild(card);
  }

  async function readStream(response, target, initialAnswer = "", signal = undefined) {
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error("A IA retornou HTTP " + response.status + (detail ? ": " + detail.slice(0, 300) : ""));
    }
    if (!response.body?.getReader) {
      const contentType = response.headers?.get?.("content-type") || "";
      if (contentType.includes("application/json")) {
        const payload = await response.json();
        const answer = String(payload?.answer || payload?.text || payload?.content || payload?.message || "");
        if (answer.trim()) {
          target.textContent = initialAnswer ? initialAnswer + "\n\n" + answer : answer;
          return { answer, completed: true };
        }
      }
      throw new Error("A resposta da IA não disponibilizou um fluxo de leitura compatível.");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    let completed = false;
    function appendText(value) {
      if (typeof value !== "string" || !value) return;
      answer += value;
      const markerStart = answer.search(/\[{1,2}FUTURE_NAVIGATION_PLAN(?:_PATH)?/i);
      let visibleAnswer = markerStart >= 0 ? answer.slice(0, markerStart) : answer;
      const partialMarker = visibleAnswer.lastIndexOf("[[");
      if (partialMarker >= 0 && /^\[\[FUTURE_[A-Z_]*$/i.test(visibleAnswer.slice(partialMarker))) {
        visibleAnswer = visibleAnswer.slice(0, partialMarker);
      }
      target.textContent = initialAnswer ? initialAnswer + "\n\n" + visibleAnswer : visibleAnswer;
      messages.scrollTop = messages.scrollHeight;
    }
    function consumePayload(payload, eventName = "") {
      const raw = String(payload || "").trim();
      if (!raw) return;
      if (raw === "[DONE]") { completed = true; return; }
      // AI SDK legado: 0:"texto"; protocolo tipado: {"type":"text-delta","delta":"..."}.
      if (/^0:/.test(raw)) {
        try { appendText(JSON.parse(raw.slice(2))); } catch {}
        return;
      }
      try {
        const event = JSON.parse(raw);
        if (typeof event === "string") { appendText(event); return; }
        if (Array.isArray(event)) {
          for (const item of event) consumePayload(JSON.stringify(item), eventName);
          return;
        }
        const type = String(event?.type || eventName || "").toLowerCase();
        if (type === "text-delta" || type === "text_delta" || type === "text") {
          appendText(event.delta ?? event.text ?? event.content ?? "");
        } else if (event?.choices?.[0]?.delta?.content != null) {
          appendText(event.choices[0].delta.content);
        } else if (event?.choices?.[0]?.message?.content != null) {
          appendText(event.choices[0].message.content);
          completed = true;
        } else if (typeof event?.answer === "string" || typeof event?.output_text === "string") {
          appendText(event.answer || event.output_text);
          completed = true;
        } else if (type === "finish" || type === "message-finish" || event?.choices?.[0]?.finish_reason) {
          completed = true;
        } else if (event?.error) {
          throw new Error(String(event.error?.message || event.error));
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          // Alguns gateways enviam texto puro em eventos SSE.
          if (!raw.startsWith("{") && !raw.startsWith("[")) appendText(raw);
          else console.warn("Evento SSE ignorado por formato inválido.", error);
        } else {
          throw error;
        }
      }
    }
    function consumeBuffer(final = false) {
      const chunks = buffer.split("\n\n");
      buffer = final ? "" : (chunks.pop() || "");
      for (const chunk of chunks) {
        if (!chunk.trim()) continue;
        const lines = chunk.split("\n");
        const eventName = lines.find(line => line.startsWith("event:"))?.slice(6).trim() || "";
        const dataLines = lines.filter(line => line.startsWith("data:")).map(line => line.replace(/^data:\s?/, ""));
        if (dataLines.length) consumePayload(dataLines.join("\n"), eventName);
      }
      if (final && buffer.trim()) {
        const lines = buffer.split("\n");
        const eventName = lines.find(line => line.startsWith("event:"))?.slice(6).trim() || "";
        const dataLines = lines.filter(line => line.startsWith("data:")).map(line => line.replace(/^data:\s?/, ""));
        if (dataLines.length) consumePayload(dataLines.join("\n"), eventName);
        else consumePayload(buffer, eventName);
      }
    }
    let stalled = false;
    while (true) {
      let readResult;
      try {
        readResult = await new Promise((resolve, reject) => {
          const timeout = window.setTimeout(() => reject(new Error("A resposta demorou demais e a conexão pode ter travado.")), 45000);
          reader.read().then(value => { clearTimeout(timeout); resolve(value); }, error => { clearTimeout(timeout); reject(error); });
        });
      } catch (error) {
        if (signal?.aborted) throw new DOMException("Conversa interrompida pelo usuário.", "AbortError");
        stalled = true;
        console.warn("Fluxo da IA ficou sem novos dados; será tentada a recuperação automática.", error);
        break;
      }
      const { value, done } = readResult;
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
      consumeBuffer();
    }
    buffer += decoder.decode().replace(/\r\n/g, "\n");
    consumeBuffer(true);
    return { answer, completed: completed && !stalled };
  }

  let lastRequestKind = "chat";
  let activeRequestController = null;
  function stopCurrentConversation() {
    const wasActive = requestInProgress || Boolean(guideState) || voiceIsSpeaking;
    activeRequestController?.abort();
    activeRequestController = null;
    navigationTask = "";
    clearNavigationTask();
    closeGuide();
    stopVoicePlayback();
    voiceModeActive = false;
    clearTimeout(voiceRestartTimer);
    voiceRecognition?.stop?.();
    voiceButton.setAttribute("aria-pressed", "false");
    voiceButton.textContent = "🎙️ Voz";
    if (wasActive) status.textContent = "Conversa interrompida. Você pode editar os campos ou fazer outra pergunta.";
    stopButton.disabled = true;
  }
  stopButton.addEventListener("click", stopCurrentConversation);

  document.addEventListener("input", event => {
    const target = event.target;
    if (!(target instanceof Element) || host.contains(target)) return;
    if (target.matches("input,select,textarea,[contenteditable=true]") && guideState?.steps?.[guideState.index]?.validationField) {
      closeGuide();
      clearNavigationTask();
      status.textContent = "Edição liberada. Confira os campos e tente novamente quando estiver pronto.";
    }
  }, true);
  function completeNavigationInputStep(target) {
    const current = guideState?.steps?.[guideState.index];
    if (!navigationGuideActive || !current?.waitForInput || current.element !== target) return false;
    const value = target.matches("[type=checkbox],[type=radio]")
      ? (target.checked || target.getAttribute("aria-checked") === "true")
      : String(target.value ?? "").trim();
    if (!value) return false;
    navigationLastCompletedStep = current.title || getElementName(target) || "campo preenchido";
    navigationLastCompletedRoute = location.pathname;
    navigationPlanIndex = Math.min(navigationPlan.length, navigationPlanIndex + 1);
    persistNavigationTask();
    closeGuide();
    if (!advanceLocalNavigationPlan()) continueNavigationGuide();
    return true;
  }

  document.addEventListener("change", event => {
    const target = event.target;
    if (!(target instanceof Element) || host.contains(target)) return;
    if (completeNavigationInputStep(target)) return;
    if (target.matches("input,select,textarea") && guideState?.steps?.[guideState.index]?.validationField) {
      closeGuide();
      clearNavigationTask();
      status.textContent = "Edição liberada. Confira os campos e tente novamente quando estiver pronto.";
    }
  }, true);

  async function ask(question, files = []) {
    if (requestInProgress) return;
    const isNavigationContinuation = (question || "").startsWith("[CONTINUAR NAVEGAÇÃO ASSISTIDA]");
    if (question && !isNavigationContinuation) {
      navigationTask = question;
      navigationLastCompletedStep = "";
      navigationLastCompletedRoute = "";
      persistNavigationTask();
    }
    // Tarefas conhecidas são conduzidas pela base instalada, sem chamar a IA.
    if (question && !isNavigationContinuation && !files.length) {
      try {
        await window.FutureManualKnowledge.load({ route: location.pathname, question });
        const localPlan = window.FutureManualKnowledge.getLocalNavigationPlan?.(question);
        if (Array.isArray(localPlan) && localPlan.length) {
          navigationTask = question;
          navigationLastCompletedStep = "";
          navigationLastCompletedRoute = "";
          navigationGuideActive = true;
          activateNavigationPlan(localPlan);
          addMessage("Encontrei o procedimento na base local do Manual Future. Vou guiar você etapa por etapa, sem consulta à IA. Você continuará fazendo os cliques e preenchimentos.", "bot");
          if (advanceLocalNavigationPlan()) {
            status.textContent = "Roteiro local carregado — " + localPlan.length + " etapas. Nenhuma chamada à IA foi feita.";
            return;
          }
          clearNavigationTask();
        }
      } catch (error) {
        console.warn("Não foi possível abrir a base local para navegação", error);
      }
    }
    lastRequestKind = (question || "").includes("Faça uma revisão orientativa do documento") ? "document-review" : /mensagem de possível erro|erro no Emissor Fiscal/i.test(question || "") ? "error-diagnosis" : isNavigationContinuation ? "navigation-guide" : "chat";
    requestInProgress = true;
    const controller = new AbortController();
    activeRequestController = controller;
    const signal = controller.signal;
    send.disabled = true;
    stopButton.disabled = false;
    const context = safeScreenContext();
    let knowledge = "";
    try {
      status.textContent = "Abrindo a base local do Manual Future...";
      knowledge = await window.FutureManualKnowledge.load({ route: location.pathname, question });
    } catch (error) {
      console.warn("Não foi possível carregar o Manual Academy", error);
    }
    if (signal.aborted) {
      requestInProgress = false;
      if (activeRequestController === controller) activeRequestController = null;
      send.disabled = false;
      stopButton.disabled = true;
      return null;
    }
    const attachmentContext = files.some(file => file.mediaType.includes("xml"))
      ? "\n\nO usuário anexou um XML fiscal. Analise o documento e os avisos de leitura fornecidos pelo servidor. Separe erros de estrutura, validações fiscais e campos que exigem confirmação externa. Nunca repita CPF/CNPJ ou dados pessoais; não invente valores ausentes."
      : files.some(file => file.mediaType.startsWith("audio/"))
        ? "\n\nO usuário anexou um áudio. Transcreva o que foi dito em português, identifique a dúvida e responda com base no Manual e na tela atual. Se algo estiver inaudível, informe isso sem adivinhar."
        : files.some(file => file.mediaType.startsWith("image/"))
          ? "\n\nO usuário anexou um print ou imagem. Analise o que está visível, leia mensagens de erro e oriente com cuidado. Não presuma dados que não aparecem na imagem."
          : "";
    const isDocumentReview = (question || "").includes("Faça uma revisão orientativa do documento");
    const proposalProtocol = isDocumentReview
      ? "\n\nREVISÃO DE DOCUMENTO — FORMATO OBRIGATÓRIO: Para CADA erro ou campo que você identificar com base nos sinais fornecidos e no Manual, explique o problema e o que o usuário deve conferir. Quando houver base segura e suficiente para um valor específico, acrescente ao final um bloco isolado [[FUTURE_FIELD_PROPOSAL]][{\"field\":\"rótulo exato e visível do campo\",\"value\":\"valor sugerido\"}][[/FUTURE_FIELD_PROPOSAL]] com uma entrada por campo (máximo 8). Esse bloco é obrigatório sempre que houver ao menos uma sugestão de valor realmente fundamentada. Nunca invente valores fiscais nem use dados pessoais/sensíveis. Se não houver base para preencher com segurança, não invente: explique isso e ainda assim indique o campo e a ação manual de conferência. Não omita os erros identificados. A extensão mostrará cartões de revisão e botões para destacar cada item; o preenchimento continua sujeito à confirmação explícita. Nunca recomende emissão, transmissão, autorização ou encerramento automáticos."
      : "\n\nRECURSO OPCIONAL DE SUGESTÃO DE PREENCHIMENTO: Se, e somente se, você tiver base suficiente no Manual e na conversa para sugerir valores concretos para campos visíveis da tela atual, acrescente ao final um bloco isolado exatamente neste formato: [[FUTURE_FIELD_PROPOSAL]][{\"field\":\"rótulo exato do campo\",\"value\":\"valor sugerido\"}][[/FUTURE_FIELD_PROPOSAL]]. Use JSON válido, no máximo 8 itens, strings simples. O campo deve ser identificado pelo rótulo visível exato; não invente campos. Não inclua CPF, CNPJ, e-mail, telefone, senha, PIN, token ou dados de certificado. Se não houver certeza, não inclua bloco. Antes do bloco, explique a origem e a incerteza de cada sugestão. A extensão só apresentará botão para confirmação explícita; jamais sugira clicar em emitir, transmitir, autorizar ou encerrar.";
    const manualPolicy = knowledge
      ? "\n\nREGRA OBRIGATÓRIA DE CONSULTA AO MANUAL FUTURE: use primeiro o conteúdo publicado fornecido em BASE LOCAL DO MANUAL FUTURE. Cruze a tarefa com o caminho, aula, resumo, conteúdo e referências visuais. Não responda com procedimento genérico se houver orientação no Manual. Se a tela atual divergir do Manual, descreva a diferença e peça confirmação/print; nunca invente rótulos ou cliques. Informe o título da aula usada e inclua o link da aula quando disponível.\n"
      : "\n\nMANUAL FUTURE INDISPONÍVEL NESTA CONSULTA: não afirme que consultou o Manual, não invente procedimentos nem sequência de cliques. Explique que o conteúdo do Manual não carregou agora e peça para tentar novamente ou enviar um print; responda apenas dúvidas gerais que não dependam do procedimento específico.\n";
    const navigationIntent = /\[TOUR GUIADO\]|\b(quero|preciso|me ajude|me ajuda|como faço|como faco|cadastrar|cadastre|cadastro|acesse|acessar|abrir|ir para|chegar|localizar|encontrar|criar|incluir|adicionar|editar|alterar|consultar|registrar|lançar|lancar|emitir|cancelar|configurar|excluir|remover|salvar|concluir|orientar|me guie|me mostre|passo a passo|onde fica|onde é|onde e|onde encontro|onde cadastro)\b/i.test(question || "");
    const navigationPlanRequest = navigationTask && navigationIntent && Boolean(knowledge) && !isNavigationContinuation && !files.length
      ? "\n\n[[FUTURE_NAVIGATION_PLAN_REQUEST]]\nO usuário quer concluir uma tarefa, não apenas chegar a uma tela. Consulte o MANUAL FUTURE já carregado e produza um ROTEIRO COMPLETO de ponta a ponta, desde o primeiro menu até a última etapa necessária da operação. Inclua, na ordem real, menus, submenus, abas, botões que abrem formulários, campos que o usuário precisa preencher (kind=field), seleções e o botão final de salvar/concluir (kind=final_action). Não pare em CADASTROS, CLIENTES ou na primeira tela se ainda houver etapas. Cada item deve ter label exatamente igual ao texto/label acessível do controle, description com instrução clara, path com a sequência do Manual e kind (click, field ou final_action). Limite o roteiro a 30 passos. Inclua campos somente quando forem identificáveis pelo Manual ou pela tela; não invente campos nem valores. Ao final, acrescente exatamente um bloco " + NAVIGATION_PLAN_OPEN + "[{\"label\":\"rótulo exato do próximo controle\",\"description\":\"instrução para o usuário\",\"path\":\"caminho documentado\",\"kind\":\"click|field|final_action\"}]"+NAVIGATION_PLAN_CLOSE+". A resposta visível deve explicar que o usuário fará cada clique e preenchimento e que a extensão acompanhará até a ação final. O último passo deve destacar Salvar/Concluir quando fizer parte da tarefa, mas NUNCA clique, preencha ou envie automaticamente. Para ações fiscais irreversíveis (emitir, transmitir, autorizar, cancelar), destaque a conferência e aguarde confirmação explícita do usuário. Se não conseguir montar o caminho completo com segurança, não devolva um roteiro parcial como se estivesse completo: informe o que falta confirmar e peça um print.\n"
      : "";
    const parts = [{ type: "text", text: (question || (files.length ? "Analise o anexo enviado e me ajude." : "")) + navigationPlanRequest + manualPolicy + attachmentContext + proposalProtocol + "\n\nCONTEXTO ATUAL DA TELA:\n" + context }];
    for (const file of files) parts.push({ type: "file", mediaType: file.mediaType, filename: file.name, url: file.url });
    const userMessage = { id: crypto.randomUUID(), role: "user", parts };
    conversationMessages.push(userMessage);
    const target = addMessage("", "bot");
    status.textContent = "Consultando o assistente compartilhado da Future...";
    try {
      const requestAssistantStream = async (initialAnswer = "") => {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": "sb_publishable_J3-cgRigKn2QardNRaOFRQ_Jja51yof" },
          body: JSON.stringify({ messages: conversationMessages.slice(-20), tela: location.pathname.slice(0, 80), knowledge }),
          signal
        });
        return readStream(response, target, initialAnswer, signal);
      };
      let streamResult = await requestAssistantStream();
      let answer = streamResult.answer;
      let recoveryAttempts = 0;
      while (!signal.aborted && !streamResult.completed && answer.trim() && recoveryAttempts < 3) {
        recoveryAttempts += 1;
        status.textContent = "A resposta foi interrompida. Estou recuperando a continuação automaticamente (" + recoveryAttempts + "/3)...";
        const partialAnswerMessage = { id: crypto.randomUUID(), role: "assistant", parts: [{ type: "text", text: answer }] };
        const continuationRequestMessage = {
          id: crypto.randomUUID(),
          role: "user",
          parts: [{ type: "text", text: "[CONTINUAÇÃO AUTOMÁTICA " + recoveryAttempts + "/3] Sua resposta anterior foi interrompida pela conexão. Continue exatamente do ponto em que parou, sem repetir o que já foi explicado. Termine a orientação com uma frase completa e o próximo passo claro. Consulte novamente o Manual já fornecido e não invente etapas." }]
        };
        conversationMessages.push(partialAnswerMessage, continuationRequestMessage);
        try {
          const continuation = await requestAssistantStream(answer);
          answer += (continuation.answer ? "\n\n" + continuation.answer : "");
          streamResult = { answer, completed: continuation.completed };
          if (continuation.completed) {
            conversationMessages = conversationMessages.filter(message =>
              message.id !== partialAnswerMessage.id && message.id !== continuationRequestMessage.id
            );
          }
        } catch (continuationError) {
          console.warn("Falha ao recuperar continuação da resposta", continuationError);
          break;
        }
      }
      if (signal.aborted) {
        target.textContent = "Conversa interrompida por você.";
      } else if (!answer.trim()) target.textContent = "Não recebi uma resposta desta vez. Tente novamente.";
      else if (!streamResult.completed) {
        target.textContent = answer + "\n\n⚠️ A conexão foi interrompida e não consegui concluir a resposta automaticamente. Você não precisa repetir a pergunta: envie apenas “continue” para retomar daqui.";
      } else {
        const navigationResult = extractNavigationPlan(answer);
        if (navigationResult.plan) activateNavigationPlan(navigationResult.plan);
        const safeAnswer = renderFieldProposals(navigationResult.cleanAnswer, target);
        conversationMessages.push({ id: crypto.randomUUID(), role: "assistant", parts: [{ type: "text", text: safeAnswer }] });
        maybeStartAutomaticGuide(safeAnswer);
        if (voiceModeActive) await speakAssistantReply(safeAnswer);
      }
      const diagnostic = window.FutureManualKnowledge.getStatus?.();
      status.textContent = diagnostic
        ? "Base local instalada: " + diagnostic.lessons + " aulas. Prioridade: " + (diagnostic.prioritized.join(", ") || "conteúdo geral") + ". A IA só é chamada quando a tarefa exige interpretação."
        : knowledge ? "Base local do Manual Future carregada." : "Conectado à IA; a base local não carregou nesta tentativa.";
    } catch (error) {
      if (signal.aborted || error?.name === "AbortError") {
        target.textContent = "Conversa interrompida por você.";
        status.textContent = "Conversa interrompida. Você pode editar a tela ou enviar outra pergunta.";
      } else {
        target.textContent = "Não consegui conectar ao assistente agora. " + (error?.message || "Tente novamente.");
        status.textContent = "Falha de conexão.";
      }
    } finally {
      requestInProgress = false;
      if (activeRequestController === controller) activeRequestController = null;
      send.disabled = false;
      // A resposta da IA pode terminar enquanto o roteiro visual continua ativo.
      // Parar permanece disponível enquanto houver guia, conversa ou voz em execução.
      stopButton.disabled = !(guideState || navigationGuideActive || voiceIsSpeaking);
      if (voiceModeActive) scheduleVoiceRecognition();
      input.focus();
    }
    return target;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const question = input.value.trim();
    if ((!question && pendingAttachments.length === 0) || requestInProgress) return;
    const visibleQuestion = question || (pendingAttachments.length ? "📎 Anexo enviado para análise." : "");
    const files = pendingAttachments.splice(0, pendingAttachments.length);
    renderPendingAttachments();
    input.value = "";
    addMessage(visibleQuestion, "user");
    ask(question, files);
  });
})();