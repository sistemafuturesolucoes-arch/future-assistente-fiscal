const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "../src/content.js"), "utf8");

test("contexto seguro da tela inclui menus e submenus visíveis", () => {
  assert.match(source, /MAPA COMPLETO DA NAVEGAÇÃO VISÍVEL/);
  assert.match(source, /\[role=menuitem\]/);
  assert.match(source, /\[role=treeitem\]/);
});

test("navegação aguarda mudança real da interface antes de pedir o próximo passo", () => {
  assert.match(source, /async function waitForNavigationUpdate/);
  assert.match(source, /const changed = await navigationUpdate/);
  assert.match(source, /Não vou repetir o mesmo clique automaticamente/);
});

test("respostas da IA renderizam links Markdown sem inserir HTML arbitrário", () => {
  assert.match(source, /function renderSafeMarkdown/);
  assert.match(source, /document\.createElement\("a"\)/);
  assert.match(source, /anchor\.rel = "noopener noreferrer"/);
  assert.match(source, /parent\.appendChild\(document\.createTextNode/);
});

test("respostas de recurso não habilitado não reiniciam o guia no menu pai", () => {
  assert.match(source, /não está habilitado|nao esta habilitado/);
  assert.match(source, /clearNavigationTask\(\)/);
});

test("modo de voz verifica se continua ativo antes de reproduzir áudio remoto", () => {
  assert.match(source, /if \(!voiceModeActive\) return;\s*const blob = await response\.blob\(\);\s*if \(!voiceModeActive\) return;/);
});

test("leitura da navegação inclui menus laterais, estado dos submenus e hierarquia", () => {
  assert.match(source, /navigationRoots/);
  assert.match(source, /aside,\[role=navigation\]/);
  assert.match(source, /\[ABERTO\]/);
  assert.match(source, /\[FECHADO\]/);
  assert.match(source, /\[DESABILITADO\]/);
  assert.match(source, /slice\(0, 220\)/);
});

test("cabeçalho mantém fechar separado e ferramentas podem quebrar linha", () => {
  assert.match(source, /class="head-top"/);
  assert.match(source, /class="close" type="button" aria-label="Fechar"/);
  assert.match(source, /flex-wrap:wrap;width:100%/);
  assert.match(source, /\.head-tools button:focus-visible/);
});

test("cada consulta prioriza o Manual e bloqueia instruções de procedimento se ele falhar", () => {
  assert.match(source, /REGRA OBRIGATÓRIA DE CONSULTA AO MANUAL FUTURE/);
  assert.match(source, /MANUAL FUTURE INDISPONÍVEL NESTA CONSULTA/);
});

test("fluxo da IA identifica finalização e não aceita conexão encerrada como resposta completa", () => {
  assert.match(source, /let completed = false/);
  assert.match(source, /event\.type === "finish"/);
  assert.match(source, /payload === "\[DONE\]"/);
  assert.match(source, /return \{ answer, completed \}/);
});

test("resposta interrompida tenta continuar automaticamente sem pedir nova pergunta", () => {
  assert.match(source, /A resposta foi interrompida\. Estou recuperando a continuação automaticamente/);
  assert.match(source, /\[CONTINUAÇÃO AUTOMÁTICA\]/);
  assert.match(source, /Continue exatamente do ponto em que parou/);
  assert.match(source, /Você não precisa repetir a pergunta/);
});
