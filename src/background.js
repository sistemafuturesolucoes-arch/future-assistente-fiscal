// Abre o painel do assistente ao clicar no ícone da extensão.
chrome.action.onClicked.addListener(async tab => {
  if (!tab?.id || !tab.url?.startsWith("https://sistema.emissorfiscalonline.com.br/")) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "FUTURE_ASSISTENTE_OPEN" });
  } catch (error) {
    console.warn("Future Assistente ainda não está disponível nesta página.", error);
  }
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
