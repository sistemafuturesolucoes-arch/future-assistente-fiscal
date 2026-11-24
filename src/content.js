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
  const SOUND_KEY = "futureAssistenteErrorSound";
  let soundEnabled = true;
  let audioContext = null;
  let lastErrorFingerprint = "";
  let lastErrorAt = 0;

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
      pendingAttachments.push({ name: file.name || (isImage ? "print.png" : "audio.webm"), mediaType: file.type, url });
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
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
        if (blob.size) await addAttachment(new File([blob], "gravacao-future.webm", { type: blob.type }));
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

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function getElementName(el) {
    const labels = el.labels ? [...el.labels].map(x => x.innerText || "").join(" ") : "";
    const wrappingLabel = el.closest("label")?.innerText || "";
    return (labels || wrappingLabel || el.getAttribute("aria-label") || el.getAttribute("placeholder") ||
      el.getAttribute("title") || el.innerText || el.getAttribute("name") || el.id || "").trim();
  }

  function findElementByName(name) {
    const wanted = normalize(name);
    if (!wanted) return null;
    const nodes = [...document.querySelectorAll("input,select,textarea,button,[role=button],[role=combobox],[role=checkbox],[role=tab],a")];
    return nodes.find(el => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" &&
        normalize(getElementName(el)) === wanted;
    }) || null;
  }

  function findGuideSteps(answer) {
    const answerNorm = normalize(answer);
    const nodes = [...document.querySelectorAll("input,select,textarea,button,[role=button],[role=combobox],[role=checkbox],[role=tab],a")]
      .filter(el => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden";
      });
    const lines = answer.split(/\n+/).map(x => x.replace(/[*#`]/g, "").trim()).filter(Boolean);
    const candidates = [];
    for (const el of nodes) {
      const name = getElementName(el);
      const key = normalize(name);
      if (key.length < 4) continue;
      const exactAt = answerNorm.indexOf(key);
      let score = exactAt >= 0 ? 1 : 0;
      if (!score) {
        const tokens = key.split(" ").filter(t => t.length > 2);
        const hits = tokens.filter(t => answerNorm.includes(t)).length;
        score = tokens.length ? hits / tokens.length : 0;
      }
      if (score >= 0.78) candidates.push({ el, name, key, exactAt, score });
    }
    candidates.sort((a, b) => {
      if (a.exactAt >= 0 && b.exactAt >= 0) return a.exactAt - b.exactAt;
      if (a.exactAt >= 0) return -1;
      if (b.exactAt >= 0) return 1;
      return b.score - a.score;
    });
    const steps = [];
    const seen = new Set();
    for (const candidate of candidates) {
      if (seen.has(candidate.key)) continue;
      seen.add(candidate.key);
      const line = lines.find(x => normalize(x).includes(candidate.key)) ||
        lines.find(x => candidate.key.split(" ").filter(t => t.length > 2).some(t => normalize(x).includes(t))) || "";
      const description = line.length > candidate.name.length + 8 ? line :
        "Confira este elemento indicado pela orientação antes de fazer qualquer alteração.";
      steps.push({ element: candidate.el, title: candidate.name.slice(0, 90), description: description.slice(0, 420) });
      if (steps.length >= 12) break;
    }
    return steps;
  }

  function closeGuide() {
    if (!guideState) return;
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

  function startVisualGuide(steps) {
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
      window.setTimeout(() => {
        if (!guideState) return;
        if (guideState.index >= guideState.steps.length - 1) closeGuide();
        else showGuideStep(guideState.index + 1);
      }, 280);
    };
    guideState = { steps, index: 0, frame, card, onTargetClick, reposition: () => showGuideStep(guideState?.index || 0) };
    card.querySelector(".guide-prev").addEventListener("click", () => showGuideStep(Math.max(0, guideState.index - 1)));
    card.querySelector(".guide-next").addEventListener("click", () => {
      if (guideState.index >= guideState.steps.length - 1) closeGuide();
      else showGuideStep(guideState.index + 1);
    });
    card.querySelector(".guide-end").addEventListener("click", closeGuide);
    document.addEventListener("scroll", guideState.reposition, true);
    document.addEventListener("click", onTargetClick, true);
    window.addEventListener("resize", guideState.reposition);
    showGuideStep(0);
  }

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

  function detectVisibleErrors() {
    const selectors = '[role="alert"],[aria-live="assertive"],.invalid-feedback,.text-danger,[data-state="error"],.toast-error';
    const candidates = [...document.querySelectorAll(selectors)].filter(el => {
      if (host.contains(el)) return false;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden";
    });
    for (const el of candidates) {
      const message = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
      if (message.length < 4 || message.length > 500) continue;
      const fingerprint = normalize(message);
      if (fingerprint === lastErrorFingerprint && Date.now() - lastErrorAt < 8000) continue;
      lastErrorFingerprint = fingerprint;
      lastErrorAt = Date.now();
      playErrorBeeps();
      panel.classList.add("open");
      addMessage("⚠️ Detectei uma mensagem de possível erro na tela:\n" + message + "\n\nVou ajudar a interpretar. Confira o campo destacado e, se necessário, envie sua dúvida no chat.", "bot");
      status.textContent = "Possível erro detectado. Confira a mensagem e a orientação.";
      const rect = el.getBoundingClientRect();
      const frame = document.createElement("div");
      frame.className = "spotlight";
      Object.assign(frame.style, {
        left: Math.max(2, rect.left - 5) + "px",
        top: Math.max(2, rect.top - 5) + "px",
        width: Math.max(12, rect.width + 10) + "px",
        height: Math.max(12, rect.height + 10) + "px"
      });
      shadow.appendChild(frame);
      window.setTimeout(() => frame.remove(), 6500);
      break;
    }
  }

  const errorObserver = new MutationObserver(() => detectVisibleErrors());
  errorObserver.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "role", "aria-live", "data-state"] });
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

  async function ask(question) {
    const context = safeScreenContext();
    let knowledge = "";
    try {
      status.textContent = "Carregando as aulas do Manual relacionadas a esta tela...";
      knowledge = await window.FutureManualKnowledge.load({ route: location.pathname, question });
    } catch (error) {
      console.warn("Não foi possível carregar o Manual Academy", error);
    }
    const files = pendingAttachments.splice(0, pendingAttachments.length);
    renderPendingAttachments();
    const attachmentContext = files.some(file => file.mediaType.startsWith("audio/"))
      ? "\n\nO usuário anexou um áudio. Transcreva o que foi dito em português, identifique a dúvida e responda com base no Manual e na tela atual. Se algo estiver inaudível, informe isso sem adivinhar."
      : files.some(file => file.mediaType.startsWith("image/"))
        ? "\n\nO usuário anexou um print ou imagem. Analise o que está visível, leia mensagens de erro e oriente com cuidado. Não presuma dados que não aparecem na imagem."
        : "";
    const parts = [{ type: "text", text: (question || (files.length ? "Analise o anexo enviado e me ajude." : "")) + attachmentContext + "\n\nCONTEXTO ATUAL DA TELA:\n" + context }];
    for (const file of files) parts.push({ type: "file", mediaType: file.mediaType, filename: file.name, url: file.url });
    const userMessage = { id: crypto.randomUUID(), role: "user", parts };
    conversationMessages.push(userMessage);
    const target = addMessage("", "bot");
    send.disabled = true;
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
        conversationMessages.push({ id: crypto.randomUUID(), role: "assistant", parts: [{ type: "text", text: answer }] });
        maybeStartAutomaticGuide(answer);
      }
      const diagnostic = window.FutureManualKnowledge.getStatus?.();
      status.textContent = diagnostic
        ? "Manual conectado: " + diagnostic.lessons + " aulas. Prioridade: " + (diagnostic.prioritized.join(", ") || "conteúdo geral") + "."
        : knowledge ? "Conectado ao assistente e ao Manual Future." : "Conectado à IA; o Manual não carregou nesta tentativa.";
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
    if ((!question && pendingAttachments.length === 0) || send.disabled) return;
    const visibleQuestion = question || (pendingAttachments.length ? "📎 Anexo enviado para análise." : "");
    input.value = "";
    addMessage(visibleQuestion, "user");
    ask(question);
  });
})();