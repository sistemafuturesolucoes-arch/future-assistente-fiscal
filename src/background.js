// Abre o painel do assistente ao clicar no ícone da extensão.
chrome.action.onClicked.addListener(async tab => {
  if (!tab?.id || !tab.url?.startsWith("https://sistema.emissorfiscalonline.com.br/")) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "FUTURE_ASSISTENTE_OPEN" });
  } catch (error) {
    console.warn("Future Assistente ainda não está disponível nesta página.", error);
  }
});

// Motor de orientação inspirado no mecanismo da Lovable:
// o progresso fica no service worker, isolado por aba, e não depende
// apenas do sessionStorage do documento que pode ser substituído numa navegação.
const GUIDE_KEY_PREFIX = "future-guide-tab-";

chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (!message || !["FUTURE_GUIDE_GET", "FUTURE_GUIDE_SET", "FUTURE_GUIDE_STEP", "FUTURE_GUIDE_STOP"].includes(message.type)) {
    return false;
  }

  (async () => {
    const tabId = sender.tab?.id;
    if (typeof tabId !== "number") throw new Error("Não foi possível identificar a aba da orientação.");
    const key = GUIDE_KEY_PREFIX + tabId;

    if (message.type === "FUTURE_GUIDE_GET") {
      const stored = await chrome.storage.session.get(key);
      respond({ ok: true, guide: stored[key] || null });
      return;
    }

    if (message.type === "FUTURE_GUIDE_SET") {
      const tab = await chrome.tabs.get(tabId);
      if (!tab.url || new URL(tab.url).origin !== "https://sistema.emissorfiscalonline.com.br") {
        throw new Error("A orientação só pode ser usada dentro do Emissor Fiscal Online.");
      }
      const guide = message.guide;
      if (!guide || typeof guide !== "object" || !Array.isArray(guide.plan) || !Number.isInteger(guide.step)) {
        throw new Error("Estado de orientação inválido.");
      }
      await chrome.storage.session.set({ [key]: {
        plan: guide.plan.slice(0, 1000),
        step: Math.max(0, Math.min(guide.step, 1000)),
        task: String(guide.task || "").slice(0, 1200),
        manualTourActive: Boolean(guide.manualTourActive),
        updatedAt: Date.now(),
        origin: new URL(tab.url).origin
      } });
      respond({ ok: true });
      return;
    }

    if (message.type === "FUTURE_GUIDE_STEP") {
      const stored = await chrome.storage.session.get(key);
      const current = stored[key];
      if (current) {
        const step = Math.max(0, Math.min(Number(message.step) || 0, current.plan.length));
        await chrome.storage.session.set({ [key]: { ...current, step, updatedAt: Date.now() } });
      }
      respond({ ok: true });
      return;
    }

    await chrome.storage.session.remove(key);
    respond({ ok: true });
  })().catch(error => respond({ ok: false, error: error?.message || "Falha ao atualizar a orientação." }));

  return true;
});

// Limpa o estado quando a aba é fechada para não deixar roteiros órfãos.
chrome.tabs.onRemoved.addListener(tabId => {
  chrome.storage.session.remove(GUIDE_KEY_PREFIX + tabId);
});

// Registra uma notificação interna quando a Chrome Web Store instala uma nova versão.
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason !== "update") return;
  const version = chrome.runtime.getManifest().version;
  chrome.storage.local.set({
    futureAssistentePendingUpdateNotice: {
      version,
      previousVersion: details.previousVersion || null,
      updatedAt: Date.now()
    }
  });
});
