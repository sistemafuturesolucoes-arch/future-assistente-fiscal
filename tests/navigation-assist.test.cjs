const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "../src/content.js"), "utf8");

test("contexto seguro da tela inclui menus e submenus visíveis", () => {
  assert.match(source, /Itens de navegação, menus e submenus atualmente visíveis/);
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
  assert.match(source, /target\.appendChild\(document\.createTextNode/);
});

test("respostas de recurso não habilitado não reiniciam o guia no menu pai", () => {
  assert.match(source, /não está habilitado\|nao esta habilitado/);
  assert.match(source, /clearNavigationTask\(\)/);
});

test("modo de voz verifica se continua ativo antes de reproduzir áudio remoto", () => {
  assert.match(source, /if \(!voiceModeActive\) return;\s*const blob = await response\.blob\(\);\s*if \(!voiceModeActive\) return;/);
});
