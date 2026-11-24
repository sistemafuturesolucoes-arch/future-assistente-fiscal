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
    .launcher{position:fixed;z-index:2147483646;width:60px;height:60px;border:0;border-radius:50%;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;color:#fff;background:linear-gradient(145deg,#7838c8,#35105f);box-shadow:0 8px 28px #1d123b55;font:700 24px system-ui;transition:box-shadow .15s,transform .15s}.launcher:active{cursor:grabbing;transform:scale(.96)}.launcher.dragging{box-shadow:0 12px 34px #1d123b88,0 0 0 4px #b98aff55}
    .panel{position:fixed;z-index:2147483647;right:22px;bottom:94px;width:370px;height:min(590px,calc(100vh - 125px));display:none;flex-direction:column;background:#fff;color:#211b2b;border:1px solid #e6dff0;border-radius:18px;box-shadow:0 18px 60px #17102040;overflow:hidden;font:14px/1.45 system-ui,-apple-system,sans-serif}
    .panel.open{display:flex}.head{background:#35105f;color:#fff;padding:15px 16px;display:flex;align-items:center;justify-content:space-between}
    .brand{font-weight:750;font-size:15px}.sub{font-size:11px;opacity:.8}.head-tools{display:flex;align-items:center;gap:7px}.manual-link,.sound-toggle{border:1px solid #ffffff55;background:#ffffff16;color:#fff;border-radius:8px;padding:6px 9px;font:600 11px system-ui;cursor:pointer}.sound-toggle{min-width:34px;padding:6px}.sound-toggle[aria-pressed="false"]{opacity:.55}.close{border:0;background:transparent;color:#fff;font-size:23px;cursor:pointer}
    .messages{flex:1;overflow:auto;padding:13px;background:#faf9fc}.msg{max-width:90%;padding:10px 12px;margin:0 0 10px;border-radius:13px;white-space:pre-wrap;overflow-wrap:anywhere}.bot{background:#fff;border:1px solid #ece7f2}.user{background:#eee4fa;margin-left:auto;color:#32104f}
    .status{font-size:11px;color:#786c83;padding:5px 13px}.composer{display:flex;align-items:flex-end;gap:7px;padding:10px;border-top:1px solid #eee9f4;flex-wrap:wrap}.composer textarea{resize:none;flex:1;min-width:90px;height:48px;border:1px solid #d9d0e3;border-radius:11px;padding:9px;font:13px system-ui;outline-color:#7840bd}.send{border:0;border-radius:11px;background:#54218a;color:white;padding:0 14px;height:48px;font-weight:650;cursor:pointer}.send:disabled{opacity:.5;cursor:wait}.attach,.record{height:42px;min-width:38px;border:1px solid #d9d0e3;border-radius:10px;background:#fff;color:#54218a;font-size:18px;cursor:pointer}.record.recording{background:#fff0f0;border-color:#d33;color:#b21f2d}.pending-files{display:flex;gap:5px;flex-wrap:wrap;width:100%;padding:0 1px}.pending-file{display:flex;align-items:center;gap:5px;background:#f0e8f8;border-radius:7px;padding:4px 7px;font-size:10px;color:#452069;max-width:100%}.pending-file span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:190px}.pending-file button{border:0;background:transparent;color:#6c3a90;cursor:pointer;font-size:13px}.hidden-file{display:none}
    .notice{font-size:10px;color:#81768b;padding:0 12px 9px}
    .spotlight{position:fixed;z-index:2147483645;border:3px solid #ffbf36;border-radius:9px;box-shadow:0 0 0 9999px #160d2866,0 0 12px 5px #ffbf36,0 0 30px 10px #ff8c00;pointer-events:none;transition:all .18s ease}
    .guide-card{position:fixed;z-index:2147483647;width:min(330px,calc(100vw - 28px));box-sizing:border-box;background:#25103f;color:#fff;border:1px solid #b88aff;border-radius:14px;padding:13px;box-shadow:0 12px 40px #12091f88;font:13px/1.45 system-ui;pointer-events:auto}
    .guide-card .guide-kicker{font-size:10px;color:#d7baff;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .guide-card .guide-title{font-size:15px;font-weight:800;margin:4px 0 6px}
    .guide-card .guide-desc{font-size:12px;color:#f2eafa;white-space:pre-wrap}
    .guide-card .guide-controls{display:flex;gap:6px;margin-top:12px}
    .guide-card button{border:1px solid #9d73c8;border-radius:8px;background:#48216e;color:#fff;padding:7px 9px;font:600 11px system-ui;cursor:pointer}
    .guide-card button:disabled{opacity:.35;cursor:default}.guide-card .guide-end{margin-left:auto;background:#fff;color:#35105f}.guide-card .guide-hint{font-size:10px;color:#d7baff;margin-top:8px}
    .proposal-card{margin-top:9px;padding:10px;border:1px solid #d8c5ef;border-radius:11px;background:#fbf8ff;color:#30213e;font-size:12px}.proposal-title{font-weight:750;margin-bottom:5px}.proposal-field{font-weight:700;margin-top:7px}.proposal-value{padding:7px;margin:4px 0 8px;background:#fff;border:1px solid #e7deef;border-radius:7px;white-space:pre-wrap;overflow-wrap:anywhere}.proposal-actions{display:flex;gap:7px}.proposal-actions button{border:0;border-radius:8px;padding:7px 10px;font:650 11px system-ui;cursor:pointer}.proposal-confirm{background:#54218a;color:#fff}.proposal-cancel{background:#eee8f4;color:#4d3b5c}.proposal-note{font-size:10px;color:#756782;margin-top:7px}
    @media(max-width:520px){.panel{right:8px;left:8px;bottom:82px;width:auto;height:calc(100vh - 105px)}.launcher{right:14px;bottom:14px}}
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
    <header class="head"><div><div class="brand">Future Assistente Fiscal</div><div class="sub">Seu copiloto dentro do Emissor</div></div><div class="head-tools"><button class="sound-toggle" type="button" aria-label="Ativar ou desativar alertas sonoros" aria-pressed="true" title="Alertas sonoros">🔔</button><button class="manual-link" type="button">Manual</button><button class="close" aria-label="Fechar">×</button></div></header>
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
      pendingAttachments.push({ name: file.name || (isImage ? "print.png" : "audio.webm"), mediaType: isAudio ? "audio/webm" : file.type, size: file.size, url });
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

  const addMessage = (text, role) => {
    const el = document.createElement("div");
    el.className = "msg " + role;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };
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
  });

  launcher.addEventListener("click", () => {
    if (Date.now() < suppressLauncherClickUntil) return;
    panel.classList.toggle("open");
  });
  panel.querySelector(".close").addEventListener("click", () => panel.classList.remove("open"));
  panel.querySelector(".manual-link").addEventListener("click", () => window.open(MANUAL_URL, "_blank", "noopener"));
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
      .filter(isVisible).slice(0, 45).map(el => (el.innerText || el.getAttribute("aria-label") || el.getAttribute("title") || "").trim()).filter(Boolean);
    const errors = [...document.querySelectorAll('[role=alert],.error,.invalid-feedback,[aria-live="assertive"]')]
      .filter(isVisible).slice(0, 15).map(el => (el.innerText || "").trim()).filter(Boolean);
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
      "Botões visíveis: " + redact(buttons.join(" | ")).slice(0, 2500)
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
    if (el.matches("button,[role=button],[role=tab],a")) add(el.innerText || el.textContent);
    add(el.getAttribute("name"));
    return names;
  }

  function getElementName(el) {
    return getElementNames(el)[0] || el.getAttribute("name") || el.id || "";
  }

  const GUIDE_NODE_SELECTOR = "input,select,textarea,button,a,[role=button],[role=combobox],[role=checkbox],[role=tab],[role=textbox],[role=radio],[role=switch]";

  function isGuideNodeVisible(el) {
    if (!el || host.contains(el)) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" &&
      s.opacity !== "0" && !el.disabled && el.getAttribute("aria-hidden") !== "true";
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
    const lines = answer.split(/\\n+/).map(x => x.replace(/[*#`]/g, "").trim()).filter(Boolean);
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
      const nextIndex = guideState.index + 1;
      guideState.pendingIndex = nextIndex;
      persistGuideProgress(nextIndex);
      window.setTimeout(() => {
        if (!guideState) return;
        if (nextIndex >= guideState.steps.length) closeGuide();
        else showGuideStep(nextIndex);
      }, 280);
    };
    guideState = { steps, index: 0, pendingIndex: null, frame, card, onTargetClick, reposition: () => showGuideStep(guideState?.index || 0) };
    card.querySelector(".guide-prev").addEventListener("click", () => showGuideStep(Math.max(0, guideState.index - 1)));
    card.querySelector(".guide-next").addEventListener("click", () => {
      if (guideState.index >= guideState.steps.length - 1) closeGuide();
      else showGuideStep(guideState.index + 1);
    });
    card.querySelector(".guide-end").addEventListener("click", closeGuide);
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

  window.addEventListener("pageshow", scheduleGuideRestore);
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
      const rect = el.getBoundingClientRect();
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
    const instructionIntent = /(?:clique|selecione|acesse|abra|localize|procure|preencha|informe|escolha|vá até|avance|primeiro passo|próximo passo|passo\s*\d|para continuar|para corrigir|corrija|verifique o campo)/i.test(answer);
    if (!instructionIntent) return false;
    const steps = findGuideSteps(answer);
    if (!steps.length) return false;
    startVisualGuide(steps);
    status.textContent = "Orientação visual ativa. Siga o destaque; o assistente aguardará sua ação.";
    return true;
  }


  const FIELD_PROPOSAL_OPEN = "[[FUTURE_FIELD_PROPOSAL]]";
  const FIELD_PROPOSAL_CLOSE = "[[/FUTURE_FIELD_PROPOSAL]]";
  const SENSITIVE_FIELD_NAME = /\b(cpf|cnpj|e-?mail|telefone|celular|senha|password|pin|token|certificado|chave privada)\b/i;

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
          if (!field || !value || SENSITIVE_FIELD_NAME.test(field)) continue;
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
    target.textContent = cleanAnswer;
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
        const resolved = resolveSafeField(proposal.field);
        if (resolved.error) {
          value.textContent = resolved.error;
          confirm.disabled = true;
          return;
        }
        const el = resolved.element;
        let nextValue = proposal.value;
        if (el.matches("select")) {
          const option = [...el.options].find(opt => opt.value === nextValue || normalize(opt.textContent) === normalize(nextValue));
          if (!option) {
            value.textContent = "A opção sugerida não corresponde exatamente a uma opção disponível. Nada foi alterado.";
            confirm.disabled = true;
            return;
          }
          nextValue = option.value;
        } else if (el.matches("input") && el.type === "number") {
          if (!/^-?(?:\d+|\d*\.\d+)$/.test(nextValue)) {
            value.textContent = "O valor sugerido não é um número válido para este campo. Nada foi alterado.";
            confirm.disabled = true;
            return;
          }
        } else if (el.matches("input") && el.type === "date") {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(nextValue)) {
            value.textContent = "A data sugerida não está no formato esperado. Nada foi alterado.";
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
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
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

  async function ask(question, files = []) {
    if (requestInProgress) return;
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
    const proposalProtocol = "\n\nRECURSO OPCIONAL DE SUGESTÃO DE PREENCHIMENTO: Se, e somente se, você tiver base suficiente no Manual e na conversa para sugerir valores concretos para campos visíveis da tela atual, acrescente ao final um bloco isolado exatamente neste formato: [[FUTURE_FIELD_PROPOSAL]][{\"field\":\"rótulo exato do campo\",\"value\":\"valor sugerido\"}][[/FUTURE_FIELD_PROPOSAL]]. Use JSON válido, no máximo 8 itens, strings simples. O campo deve ser identificado pelo rótulo visível exato; não invente campos. Não inclua CPF, CNPJ, e-mail, telefone, senha, PIN, token ou dados de certificado. Se não houver certeza, não inclua bloco. Antes do bloco, explique a origem e a incerteza de cada sugestão. A extensão só apresentará botão para confirmação explícita; jamais sugira clicar em emitir, transmitir, autorizar ou encerrar.";
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
      input.focus();
      if (pendingErrorDiagnostic && !autoDiagnosisInProgress) window.setTimeout(runPendingErrorDiagnosis, 0);
    }
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