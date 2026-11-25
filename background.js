chrome.runtime.onMessage.addListener((message, sender, respond) => {
  (async () => {
    const tabId = sender.tab?.id ?? message.tabId;
    if (typeof tabId !== 'number') throw new Error('Não foi possível identificar a aba.');
    const key = `guide-${tabId}`;
    if (message.type === 'START') {
      const tab = await chrome.tabs.get(tabId);
      if (!tab.url || new URL(tab.url).origin !== 'https://sistema.emissorfiscalonline.com.br') throw new Error('Abra o Emissor Fiscal Online e entre na sua conta antes de iniciar.');
      await chrome.storage.session.set({[key]: {intent: message.intent, step: 0, origin: new URL(tab.url).origin}});
      await chrome.scripting.executeScript({target: {tabId}, files: ['content.js']});
    } else if (message.type === 'GET_GUIDE') {
      const data = await chrome.storage.session.get(key);
      respond({ok: true, guide: data[key]}); return;
    } else if (message.type === 'STEP') {
      const data = await chrome.storage.session.get(key);
      if (data[key]) await chrome.storage.session.set({[key]: {...data[key], step: message.step}});
    } else if (message.type === 'STOP') await chrome.storage.session.remove(key);
    respond({ok: true});
  })().catch(error => respond({ok: false, error: error.message}));
  return true;
});
chrome.tabs.onUpdated.addListener(async (tabId, change, tab) => {
  if (change.status !== 'complete' || !tab.url) return;
  const key = `guide-${tabId}`;
  const data = await chrome.storage.session.get(key);
  if (!data[key] || new URL(tab.url).origin !== data[key].origin) return;
  try { await chrome.scripting.executeScript({target: {tabId}, files: ['content.js']}); } catch { /* Page permission may have expired. Reopen the extension to resume. */ }
});
chrome.tabs.onRemoved.addListener(tabId => chrome.storage.session.remove(`guide-${tabId}`));
