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
    .brand{font-weight:750;font-size:15px}.sub{font-size:11px;opacity:.8}.head-tools{display:flex;align-items:center;gap:8px}.manual-link{border:1px solid #ffffff55;background:#ffffff16;color:#fff;border-radius:8px;padding:6px 9px;font:600 11px system-ui;cursor:pointer}.close{border:0;background:transparent;color:#fff;font-size:23px;cursor:pointer}
    .messages{flex:1;overflow:auto;padding:13px;background:#faf9fc}.msg{max-width:90%;padding:10px 12px;margin:0 0 10px;border-radius:13px;white-space:pre-wrap;overflow-wrap:anywhere}.bot{background:#fff;border:1px solid #ece7f2}.user{background:#eee4fa;margin-left:auto;color:#32104f}
    .status{font-size:11px;color:#786c83;padding:5px 13px}.composer{display:flex;gap:8px;padding:10px;border-top:1px solid #eee9f4}.composer textarea{resize:none;flex:1;min-width:0;height:48px;border:1px solid #d9d0e3;border-radius:11px;padding:9px;font:13px system-ui;outline-color:#7840bd}.send{border:0;border-radius:11px;background:#54218a;color:white;padding:0 14px;font-weight:650;cursor:pointer}.send:disabled{opacity:.5;cursor:wait}
    .notice{font-size:10px;color:#81768b;padding:0 12px 9px}
    .spotlight{position:fixed;z-index:2147483645;border:3px solid #ffbf36;border-radius:9px;box-shadow:0 0 0 9999px #160d2866,0 0 12px 5px #ffbf36,0 0 30px 10px #ff8c00;pointer-events:none;transition:all .18s ease}
    .guide-card{position:fixed;z-index:2147483647;width:min(330px,calc(100vw - 28px));box-sizing:border-box;background:#25103f;color:#fff;border:1px solid #b88aff;border-radius:14px;padding:13px;box-shadow:0 12px 40px #12091f88;font:13px/1.45 system-ui;pointer-events:auto}
    .guide-card .guide-kicker{font-size:10px;color:#d7baff;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .guide-card .guide-title{font-size:15px;font-weight:800;margin:4px 0 6px}
    .guide-card .guide-desc{font-size:12px;color:#f2eafa;white-space:pre-wrap}
    .guide-card .guide-controls{display:flex;gap:6px;margin-top:12px}
    .guide-card button{border:1px solid #9d73c8;border-radius:8px;background:#48216e;color:#fff;padding:7px 9px;font:600 11px system-ui;cursor:pointer}
    .guide-card button:disabled{opacity:.35;cursor:default}.guide-card .guide-end{margin-left:auto;background:#fff;color:#35105f}
    @media(max-width:520px){.panel{right:8px;left:8px;bottom:82px;width:auto;height:calc(100vh - 105px)}.launcher{right:14px;bottom:14px}}
  `;
  shadow.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "launcher";
  launcher.type = "button";
  launcher.title = "Abrir Assistente Future";
  launcher.textContent = "🤖";
  const panel = document.createElement("section");
  panel.className = "panel";
  panel.innerHTML = `
    <header class="head"><div><div class="brand">Future Assistente Fiscal</div><div class="sub">Seu copiloto dentro do Emissor</div></div><div class="head-tools"><button class="manual-link" type="button">Manual</button><button class="close" aria-label="Fechar">×</button></div></header>
    <div class="messages" aria-live="polite"><div class="msg bot">Olá! Sou o assistente da Future. Posso ajudar a entender a tela, localizar campos e interpretar mensagens de erro. Também posso destacar campos e botões para orientar você visualmente. Não vou emitir nem transmitir documentos por você.</div></div>
    <div class="status">O Manual será consultado conforme a tela atual.</div>
    <form class="composer"><textarea aria-label="Digite sua dúvida" placeholder="Digite sua dúvida..." maxlength="3000"></textarea><button class="send" type="submit">Enviar</button></form>
    <div class="notice">Evite enviar CPF/CNPJ, dados de notas, senhas ou PINs. Orientações fiscais devem ser confirmadas com a contabilidade.</div>
  `;
  shadow.append(launcher, panel);

  const messages = panel.querySelector(".messages");
  const form = panel.querySelector("form");
  const input = panel.querySelector("textarea");
  const send = panel.querySelector(".send");
  const status = panel.querySelector(".status");
  const conversationMessages = [];
  let guideState = null;

  const addMessage = (text, role) => {
    const el = document.createElement("div");
    el.className = "msg " + role;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };
  launcher.addEventListener("click", () => panel.classList.toggle("open"));
  panel.querySelector(".close").addEventListener("click", () => panel.classList.remove("open"));
  panel.querySelector(".manual-link").addEventListener("click", () => window.open(MANUAL_URL, "_blank", "noopener"));

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

  function findGuideSteps(answer) {
    const answerNorm = normalize(answer);
    const nodes = [...document.querySelectorAll("input,select,textarea,button,[role=button],[role=combobox],[role=checkbox]")]
      .filter(el => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden";
      });
    const lines = answer.split(/\n+/).map(x => x.replace(/[*#`]/g, "").trim()).filter(Boolean);
    const steps = [];
    const seen = new Set();
    for (const el of nodes) {
      const name = getElementName(el);
      const key = normalize(name);
      if (key.length < 4 || seen.has(key) || !answerNorm.includes(key)) continue;
      seen.add(key);
      const line = lines.find(x => normalize(x).includes(key)) || "";
      const description = line.length > name.length + 8 ? line : "Este é o elemento **" + name + "** mencionado na orientação. Confira as instruções antes de alterar qualquer informação.";
      steps.push({ element: el, title: name.slice(0, 90), description: description.slice(0, 420) });
      if (steps.length >= 12) break;
    }
    return steps;
  }

  function closeGuide() {
    if (!guideState) return;
    document.removeEventListener("scroll", guideState.reposition, true);
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
      <div class="guide-controls"><button class="guide-prev" type="button">Anterior</button><button class="guide-next" type="button">Próximo</button><button class="guide-end" type="button">Encerrar</button></div>
    `;
    shadow.append(frame, card);
    guideState = { steps, index: 0, frame, card, reposition: () => showGuideStep(guideState?.index || 0) };
    card.querySelector(".guide-prev").addEventListener("click", () => showGuideStep(Math.max(0, guideState.index - 1)));
    card.querySelector(".guide-next").addEventListener("click", () => {
      if (guideState.index >= guideState.steps.length - 1) closeGuide();
      else showGuideStep(guideState.index + 1);
    });
    card.querySelector(".guide-end").addEventListener("click", closeGuide);
    document.addEventListener("scroll", guideState.reposition, true);
    window.addEventListener("resize", guideState.reposition);
    showGuideStep(0);
  }

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
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: question + "\n\nCONTEXTO ATUAL DA TELA:\n" + context }]
    };
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
    if (!question || send.disabled) return;
    input.value = "";
    addMessage(question, "user");
    ask(question);
  });
})();