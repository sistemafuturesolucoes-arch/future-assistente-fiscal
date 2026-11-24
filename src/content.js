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
    .launcher{position:fixed;z-index:2147483646;right:22px;bottom:22px;left:auto;top:auto;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:60px;height:60px;border:0;border-radius:50%;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;color:#fff;background:linear-gradient(145deg,#7838c8,#35105f);box-shadow:0 8px 28px #1d123b55;font:700 24px system-ui;transition:box-shadow .15s,transform .15s}.launcher:active{cursor:grabbing;transform:scale(.96)}.launcher.dragging{box-shadow:0 12px 34px #1d123b88,0 0 0 4px #b98aff55}
    .panel{position:fixed;z-index:2147483647;right:22px;bottom:94px;width:370px;height:min(590px,calc(100vh - 125px));display:none;flex-direction:column;background:#fff;color:#211b2b;border:1px solid #e6dff0;border-radius:18px;box-shadow:0 18px 60px #17102040;overflow:hidden;font:14px/1.45 system-ui,-apple-system,sans-serif}
    .panel.open{display:flex}.head{background:#35105f;color:#fff;padding:15px 16px;display:flex;align-items:center;justify-content:space-between}
    .brand{font-weight:750;font-size:15px}.sub{font-size:11px;opacity:.8}.head-tools{display:flex;align-items:center;gap:7px}.manual-link,.sound-toggle,.review-button,.voice-toggle{border:1px solid #ffffff55;background:#ffffff16;color:#fff;border-radius:8px;padding:6px 9px;font:600 11px system-ui;cursor:pointer}.review-button{background:#a875e8;border-color:#d6b7ff;color:#241039;white-space:nowrap}.review-button:disabled{opacity:.7;cursor:wait}.sound-toggle{min-width:34px;padding:6px}.sound-toggle[aria-pressed="false"],.voice-toggle[aria-pressed="false"]{opacity:.55}.close{border:0;background:transparent;color:#fff;font-size:23px;cursor:pointer}
    .messages{flex:1;overflow:auto;padding:13px;background:#faf9fc}.msg{max-width:90%;padding:10px 12px;margin:0 0 10px;border-radius:13px;white-space:pre-wrap;overflow-wrap:anywhere}.msg a{color:#6530a0;text-decoration:underline;font-weight:650;cursor:pointer}.bot{background:#fff;border:1px solid #ece7f2}.user{background:#eee4fa;margin-left:auto;color:#32104f}
    .status{font-size:11px;color:#786c83;padding:5px 13px}.composer{display:flex;align-items:flex-end;gap:7px;padding:10px;border-top:1px solid #eee9f4;flex-wrap:wrap}.composer textarea{resize:none;flex:1;min-width:90px;height:48px;border:1px solid #d9d0e3;border-radius:11px;padding:9px;font:13px system-ui;outline-color:#7840bd}.send{border:0;border-radius:11px;background:#54218a;color:white;padding:0 14px;height:48px;font-weight:650;cursor:pointer}.send:disabled{opacity:.5;cursor:wait}.attach,.record{height:42px;min-width:38px;border:1px solid #d9d0e3;border-radius:10px;background:#fff;color:#54218a;font-size:18px;cursor:pointer}.record.recording{background:#fff0f0;border-color:#d33;color:#b21f2d}.pending-files{display:flex;gap:5px;flex-wrap:wrap;width:100%;padding:0 1px}.pending-file{display:flex;align-items:center;gap:5px;background:#f0e8f8;border-radius:7px;padding:4px 7px;font-size:10px;color:#452069;max-width:100%}.pending-file span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:190px}.pending-file button{border:0;background:transparent;color:#6c3a90;cursor:pointer;font-size:13px}.hidden-file{display:none}
    .notice{font-size:10px;color:#81768b;padding:0 12px 9px}
    .review-wash{position:fixed;z-index:2147483640;inset:0;background:rgba(111,45,180,.12);box-shadow:inset 0 0 0 5px rgba(126,65,190,.42);pointer-events:none;transition:background .2s}.review-frame{position:fixed;z-index:2147483644;border:3px solid #8d43d6;border-radius:8px;box-shadow:0 0 0 3px #ffffffcc,0 0 18px #7b2bc8aa;pointer-events:none;box-sizing:border-box}.review-frame.error{border-color:#d83c68;box-shadow:0 0 0 3px #ffffffdd,0 0 18px #d83c68aa}.review-label{position:absolute;left:-3px;top:-25px;max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:6px;padding:3px 7px;background:#54218a;color:white;font:700 10px/1.3 system-ui;box-shadow:0 2px 8px #25103f55}.review-frame.error .review-label{background:#b4234c}
    .spotlight{position:fixed;z-index:2147483645;border:3px solid #ffbf36;border-radius:9px;box-shadow:0 0 0 9999px #160d2866,0 0 12px 5px #ffbf36,0 0 30px 10px #ff8c00;pointer-events:none;transition:all .18s ease}
    .guide-card{position:fixed;z-index:2147483647;width:min(330px,calc(100vw - 28px));box-sizing:border-box;background:#25103f;color:#fff;border:1px solid #b88aff;border-radius:14px;padding:13px;box-shadow:0 12px 40px #12091f88;font:13px/1.45 system-ui;pointer-events:auto}
    .guide-card .guide-kicker{font-size:10px;color:#d7baff;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .guide-card .guide-title{font-size:15px;font-weight:800;margin:4px 0 6px}
    .guide-card .guide-desc{font-size:12px;color:#f2eafa;white-space:pre-wrap}
    .guide-card .guide-controls{display:flex;gap:6px;margin-top:12px}
    .guide-card button{border:1px solid #9d73c8;border-radius:8px;background:#48216e;color:#fff;padding:7px 9px;font:600 11px system-ui;cursor:pointer}
    .guide-card button:disabled{opacity:.35;cursor:default}.guide-card .guide-end{margin-left:auto;background:#fff;color:#35105f}.guide-card .guide-hint{font-size:10px;color:#d7baff;margin-top:8px}
    .proposal-card{margin-top:9px;padding:10px;border:1px solid #d8c5ef;border-radius:11px;background:#fbf8ff;color:#30213e;font-size:12px}.proposal-title{font-weight:750;margin-bottom:5px}.proposal-field{font-weight:700;margin-top:7px}.proposal-value{padding:7px;margin:4px 0 8px;background:#fff;border:1px solid #e7deef;border-radius:7px;white-space:pre-wrap;overflow-wrap:anywhere}.proposal-actions{display:flex;gap:7px}.proposal-actions button{border:0;border-radius:8px;padding:7px 10px;font:650 11px system-ui;cursor:pointer}.proposal-confirm{background:#54218a;color:#fff}.proposal-cancel{background:#eee8f4;color:#4d3b5c}.proposal-note{font-size:10px;color:#756782;margin-top:7px}
    @media(max-width:520px){.panel{right:8px;left:8px;bottom:82px;width:auto;height:calc(100vh - 105px)}.launcher{right:14px;bottom:14px}.manual-link{display:none}.review-button{padding:5px 7px;font-size:10px}}
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
    <header class="head"><div><div class="brand">Future Assistente Fiscal</div><div class="sub">Seu copiloto dentro do Emissor</div></div><div class="head-tools"><button class="review-button" type="button">Revisar documento</button><button class="voice-toggle" type="button" aria-label="Ativar conversa por voz" aria-pressed="false" title="Ativar conversa por voz">🎙️</button><button class="sound-toggle" type="button" aria-label="Ativar ou desativar alertas sonoros" aria-pressed="true" title="Alertas sonoros">🔔</button><button class="manual-link" type="button">Manual</button><button class="close" aria-label="Fechar">×</button></div></header>
    <div class="messages" aria-live="polite"><div class="msg bot">Olá! Sou o assistente da Future. Posso ajudar a entender a tela, localizar campos e interpretar mensagens de erro. Também posso destacar campos e botões para orientar você visualmente. Não vou emitir nem transmitir documentos por você.</div></div>
    <div class="status">O Manual será consultado conforme a tela atual.</div>
    <form class="composer"><div class="pending-files" aria-live="polite"></div><input class="hidden-file" type="file" accept="image/*,audio/*" multiple><button class="attach" type="button" title="Anexar print ou áudio" aria-label="Anexar print ou áudio">📎</button><button class="record" type="button" title="Gravar áudio" aria-label="Gravar áudio">🎙</button><textarea aria-label="Digite sua dúvida" placeholder="Digite sua dúvida ou cole um print..." maxlength="3000"></textarea><button class="send" type="submit">Enviar</button></form>
    <div class="notice">Evite enviar CPF/CNPJ, dados de notas, senhas ou PINs. Orientações fiscais devem ser confirmadas com a contabilidade.</div>
  `;
  shadow.append(launcher, panel);

  const messages = panel.querySelector(".messages");
  const form = panel.querySelector("form");
  const input = panel.querySelector("textarea");
  const send = panel.querySelector(".send");
  const fileInput = panel.querySelector(".hidden-file");
  const attachButton = panel.querySelector(".attach");
  const recordButton = panel.querySelector(".record");
  const pendingFilesEl = panel.querySelector(".pending-files");
  const pendingAttachments = [];
  let mediaRecorder = null;
  let recordingStream = null;
  let recordingTimer = null;
  const status = panel.querySelector(".status");
  const conversationMessages = [];
  let guideState = null;
  const GUIDE_SESSION_KEY = "futureAssistenteGuideSession";
  const SOUND_KEY = "futureAssistenteErrorSound";
  let soundEnabled = true;
  let audioContext = null;
  let lastErrorFingerprint = "";
  let lastErrorAt = 0;
  let lastAutoDiagnosisFingerprint = "";
  let lastAutoDiagnosisAt = 0;
  let autoDiagnosisInProgress = false;

  function renderPendingAttachments() {
    pendingFilesEl.replaceChildren();
    pendingAttachments.forEach((file, index) => {
      const chip = document.createElement("div");
      chip.className = "pending-file";
      const name = document.createElement("span");
      name.textContent = (file.mediaType.startsWith("image/") ? "🖼 " : "🎧 ") + file.name;
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
    if (!isImage && !isAudio) {
      status.textContent = "Anexe apenas imagens ou arquivos de áudio.";
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
    try {
      const url = await fileAsDataUrl(file);
      pendingAttachments.push({ name: file.name || (isImage ? "print.png" : "audio.webm"), mediaType: isAudio ? (file.type || "audio/webm") : file.type, size: file.size, url });
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
    if (!question || requestInProgress || autoDiagnosisInProgress) return;
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

  launcher.addEventListener("click", () => {
    if (Date.now() < suppressLauncherClickUntil) return;
    panel.classList.toggle("open");
    positionPanelNearLauncher();
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
  panel.querySelector(".close").addEventListener("click", () => { if (reviewActive) clearDocumentReview(); panel.classList.remove("open"); });
  panel.querySelector(".manual-link").addEventListener("click", () => window.open(MANUAL_URL, "_blank", "noopener"));

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
        /(não é permitido|nao e permitido|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(text);
    });
    const minimal = candidates.filter(el => ![...el.children].some(child => {
      const t = String(child.innerText || child.textContent || "").replace(/\s+/g, " ").trim();
      return t.length >= 20 && t.length <= 1200 &&
        (/\bE\d{4,5}\b/i.test(t) || /retorno\s+(?:da\s+)?prefeitura/i.test(t)) &&
        /(não é permitido|nao e permitido|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(t);
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
      return /(não é permitido|nao e permitido|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(text) &&
        ![...el.children].some(child => { const t = String(child.innerText || child.textContent || "").replace(/\s+/g, " ").trim(); return t.length >= 20 && t.length <= 1200 && (/\bE\d{4,5}\b/i.test(t) || /retorno\s+(?:da\s+)?prefeitura/i.test(t)) && /(não é permitido|nao e permitido|rejeitad[oa]|alíquota|aliquota|ISSQN|falha|erro)/i.test(t); });
    });
    for (const node of fiscalReturnNodes) if (!errorNodes.includes(node)) errorNodes.push(node);
    for (const node of errorNodes) {
      const message = getVisibleErrorMessage(node);
      const fiscalReturn = /\bE\d{4,5}\b/i.test(message) || /retorno\s+(?:da\s+)?prefeitura/i.test(message);
      if (!isLikelyFiscalError(node, message) && !fiscalReturn) continue;
      const target = fieldForErrorNode(node);
      add(target || node, message, target ? "erro associado ao campo" : "rejeição fiscal da prefeitura");
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
    if (autoDiagnosisInProgress) {
      status.textContent = "A análise automática do erro está terminando. A revisão completa começará em seguida.";
      window.setTimeout(() => { if (!reviewActive && !requestInProgress && !autoDiagnosisInProgress) reviewDocument(); }, 500);
      return;
    }
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
      if (reviewMessage) renderReviewIssueCards(issues, reviewMessage);
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
    const controls = [...document.querySelectorAll("input,select,textarea,[role=combobox]")]
      .filter(isVisible).slice(0, 70).map(el => {
        const label = el.labels ? [...el.labels].map(item => (item.innerText || "").trim()).filter(Boolean).join(" / ") : "";
        const aria = el.getAttribute("aria-label") || "";
        const placeholder = el.getAttribute("placeholder") || "";
        const type = el.tagName.toLowerCase() === "input" ? (el.getAttribute("type") || "text") : el.tagName.toLowerCase();
        const flags = [el.required ? "obrigatório" : "", el.disabled ? "desabilitado" : ""].filter(Boolean).join(", ");
        return [label || aria || placeholder || el.getAttribute("name") || "Campo sem rótulo", "tipo=" + type, flags].filter(Boolean).join(" — ");
      });
    const buttons = [...document.querySelectorAll("button,[role=button],input[type=button],input[type=submit]")]
      .filter(isVisible).slice(0, 60).map(el => (el.innerText || el.getAttribute("aria-label") || el.getAttribute("title") || "").trim()).filter(Boolean);
    const navigationItems = [...document.querySelectorAll("nav a,nav button,nav [role=menuitem],nav [role=treeitem],[role=menu] a,[role=menu] button,[role=menu] [role=menuitem],[role=menubar] [role=menuitem],[role=tree] [role=treeitem],[role=menuitem],[role=treeitem],[data-menu-item]")]
      .filter(isVisible).slice(0, 100).map(el => {
        const name = (el.innerText || el.textContent || el.getAttribute("aria-label") || el.getAttribute("title") || "").replace(/\s+/g, " ").trim();
        const disabled = el.disabled || el.getAttribute("aria-disabled") === "true" || el.classList.contains("disabled") ? " [DESABILITADO]" : "";
        return name ? name.slice(0, 100) + disabled : "";
      }).filter(Boolean);
    const visibleMenuText = [...document.querySelectorAll("nav,[role=menu],[role=menubar],[role=tree],.dropdown-menu,[class*=submenu i],[class*=sidebar i]")]
      .filter(isVisible).map(el => (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim()).filter(text => text.length > 0 && text.length < 1800).slice(0, 12);
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
      "Metadados dos campos visíveis (nenhum valor digitado é lido): " + redact(controls.join(" | ")).slice(0, 5000),
      "Botões visíveis: " + redact(buttons.join(" | ")).slice(0, 3500),
      "Itens de navegação, menus e submenus atualmente visíveis: " + redact([...new Set([...navigationItems, ...visibleMenuText])].join(" | ")).slice(0, 6500)
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
    const answerNorm = normalize(answer);
    const nodes = [...document.querySelectorAll(GUIDE_NODE_SELECTOR)].filter(isGuideNodeVisible);
    const lines = answer.split(/\n+/).map(x => x.replace(/[*#`]/g, "").trim()).filter(Boolean);
    const candidates = [];
    for (const el of nodes) {
      const names = getElementNames(el).filter(name => normalize(name).length >= 4);
      if (!names.length) continue;
      let best = null;
      for (const name of names) {
        const key = normalize(name);
        const exactAt = answerNorm.indexOf(key);
        let score = exactAt >= 0 ? 1 : 0;
        if (!score) {
          const tokens = key.split(" ").filter(token => token.length > 2);
          if (tokens.length >= 2) {
            const hits = tokens.filter(token => answerNorm.includes(token)).length;
            score = hits / tokens.length;
          }
        }
        if (!best || score > best.score || (score === best.score && exactAt >= 0 && best.exactAt < 0)) {
          best = { el, name, key, exactAt, score };
        }
      }
      // Evita destacar controles por coincidência de uma palavra genérica.
      if (best && (best.exactAt >= 0 || best.score >= 0.82)) candidates.push(best);
    }
    candidates.sort((a, b) => {
      if (a.exactAt >= 0 && b.exactAt >= 0) return a.exactAt - b.exactAt;
      if (a.exactAt >= 0) return -1;
      if (b.exactAt >= 0) return 1;
      return b.score - a.score;
    });
    const steps = [];
    const seenElements = new Set();
    const seenNames = new Set();
    for (const candidate of candidates) {
      if (seenElements.has(candidate.el) || seenNames.has(candidate.key)) continue;
      seenElements.add(candidate.el);
      seenNames.add(candidate.key);
      const line = lines.find(x => normalize(x).includes(candidate.key)) ||
        lines.find(x => candidate.key.split(" ").filter(t => t.length > 2).length >= 2 &&
          candidate.key.split(" ").filter(t => t.length > 2).every(t => normalize(x).includes(t))) || "";
      const description = line.length > candidate.name.length + 8 ? line :
        "Confira este elemento indicado pela orientação antes de fazer qualquer alteração.";
      steps.push({ element: candidate.el, title: candidate.name.slice(0, 90), description: description.slice(0, 420) });
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
    guideState.frame.remove();
    guideState.card.remove();
    guideState = null;
    clearGuideProgress();
  }

  function suspendGuideForNavigation() {
    if (!guideState) return;
    persistGuideProgress();
    document.removeEventListener("scroll", guideState.reposition, true);
    document.removeEventListener("click", guideState.onTargetClick, true);
    window.removeEventListener("resize", guideState.reposition);
    guideState.frame.remove();
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
    guideState.card.querySelector(".guide-prev").disabled = index === 0;
    guideState.card.querySelector(".guide-next").textContent = index === guideState.steps.length - 1 ? "Concluir" : "Próximo";
    const cardHeight = guideState.card.getBoundingClientRect().height || 170;
    const top = rect.bottom + cardHeight + 18 < window.innerHeight ? rect.bottom + 12 : Math.max(8, rect.top - cardHeight - 12);
    const left = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - 346));
    guideState.card.style.top = top + "px";
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
  const NAVIGATION_SESSION_KEY = "futureAssistenteNavigationTask";
  function persistNavigationTask() {
    if (!navigationTask || !navigationGuideActive) return;
    try { sessionStorage.setItem(NAVIGATION_SESSION_KEY, JSON.stringify({ task: navigationTask, savedAt: Date.now() })); } catch {}
  }
  function clearNavigationTask() {
    navigationGuideActive = false;
    try { sessionStorage.removeItem(NAVIGATION_SESSION_KEY); } catch {}
  }
  async function waitForNavigationUpdate(beforeContext) {
    return new Promise(resolve => {
      let settled = false;
      let quietTimer = null;
      const startedAt = Date.now();
      const finish = () => {
        if (settled) return;
        settled = true;
        observer.disconnect();
        clearTimeout(quietTimer);
        resolve(safeScreenContext() !== beforeContext);
      };
      const observer = new MutationObserver(() => {
        clearTimeout(quietTimer);
        quietTimer = window.setTimeout(finish, 320);
      });
      if (document.documentElement) observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "style", "aria-expanded", "aria-hidden", "role"] });
      window.setTimeout(() => { if (Date.now() - startedAt >= 1500) finish(); }, 1550);
    });
  }

  async function continueNavigationGuide() {
    if (!navigationGuideActive || requestInProgress) return;
    closeGuide();
    status.textContent = "Você avançou. Estou lendo os menus e submenus que apareceram...";
    const prompt = "[CONTINUAR NAVEGAÇÃO ASSISTIDA] Continue a tarefa do usuário: " + navigationTask + ". O usuário clicou na etapa anterior. Analise novamente a tela ATUAL, incluindo todos os itens de navegação, menus e SUBMENUS visíveis. A lista de itens visíveis no contexto da tela é evidência prioritária: escolha um item que realmente esteja visível e corresponda à tarefa. Nunca repita o menu pai que já foi aberto se agora houver opções filhas visíveis. Diga uma única próxima ação, com o nome exato do item visível. Se o submenu Cadastros estiver aberto e o módulo solicitado (por exemplo Produtos ou Serviços) não aparecer entre as opções visíveis, ou se aparecer marcado como desabilitado/sem permissão, NÃO peça para clicar novamente em Cadastros: informe que esse recurso não está habilitado no perfil e oriente a chamar o suporte Future para habilitar. Se não conseguir confirmar a ausência/permissão, diga que não conseguiu localizar o módulo e peça um print, sem repetir a etapa anterior. Se a tarefa estiver concluída, diga claramente que terminou. Não execute cliques nem alterações.";
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
    const card = document.createElement("div");
    card.className = "guide-card";
    card.innerHTML = `
      <div class="guide-kicker"></div><div class="guide-title"></div><div class="guide-desc"></div>
      <div class="guide-controls"><button class="guide-prev" type="button">Anterior</button><button class="guide-next" type="button">Pular</button><button class="guide-end" type="button">Encerrar</button></div><div class="guide-hint">Ao clicar no elemento destacado, avançarei para o próximo passo.</div>
    `;
    shadow.append(frame, card);
    const onTargetClick = event => {
      if (!guideState || card.contains(event.target) || host.contains(event.target)) return;
      const current = guideState.steps[guideState.index];
      if (!current?.element) return;
      const clicked = event.composedPath?.().find(node => node === current.element || current.element.contains?.(node));
      if (!clicked) return;
      const beforeContext = safeScreenContext();
      const navigationUpdate = waitForNavigationUpdate(beforeContext);
      const nextIndex = guideState.index + 1;
      guideState.pendingIndex = nextIndex;
      guideState.waitingForNavigation = true;
      guideState.card.querySelector(".guide-desc").textContent = "Aguarde: estou verificando o que apareceu depois do clique.";
      status.textContent = "Lendo a nova tela ou submenu...";
      persistGuideProgress(nextIndex);
      window.setTimeout(async () => {
        if (!navigationGuideActive) return;
        const changed = await navigationUpdate;
        if (!navigationGuideActive) return;
        if (!changed) {
          if (guideState) {
            guideState.waitingForNavigation = false;
            guideState.card.querySelector(".guide-desc").textContent = "Não detectei mudança na tela. Verifique se o menu abriu ou envie um print para eu localizar a opção correta. Não vou repetir o mesmo clique automaticamente.";
          }
          status.textContent = "A tela não mudou; aguardando você conferir o menu.";
          return;
        }
        continueNavigationGuide();
      }, 0);
    };
    navigationGuideActive = true;
    persistNavigationTask();
    guideState = { steps, index: 0, pendingIndex: null, frame, card, onTargetClick, reposition: () => showGuideStep(guideState?.index || 0) };
    card.querySelector(".guide-prev").addEventListener("click", () => showGuideStep(Math.max(0, guideState.index - 1)));
    card.querySelector(".guide-next").addEventListener("click", () => {
      if (guideState.index >= guideState.steps.length - 1) continueNavigationGuide();
      else showGuideStep(guideState.index + 1);
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

  function restoreNavigationAfterPageLoad() {
    if (guideState || requestInProgress) return;
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(NAVIGATION_SESSION_KEY) || "null"); } catch {}
    if (!saved?.task || !Number.isFinite(saved.savedAt) || Date.now() - saved.savedAt > 20 * 60 * 1000) {
      if (saved) clearNavigationTask();
      return;
    }
    navigationTask = saved.task;
    navigationGuideActive = true;
    status.textContent = "Retomando a navegação assistida na nova tela...";
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

  function playErrorBeeps() {
    if (!soundEnabled) return;
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      audioContext ||= new AudioCtor();
      audioContext.resume().then(() => {
        for (let i = 0; i < 5; i++) {
          const start = audioContext.currentTime + i * 0.22;
          const oscillator = audioContext.createOscillator();
          const gain = audioContext.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = 880;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.12, start + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.11);
          oscillator.connect(gain);
          gain.connect(audioContext.destination);
          oscillator.start(start);
          oscillator.stop(start + 0.12);
        }
      }).catch(() => {});
    } catch {}
  }

  let activeErrorSpotlight = null;
  let activeErrorSpotlightTimer = null;

  function dismissErrorSpotlight() {
    if (activeErrorSpotlightTimer) clearTimeout(activeErrorSpotlightTimer);
    activeErrorSpotlightTimer = null;
    activeErrorSpotlight?.remove();
    activeErrorSpotlight = null;
  }

  // A orientação visual é temporária: ao começar a editar qualquer campo,
  // removemos somente o destaque criado pela extensão, nunca o campo do Emissor.
  document.addEventListener("click", event => {
    if (!activeErrorSpotlight || host.contains(event.target)) return;
    const path = event.composedPath?.() || [];
    const clickedField = path.some(node =>
      node instanceof Element &&
      (node.matches("input,select,textarea,[role=combobox],[contenteditable=true]") ||
       node.closest?.("input,select,textarea,[role=combobox],[contenteditable=true]"))
    );
    if (clickedField) dismissErrorSpotlight();
  }, true);

  const ERROR_TEXT_PATTERN = /\b(erro|error|falha|failed|inv[aá]lid[oa]|invalid|obrigat[oó]ri[oa]|required|n[aã]o foi poss[ií]vel|n[aã]o permitido|n[aã]o pode|n[aã]o corresponde|n[aã]o autorizado|n[aã]o informado|rejeitad[oa]|rejei[cç][aã]o|inconsist[eê]ncia|incompat[ií]vel|duplicad[oa]|j[aá] cadastrad[oa]|fora do padr[aã]o|excede|limite|ausente|n[aã]o encontrado|n[aã]o localizado|preencha|informe|selecione|corrija|aten[cç][aã]o)\b/i;
  const NON_ERROR_TEXT_PATTERN = /\b(sucesso|conclu[ií]d[oa]|salvo com sucesso|opera[cç][aã]o realizada|processado com sucesso)\b/i;
  const recentErrorFingerprints = new Map();
  let requestInProgress = false;
  let pendingErrorDiagnostic = null;

  function isLikelyFiscalError(el, message) {
    if (!message || message.length < 4 || message.length > 500) return false;
    if (NON_ERROR_TEXT_PATTERN.test(message) && !/\b(erro|falha|inv[aá]lid[oa]|rejeitad[oa])\b/i.test(message)) return false;
    const classText = String(el.className?.baseVal || el.className || "");
    const hasStrongSemantic = el.getAttribute("role") === "alert" ||
      el.getAttribute("aria-live") === "assertive" ||
      el.matches(".invalid-feedback,[data-state=error],.toast-error,[aria-invalid=true]");
    const hasErrorClass = /\b(invalid|error|danger|toast-error)\b/i.test(classText);
    const hasErrorLanguage = ERROR_TEXT_PATTERN.test(message);
    // .text-danger sozinho é usado também para decoração; exige texto de erro.
    if (el.matches(".text-danger") && !hasErrorLanguage) return false;
    return hasErrorLanguage && (hasStrongSemantic || hasErrorClass || el.matches("[role=alert],[aria-live=assertive]"));
  }

  function queueErrorDiagnosis(message, fingerprint) {
    if (fingerprint === lastAutoDiagnosisFingerprint && Date.now() - lastAutoDiagnosisAt <= 60000) return;
    pendingErrorDiagnostic = { message, fingerprint };
    if (!requestInProgress && !autoDiagnosisInProgress) runPendingErrorDiagnosis();
  }

  function runPendingErrorDiagnosis() {
    if (!pendingErrorDiagnostic || requestInProgress || autoDiagnosisInProgress) return;
    const pending = pendingErrorDiagnostic;
    pendingErrorDiagnostic = null;
    lastAutoDiagnosisFingerprint = pending.fingerprint;
    lastAutoDiagnosisAt = Date.now();
    autoDiagnosisInProgress = true;
    addMessage("Estou analisando esse erro com o Manual e a tela atual. Aguarde...", "bot");
    const diagnosticQuestion = [
      "A extensão detectou automaticamente esta mensagem de possível erro no Emissor Fiscal:",
      pending.message,
      "",
      "Explique o que a mensagem provavelmente significa, indique a causa somente se houver base no Manual ou no contexto disponível e oriente passo a passo onde o usuário deve conferir.",
      "Se faltarem informações, diga exatamente o que precisa ser verificado e peça ao usuário. Não invente regra fiscal, código, alíquota ou enquadramento.",
      "Não preencha campos, não clique em botões e não execute emissão, transmissão, autorização ou encerramento.",
      "Considere apenas a mensagem acima, a rota e os metadados seguros da tela; não solicite nem exponha senhas, PINs, certificados ou dados pessoais."
    ].join("\n");
    ask(diagnosticQuestion, []).finally(() => {
      autoDiagnosisInProgress = false;
      if (pendingErrorDiagnostic && !requestInProgress) window.setTimeout(runPendingErrorDiagnosis, 0);
    });
  }

  function getVisibleErrorMessage(el) {
    const pieces = [el.innerText || el.textContent || ""];
    const describedBy = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
    for (const id of describedBy) {
      const description = document.getElementById(id);
      if (!description) continue;
      const style = getComputedStyle(description);
      const rect = description.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden") {
        pieces.push(description.innerText || description.textContent || "");
      }
    }
    const group = el.closest(".form-group,.form-field,.field,.form-item");
    if (group) {
      group.querySelectorAll(".invalid-feedback,[role=alert],[data-state=error]").forEach(messageEl => {
        if (messageEl !== el) pieces.push(messageEl.innerText || messageEl.textContent || "");
      });
    }
    return [...new Set(pieces.map(value => String(value || "").trim()).filter(Boolean))].join(" ").replace(/\s+/g, " ").slice(0, 500);
  }

  function detectVisibleErrors() {
    const selectors = '[role="alert"],[aria-live="assertive"],.invalid-feedback,.text-danger,[data-state="error"],.toast-error,[aria-invalid="true"]';
    const candidates = [...document.querySelectorAll(selectors)].filter(el => {
      if (host.contains(el)) return false;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
    });
    for (const el of candidates) {
      const rawMessage = getVisibleErrorMessage(el);
      if (!isLikelyFiscalError(el, rawMessage)) continue;
      const message = redactSensitiveText(rawMessage);
      const fingerprint = normalize(message);
      const previousAt = recentErrorFingerprints.get(fingerprint) || 0;
      if (Date.now() - previousAt < 12000) continue;
      recentErrorFingerprints.set(fingerprint, Date.now());
      if (recentErrorFingerprints.size > 40) {
        const oldest = [...recentErrorFingerprints.entries()].sort((a, b) => a[1] - b[1])[0];
        if (oldest) recentErrorFingerprints.delete(oldest[0]);
      }
      lastErrorFingerprint = fingerprint;
      lastErrorAt = Date.now();
      playErrorBeeps();
      panel.classList.add("open");
      addMessage("⚠️ Detectei uma mensagem de possível erro na tela:\n" + message + "\n\nVou ajudar a interpretar. Confira o campo destacado e, se necessário, envie sua dúvida no chat.", "bot");
      status.textContent = "Erro detectado. Preparando análise automática com o Manual...";
      const fieldTarget = fieldForErrorNode(el) || el;
      fieldTarget.scrollIntoView?.({ block: "center", inline: "nearest" });
      const rect = fieldTarget.getBoundingClientRect();
      dismissErrorSpotlight();
      const frame = document.createElement("div");
      frame.className = "spotlight";
      Object.assign(frame.style, {
        left: Math.max(2, rect.left - 5) + "px",
        top: Math.max(2, rect.top - 5) + "px",
        width: Math.max(12, rect.width + 10) + "px",
        height: Math.max(12, rect.height + 10) + "px"
      });
      shadow.appendChild(frame);
      activeErrorSpotlight = frame;
      activeErrorSpotlightTimer = window.setTimeout(dismissErrorSpotlight, 6500);
      // A análise usa apenas o texto visível e os metadados seguros da tela.
      queueErrorDiagnosis(message, fingerprint);
      break;
    }
  }

  let errorScanTimer = null;
  const errorObserver = new MutationObserver(() => {
    clearTimeout(errorScanTimer);
    errorScanTimer = window.setTimeout(detectVisibleErrors, 180);
  });
  errorObserver.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "role", "aria-live", "data-state", "aria-invalid"] });
  window.setTimeout(detectVisibleErrors, 1200);

  function maybeStartAutomaticGuide(answer) {
    if (lastRequestKind === "document-review" || lastRequestKind === "error-diagnosis") return false;
    if (/não está habilitado|nao esta habilitado|sem permissão|sem permissao|chame o suporte|chamar o suporte|não aparece no seu perfil|nao aparece no seu perfil/i.test(answer)) {
      clearNavigationTask();
      return false;
    }
    const instructionIntent = /(?:clique|selecione|acesse|abra|localize|procure|preencha|informe|escolha|vá até|avance|primeiro passo|próximo passo|passo\s*\d|para continuar|para corrigir|corrija|verifique o campo)/i.test(answer);
    if (!instructionIntent) return false;
    const steps = findGuideSteps(answer);
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

  async function readStream(response, target) {
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error("A IA retornou HTTP " + response.status + (detail ? ": " + detail.slice(0, 300) : ""));
    }
    if (!response.body?.getReader) throw new Error("A resposta da IA não disponibilizou um fluxo de leitura.");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    function consumeChunk(chunk) {
      const dataLines = chunk.split("\n").filter(line => line.startsWith("data: "));
      if (!dataLines.length) return;
      const payload = dataLines.map(line => line.slice(6)).join("\n");
      if (payload === "[DONE]") return;
      try {
        const event = JSON.parse(payload);
        if (event.type === "text-delta" && typeof event.delta === "string") {
          answer += event.delta;
          target.textContent = answer;
          messages.scrollTop = messages.scrollHeight;
        }
      } catch (error) {
        console.warn("Evento SSE ignorado por formato inválido.", error);
      }
    }
    function consumeBuffer(final = false) {
      const chunks = buffer.split("\n\n");
      buffer = final ? "" : (chunks.pop() || "");
      for (const chunk of chunks) if (chunk.trim()) consumeChunk(chunk);
      if (final && buffer.trim()) consumeChunk(buffer);
    }
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
      consumeBuffer();
    }
    buffer += decoder.decode().replace(/\r\n/g, "\n");
    consumeBuffer(true);
    return answer;
  }

  let lastRequestKind = "chat";
  async function ask(question, files = []) {
    if (requestInProgress) return;
    const isNavigationContinuation = (question || "").startsWith("[CONTINUAR NAVEGAÇÃO ASSISTIDA]");
    if (question && !isNavigationContinuation) { navigationTask = question; persistNavigationTask(); }
    lastRequestKind = (question || "").includes("Faça uma revisão orientativa do documento") ? "document-review" : /mensagem de possível erro|erro no Emissor Fiscal/i.test(question || "") ? "error-diagnosis" : isNavigationContinuation ? "navigation-guide" : "chat";
    requestInProgress = true;
    send.disabled = true;
    const context = safeScreenContext();
    let knowledge = "";
    try {
      status.textContent = "Carregando as aulas do Manual relacionadas a esta tela...";
      knowledge = await window.FutureManualKnowledge.load({ route: location.pathname, question });
    } catch (error) {
      console.warn("Não foi possível carregar o Manual Academy", error);
    }
    const attachmentContext = files.some(file => file.mediaType.startsWith("audio/"))
      ? "\n\nO usuário anexou um áudio. Transcreva o que foi dito em português, identifique a dúvida e responda com base no Manual e na tela atual. Se algo estiver inaudível, informe isso sem adivinhar."
      : files.some(file => file.mediaType.startsWith("image/"))
        ? "\n\nO usuário anexou um print ou imagem. Analise o que está visível, leia mensagens de erro e oriente com cuidado. Não presuma dados que não aparecem na imagem."
        : "";
    const isDocumentReview = (question || "").includes("Faça uma revisão orientativa do documento");
    const proposalProtocol = isDocumentReview
      ? "\n\nREVISÃO DE DOCUMENTO — FORMATO OBRIGATÓRIO: Para CADA erro ou campo que você identificar com base nos sinais fornecidos e no Manual, explique o problema e o que o usuário deve conferir. Quando houver base segura e suficiente para um valor específico, acrescente ao final um bloco isolado [[FUTURE_FIELD_PROPOSAL]][{\"field\":\"rótulo exato e visível do campo\",\"value\":\"valor sugerido\"}][[/FUTURE_FIELD_PROPOSAL]] com uma entrada por campo (máximo 8). Esse bloco é obrigatório sempre que houver ao menos uma sugestão de valor realmente fundamentada. Nunca invente valores fiscais nem use dados pessoais/sensíveis. Se não houver base para preencher com segurança, não invente: explique isso e ainda assim indique o campo e a ação manual de conferência. Não omita os erros identificados. A extensão mostrará cartões de revisão e botões para destacar cada item; o preenchimento continua sujeito à confirmação explícita. Nunca recomende emissão, transmissão, autorização ou encerramento automáticos."
      : "\n\nRECURSO OPCIONAL DE SUGESTÃO DE PREENCHIMENTO: Se, e somente se, você tiver base suficiente no Manual e na conversa para sugerir valores concretos para campos visíveis da tela atual, acrescente ao final um bloco isolado exatamente neste formato: [[FUTURE_FIELD_PROPOSAL]][{\"field\":\"rótulo exato do campo\",\"value\":\"valor sugerido\"}][[/FUTURE_FIELD_PROPOSAL]]. Use JSON válido, no máximo 8 itens, strings simples. O campo deve ser identificado pelo rótulo visível exato; não invente campos. Não inclua CPF, CNPJ, e-mail, telefone, senha, PIN, token ou dados de certificado. Se não houver certeza, não inclua bloco. Antes do bloco, explique a origem e a incerteza de cada sugestão. A extensão só apresentará botão para confirmação explícita; jamais sugira clicar em emitir, transmitir, autorizar ou encerrar.";
    const parts = [{ type: "text", text: (question || (files.length ? "Analise o anexo enviado e me ajude." : "")) + attachmentContext + proposalProtocol + "\n\nCONTEXTO ATUAL DA TELA:\n" + context }];
    for (const file of files) parts.push({ type: "file", mediaType: file.mediaType, filename: file.name, url: file.url });
    const userMessage = { id: crypto.randomUUID(), role: "user", parts };
    conversationMessages.push(userMessage);
    const target = addMessage("", "bot");
    status.textContent = "Consultando o assistente compartilhado da Future...";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": "sb_publishable_J3-cgRigKn2QardNRaOFRQ_Jja51yof" },
        body: JSON.stringify({ messages: conversationMessages.slice(-20), tela: location.pathname.slice(0, 80), knowledge })
      });
      const answer = await readStream(response, target);
      if (!answer) target.textContent = "Não recebi uma resposta desta vez. Tente novamente.";
      else {
        const safeAnswer = renderFieldProposals(answer, target);
        conversationMessages.push({ id: crypto.randomUUID(), role: "assistant", parts: [{ type: "text", text: safeAnswer }] });
        maybeStartAutomaticGuide(safeAnswer);
        if (voiceModeActive) await speakAssistantReply(safeAnswer);
      }
      const diagnostic = window.FutureManualKnowledge.getStatus?.();
      status.textContent = diagnostic
        ? "Manual conectado: " + diagnostic.lessons + " aulas. Prioridade: " + (diagnostic.prioritized.join(", ") || "conteúdo geral") + "."
        : knowledge ? "Conectado ao assistente e ao Manual Future." : "Conectado à IA; o Manual não carregou nesta tentativa.";
    } catch (error) {
      target.textContent = "Não consegui conectar ao assistente agora. " + (error?.message || "Tente novamente.");
      status.textContent = "Falha de conexão.";
    } finally {
      requestInProgress = false;
      send.disabled = false;
      if (voiceModeActive) scheduleVoiceRecognition();
      input.focus();
      if (pendingErrorDiagnostic && !autoDiagnosisInProgress) window.setTimeout(runPendingErrorDiagnosis, 0);
    }
    return target;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const question = input.value.trim();
    if ((!question && pendingAttachments.length === 0) || requestInProgress || autoDiagnosisInProgress) return;
    const visibleQuestion = question || (pendingAttachments.length ? "📎 Anexo enviado para análise." : "");
    const files = pendingAttachments.splice(0, pendingAttachments.length);
    renderPendingAttachments();
    input.value = "";
    addMessage(visibleQuestion, "user");
    ask(question, files);
  });
})();