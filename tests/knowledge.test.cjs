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
  assert.ok(Array.isArray(ctx.knowledge.getLocalNavigationPlan("Quero configurar uma regra tributária específica")));
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

test("gera roteiro local para ajustar CFOP em grupo tributário sem chamar a IA", async () => {
  const ctx = createKnowledgeContext();
  const text = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como ajustar o cfop no grupo tributario"
  });
  assert.ok(text.includes("Gerenciamento e Edição de Grupos Tributários"));
  assert.ok(text.includes("Cadastros > Grupo Tributário"));
  assert.ok(text.includes("CFOP"));
  const plan = ctx.knowledge.getLocalNavigationPlan("como ajustar o cfop no grupo tributario");
  assert.ok(Array.isArray(plan));
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Grupo Tributário", "Procurar", "Opções", "Editar Regra", "CFOP", "Salvar"
  ]);
  assert.equal(plan.at(-1).kind, "final_action");
  assert.equal(plan.find(step => step.label === "CFOP").kind, "field");
});

test("prioriza a aula correta para campos e siglas presentes em todos os módulos", async () => {
  const ctx = createKnowledgeContext();
  const company = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como configurar certificado digital A1 e série da NF-e"
  });
  assert.ok(company.includes("Configurando os Dados Gerais da Empresa"));
  const product = await ctx.knowledge.load({
    route: "/app/dashboard", question: "onde alterar NCM e CEST do produto"
  });
  assert.ok(product.includes("Cadastrar produto: Dados do Produto"));
  const service = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como preencher CNAE e NBS do serviço"
  });
  assert.ok(service.includes("Cadastrar serviço"));
  const consumer = await ctx.knowledge.load({
    route: "/app/dashboard", question: "como emitir cupom fiscal NFC-e"
  });
  assert.ok(consumer.includes("Emissão e Gestão de Notas do Consumidor (NFC-e)"));
});

test("gera roteiro local genérico para navegar em módulos sem roteiro fixo", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({
    route: "/app/dashboard", question: "como emitir uma NFC-e"
  });
  const plan = ctx.knowledge.getLocalNavigationPlan("como emitir uma NFC-e");
  assert.ok(Array.isArray(plan));
  assert.ok(plan.length > 0);
  assert.equal(plan[0].label, "Documentos");
  assert.ok(plan.some(step => /NFC.?e/i.test(step.label)));
});

test("mantém as 26 aulas e os cinco módulos disponíveis na extensão", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "mostrar todo o manual" });
  const status = ctx.knowledge.getStatus();
  assert.equal(status.lessons, 26);
  assert.equal(status.modules, 5);
  assert.equal(status.source, "local");
  assert.equal(ctx.getFetchCount(), 0);
});

test("fornece resposta local completa quando a IA não retorna conteúdo", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({
    route: "/app/dashboard", question: "como ajustar CFOP no grupo tributário"
  });
  const answer = ctx.knowledge.getLocalAnswer("como ajustar CFOP no grupo tributário");
  assert.ok(answer.includes("Gerenciamento e Edição de Grupos Tributários"));
  assert.ok(answer.includes("Cadastros → Grupo Tributário"));
  assert.ok(answer.includes("CFOP"));
  assert.ok(answer.includes("contabilidade"));
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

test("gera roteiro local para instalar ou renovar certificado A1 sem depender da IA", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "como carregar um novo arquivo do certificado digital A1" });
  const plan = ctx.knowledge.getLocalNavigationPlan("como carregar um novo arquivo do certificado digital A1");
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Configurações", "Empresa", "Certificado Digital", "Opções", "Arquivo .pfx"
  ]);
  assert.equal(plan.at(-1).kind, "field");
  assert.match(plan.at(-1).description, /senha.*diretamente no sistema/i);
});

test("gera roteiro local para informar CSC e ID CSC da NFC-e sem depender da IA", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "onde informar o código CSC da nota de cupom" });
  const plan = ctx.knowledge.getLocalNavigationPlan("onde informar o código CSC da nota de cupom");
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Configurações", "Empresa", "Notas Fiscais", "NFC-e", "CSC", "ID CSC", "Salvar Configurações"
  ]);
  assert.equal(plan.at(-1).kind, "final_action");
  assert.ok(plan.some(step => step.label === "ID CSC" && step.kind === "field"));
});

test("extrai campos descritos em listas e hotspots de configuração para a navegação local", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "como alterar a série da NFC-e" });
  const plan = ctx.knowledge.getLocalNavigationPlan("como alterar a série da NFC-e");
  assert.ok(Array.isArray(plan));
  assert.ok(plan.some(step => /Série.*NFC-e/i.test(step.label) && step.kind === "field"));
  assert.ok(plan.some(step => /NFC-e/i.test(step.label)));
});
