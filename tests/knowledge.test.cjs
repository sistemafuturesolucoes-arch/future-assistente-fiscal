const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../src/knowledge.js"), "utf8");

test("recalcula a relevância por pergunta usando o cache da mesma rota", async () => {
  const storageData = {};
  let fetchCount = 0;
  const modules = [{ id: "m1", title: "Emissão", position: 1 }];
  const lessons = [
    { id: "l1", module_id: "m1", title: "Cadastro de Serviço", summary: "Configuração do serviço", content: "Serviço municipal", position: 1 },
    { id: "l2", module_id: "m1", title: "Cadastro de Produto", summary: "Configuração do produto", content: "Produto comercial", position: 2 }
  ];
  const storage = {
    async get(key) { return { [key]: storageData[key] }; },
    async set(value) { Object.assign(storageData, value); }
  };
  const context = {
    window: { chrome: { storage: { local: storage } } },
    chrome: { storage: { local: storage } },
    location: { pathname: "/app/dashboard" },
    Date, Map, Set, Promise, String, Array, Object, Math,
    fetch: async url => {
      fetchCount++;
      const isModules = String(url).includes("course_modules");
      return { ok: true, async json() { return isModules ? modules : lessons; } };
    },
    console
  };
  vm.runInNewContext(source, context, { filename: "knowledge.js" });
  const first = await context.window.FutureManualKnowledge.load({ route: "/app/dashboard", question: "serviço municipal" });
  assert.ok(first.indexOf("Cadastro de Serviço") < first.indexOf("Cadastro de Produto"));
  const second = await context.window.FutureManualKnowledge.load({ route: "/app/dashboard", question: "produto comercial" });
  assert.ok(second.indexOf("Cadastro de Produto") < second.indexOf("Cadastro de Serviço"));
  assert.equal(fetchCount, 2);
  assert.equal(context.window.FutureManualKnowledge.getStatus().prioritized[0], "Cadastro de Produto");
});

test("não reutiliza o cache de outra rota", async () => {
  const storageData = {};
  let fetchCount = 0;
  const storage = {
    async get(key) { return { [key]: storageData[key] }; },
    async set(value) { Object.assign(storageData, value); }
  };
  const context = {
    window: { chrome: { storage: { local: storage } } },
    chrome: { storage: { local: storage } },
    location: { pathname: "/app/one" },
    Date, Map, Set, Promise, String, Array, Object, Math,
    fetch: async url => {
      fetchCount++;
      return { ok: true, async json() {
        return String(url).includes("course_modules")
          ? [{ id: "m1", title: "Módulo", position: 1 }]
          : [{ id: "l1", module_id: "m1", title: "Aula", summary: "", content: "Conteúdo", position: 1 }];
      } };
    },
    console
  };
  vm.runInNewContext(source, context, { filename: "knowledge.js" });
  await context.window.FutureManualKnowledge.load({ route: "/app/one", question: "aula" });
  await context.window.FutureManualKnowledge.load({ route: "/app/two", question: "aula" });
  assert.equal(fetchCount, 4);
});

test("prioriza a aula cujo título corresponde à intenção de navegação do usuário", async () => {
  const storageData = {};
  const storage = {
    async get(key) { return { [key]: storageData[key] }; },
    async set(value) { Object.assign(storageData, value); }
  };
  const modules = [{ id: "cad", title: "Cadastros", position: 1 }];
  const lessons = [
    { id: "clientes", module_id: "cad", title: "Cadastrar cliente", summary: "Cadastro de clientes", path: "Cadastros > Clientes > Novo Cliente", content: "Passo a passo para cadastrar um cliente", position: 1 },
    { id: "produtos", module_id: "cad", title: "Cadastrar produto", summary: "Cadastro de produtos", path: "Cadastros > Produtos", content: "Passo a passo para cadastrar produto", position: 2 }
  ];
  const context = {
    window: { chrome: { storage: { local: storage } } },
    chrome: { storage: { local: storage } },
    location: { pathname: "/app/dashboard" },
    Date, Map, Set, Promise, String, Array, Object, Math,
    fetch: async url => ({
      ok: true,
      async json() { return String(url).includes("course_modules") ? modules : lessons; }
    }),
    console
  };
  vm.runInNewContext(source, context, { filename: "knowledge.js" });
  const text = await context.window.FutureManualKnowledge.load({
    route: "/app/dashboard", question: "como cadastrar um cliente"
  });
  assert.ok(text.indexOf("Cadastrar cliente") < text.indexOf("Cadastrar produto"));
});

test("pergunta sobre regra fiscal prioriza as aulas de grupo tributário e tributação", async () => {
  const storageData = {};
  const storage = {
    async get(key) { return { [key]: storageData[key] }; },
    async set(value) { Object.assign(storageData, value); }
  };
  const modules = [{ id: "cad", title: "Cadastros", position: 1 }];
  const lessons = [
    { id: "clientes", module_id: "cad", title: "Cadastrar cliente", summary: "Dados cadastrais", path: "Cadastros > Clientes", content: "Cadastro de cliente", position: 1 },
    { id: "grupos", module_id: "cad", title: "Gerenciamento e Edição de Grupos Tributários", summary: "Configurar grupos tributários", path: "Cadastros > Grupo Tributário", content: "Gerenciar regras e grupos tributários", position: 2 },
    { id: "tributacao", module_id: "cad", title: "Cadastrar produto: Tributação", summary: "Configurar tributação", path: "Cadastros > Produtos > Tributação", content: "Definir tributação fiscal do produto", position: 3 }
  ];
  const context = {
    window: { chrome: { storage: { local: storage } } },
    chrome: { storage: { local: storage } },
    location: { pathname: "/app/dashboard" },
    Date, Map, Set, Promise, String, Array, Object, Math,
    fetch: async url => ({
      ok: true,
      async json() { return String(url).includes("course_modules") ? modules : lessons; }
    }),
    console
  };
  vm.runInNewContext(source, context, { filename: "knowledge.js" });
  const text = await context.window.FutureManualKnowledge.load({
    route: "/app/dashboard", question: "como criar uma regra fiscal"
  });
  assert.ok(text.indexOf("Gerenciamento e Edição de Grupos Tributários") < text.indexOf("Cadastrar cliente"));
  assert.ok(text.indexOf("Cadastrar produto: Tributação") < text.indexOf("Cadastrar cliente"));
});
