const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../src/knowledge.js"), "utf8");
const manualBundle = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/manual-knowledge.json"), "utf8"));

function createKnowledgeContext() {
  let fetchCount = 0;
  const context = {
    window: { FutureManualBundle: manualBundle },
    location: { pathname: "/app/dashboard" },
    Date, Map, Set, Promise, String, Array, Object, Math, encodeURIComponent,
    fetch: async () => { fetchCount++; throw new Error("A base local não deve fazer requisições."); },
    console
  };
  vm.runInNewContext(source, context, { filename: "knowledge.js" });
  return { knowledge: context.window.FutureManualKnowledge, getFetchCount: () => fetchCount };
}

test("recalcula a relevância por pergunta usando a base local", async () => {
  const ctx = createKnowledgeContext();
  const service = await ctx.knowledge.load({ route: "/app/dashboard", question: "Cadastrar serviço" });
  const product = await ctx.knowledge.load({ route: "/app/dashboard", question: "Cadastrar produto NCM" });
  assert.ok(service.indexOf("Cadastrar serviço") >= 0);
  assert.ok(product.indexOf("Cadastrar produto: Dados do Produto") >= 0);
  assert.equal(ctx.knowledge.getStatus().source, "local");
  assert.equal(ctx.knowledge.getStatus().lessons, 26);
  assert.equal(ctx.getFetchCount(), 0);
});

test("reutiliza a mesma base local ao trocar de rota, sem consultar o Supabase", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/one", question: "cadastro" });
  await ctx.knowledge.load({ route: "/app/two", question: "cadastro" });
  assert.equal(ctx.getFetchCount(), 0);
});

test("prioriza a aula cujo título corresponde à intenção de navegação do usuário", async () => {
  const ctx = createKnowledgeContext();
  const text = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como cadastrar um cliente"
  });
  assert.ok(text.indexOf("Cadastrar cliente") >= 0);
  assert.equal(text.indexOf("Cadastrar produto: Dados do Produto"), -1, "não deve enviar aulas sem relação com a pergunta");
});

test("pergunta sobre regra fiscal prioriza as aulas de grupo tributário e tributação", async () => {
  const ctx = createKnowledgeContext();
  const text = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como criar uma regra fiscal"
  });
  assert.ok(text.indexOf("Gerenciamento e Edição de Grupos Tributários") >= 0);
  assert.ok(text.indexOf("Cadastrar produto: Tributação") >= 0);
});

test("gera roteiro local completo para cadastro de cliente sem precisar da IA", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "cadastrar cliente" });
  const plan = ctx.knowledge.getLocalNavigationPlan("Como cadastrar um cliente?");
  assert.ok(Array.isArray(plan));
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Clientes", "Novo Cliente", "CPF/CNPJ", "Nome",
    "Consumidor Final", "Contribuinte ICMS", "Endereço Principal", "CEP", "Salvar"
  ]);
  assert.equal(plan.at(-1).kind, "final_action");
  assert.ok(plan.some(step => step.kind === "field"));
});

test("gera roteiros locais de produto e serviço e deixa tarefas desconhecidas para a IA", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "cadastrar produto" });
  assert.ok(ctx.knowledge.getLocalNavigationPlan("Quero cadastrar um produto").length > 0);
  assert.ok(ctx.knowledge.getLocalNavigationPlan("Preciso cadastrar um serviço").length > 0);
  assert.equal(ctx.knowledge.getLocalNavigationPlan("Quero configurar uma regra tributária específica"), null);
});


test("gera roteiro local documentado para cadastrar veículo sem depender da IA", async () => {
  const ctx = createKnowledgeContext();
  const text = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como cadastrar um veículo"
  });
  assert.ok(text.includes("Gerenciamento e Edição de Veículos"));
  const plan = ctx.knowledge.getLocalNavigationPlan("como cadastrar um veículo");
  assert.ok(Array.isArray(plan));
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Veículos", "Novo Veículo", "Placa", "UF",
    "Tipo Rodado", "Tipo Carroceria", "Número de eixos", "Salvar"
  ]);
  assert.equal(plan.at(-1).kind, "final_action");
});

test("reconhece a aula de condutores mesmo quando o usuário usa o singular e pede para cadastrar", async () => {
  const ctx = createKnowledgeContext();
  const text = await ctx.knowledge.load({
    route: "/app/dashboard", question: "Como cadastrar um condutor?"
  });
  assert.ok(text.includes("Cadastro de Condutores"));
  assert.ok(text.includes("Cadastros > Condutores"));
  assert.ok(text.includes("Novo Condutor"));
  const plan = ctx.knowledge.getLocalNavigationPlan("Como cadastrar um condutor?");
  assert.ok(Array.isArray(plan));
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Condutores", "Novo Condutor", "Ativo", "CPF", "Nome", "Salvar"
  ]);
  assert.equal(plan.at(-1).kind, "final_action");
});
