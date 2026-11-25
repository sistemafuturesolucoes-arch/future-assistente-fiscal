import { flows, resolveIntent } from './flows.js';
const status = document.getElementById('status');
async function start(intent) {
  try {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (!tab?.id) throw new Error('Abra a aba do seu emissor.');
    const result = await chrome.runtime.sendMessage({type: 'START', tabId: tab.id, intent});
    if (!result?.ok) throw new Error(result?.error || 'Não foi possível iniciar o guia.');
    window.close();
  } catch (error) { status.textContent = error.message; }
}
for (const [intent, flow] of Object.entries(flows)) {
  const button = document.createElement('button');
  button.textContent = `${flow.title} ↗`;
  button.addEventListener('click', () => start(intent));
  document.getElementById('suggestions').append(button);
}
document.getElementById('ask').addEventListener('submit', event => {
  event.preventDefault();
  const intent = resolveIntent(document.getElementById('question').value);
  if (intent) start(intent);
  else status.textContent = 'Posso ajudar com clientes, produtos ou notas fiscais. Qual deles você procura?';
});
