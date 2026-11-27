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
    "Cadastros", "Grupo Tributário", "Procurar", "Botão Opções da Linha", "Editar", "Regras Tributárias", "Editar Regra", "CFOP", "Salvar"
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
    "Configurações", "Empresa", "Certificado Digital", "Opções", "Arquivo .pfx", "Senha do certificado", "Salvar"
  ]);
  assert.equal(plan.at(-1).kind, "final_action");
  assert.ok(plan.some(step => step.label === "Senha do certificado" && /diretamente no campo do Emissor/i.test(step.description)));
});

test("gera roteiro local para informar CSC e ID CSC da NFC-e sem depender da IA", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "onde informar o código CSC da nota de cupom" });
  const plan = ctx.knowledge.getLocalNavigationPlan("onde informar o código CSC da nota de cupom");
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Configurações", "Empresa", "Notas Fiscais", "NFC-e"
  ]);
  assert.match(plan.at(-1).description, /CSC e ID CSC/i);
});

test("extrai campos descritos em listas e hotspots de configuração para a navegação local", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "como alterar a série da NFC-e" });
  const plan = ctx.knowledge.getLocalNavigationPlan("como alterar a série da NFC-e");
  assert.ok(Array.isArray(plan));
  assert.ok(plan.some(step => /Série.*NFC-e/i.test(step.label) && step.kind === "field"));
  assert.ok(plan.some(step => /NFC-e/i.test(step.label)));
});


test("pedidos de localização param no destino exato em vez de abrir um fluxo de cadastro", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "onde fica a configuração da NFC-e?" });
  const nfce = ctx.knowledge.getLocalNavigationPlan("onde fica a configuração da NFC-e?");
  assert.deepEqual(Array.from(nfce, step => step.label), [
    "Configurações", "Empresa", "Notas Fiscais", "NFC-e"
  ]);
  assert.match(nfce.at(-1).description, /parâmetros do documento/i);

  await ctx.knowledge.load({ route: "/app/dashboard", question: "onde fica o certificado digital?" });
  const certificate = ctx.knowledge.getLocalNavigationPlan("onde fica o certificado digital?");
  assert.deepEqual(Array.from(certificate, step => step.label), [
    "Configurações", "Empresa", "Certificado Digital"
  ]);
});

test("pergunta de localização para cadastros não inclui campos nem botão salvar", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "onde fica o cadastro de clientes?" });
  const plan = ctx.knowledge.getLocalNavigationPlan("onde fica o cadastro de clientes?");
  assert.ok(Array.isArray(plan));
  assert.ok(plan.some(step => step.label === "Clientes"));
  assert.ok(!plan.some(step => step.kind === "field" || step.kind === "final_action"));
});

test("emissão de NFe usa hotspots ordenados das telas e inclui a ação final documentada", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "como emitir uma NFe?" });
  const plan = ctx.knowledge.getLocalNavigationPlan("como emitir uma NFe?");
  assert.ok(Array.isArray(plan));
  assert.ok(plan.some(step => /Emitir NFe/i.test(step.label)));
  assert.ok(plan.some(step => /Natureza da operação/i.test(step.label)));
  assert.ok(plan.some(step => /Destinatário/i.test(step.label)));
  assert.ok(plan.some(step => /Quantidade/i.test(step.label)));
  assert.ok(plan.some(step => /Pagamentos/i.test(step.label)));
  assert.ok(plan.some(step => /Gerar NFe/i.test(step.label) && step.kind === "final_action"));
});

test("exportação de XML aproveita os passos e hotspots da aula em vez de parar só no menu", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "como exportar XML das notas?" });
  const plan = ctx.knowledge.getLocalNavigationPlan("como exportar XML das notas?");
  assert.ok(Array.isArray(plan));
  assert.ok(plan.some(step => /Exportar XML/i.test(step.label)));
  assert.ok(plan.some(step => /Período/i.test(step.label) || /Ambiente/i.test(step.label) || /Enviar/i.test(step.label)));
});


test("emissão de NFS-e não é confundida com cadastro de serviço", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard", question: "como emitir uma NFS-e?" });
  const plan = ctx.knowledge.getLocalNavigationPlan("como emitir uma NFS-e?");
  assert.ok(Array.isArray(plan));
  assert.equal(plan[0].label, "Documentos");
  assert.ok(plan.some(step => /Tomador|Cliente/i.test(step.label)));
  assert.ok(plan.some(step => /Descrição Serviço/i.test(step.label)));
  assert.ok(plan.some(step => /Gerar/i.test(step.label) && step.kind === "final_action"));
  assert.ok(!plan.some(step => step.label === "Novo Serviço"));
});

test("fluxos de CT-e, CT-e OS, MDF-e e CIOT usam as aulas de transporte do Manual", async () => {
  const ctx = createKnowledgeContext();
  const cases = [
    ["como emitir um CT-e", /CT-e/i, /Tomador|Remetente|Destinatário/i],
    ["como emitir um CT-e OS", /CTe OS|CT-e OS/i, /Tomador/i],
    ["como emitir um MDF-e", /MDFe|MDF-e/i, /Municípios|Veículo|Condutor/i],
    ["como emitir um CIOT", /CIOT/i, /Pagamento|Contratante|Emitente/i]
  ];
  for (const [question, routePattern, fieldPattern] of cases) {
    await ctx.knowledge.load({ route: "/app/dashboard", question });
    const plan = ctx.knowledge.getLocalNavigationPlan(question);
    assert.ok(Array.isArray(plan), question + " deve gerar roteiro local");
    assert.equal(plan[0].label, "Documentos", question + " deve começar no menu Documentos");
    assert.ok(plan.some(step => routePattern.test(step.label)), question + " deve apontar para o módulo correto");
    assert.ok(plan.some(step => fieldPattern.test(step.label)), question + " deve usar campos/hotspots da aula");
  }
});


test("todas as aulas navegáveis do Manual geram o caminho local correspondente", async () => {
  const ctx = createKnowledgeContext();
  for (const lesson of manualBundle.lessons) {
    const expected = String(lesson.path || "").split(/\s*>\s*/)
      .map(part => part.trim())
      .filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
    if (!expected.length) continue;
    const question = "onde fica " + lesson.title + "?";
    await ctx.knowledge.load({ route: "/app/dashboard", question });
    const plan = ctx.knowledge.getLocalNavigationPlan(question);
    assert.ok(Array.isArray(plan) && plan.length, "deve gerar rota para: " + lesson.title);
    assert.deepEqual(Array.from(plan, step => step.label), expected, "rota divergente para: " + lesson.title);
  }
});


test("configurações dos modelos fiscais levam à aba interna correta da Empresa", async () => {
  const ctx = createKnowledgeContext();
  const cases = [
    ["onde fica o CSC?", ["Configurações", "Empresa", "Notas Fiscais", "NFC-e"]],
    ["onde fica a série da NF-e?", ["Configurações", "Empresa", "Notas Fiscais", "NF-e"]],
    ["onde fica a série da NFS-e?", ["Configurações", "Empresa", "Notas Fiscais", "NFS-e"]],
    ["onde fica a série do CT-e?", ["Configurações", "Empresa", "Notas Fiscais", "CT-e"]],
    ["onde fica a série do CT-e OS?", ["Configurações", "Empresa", "Notas Fiscais", "CT-e OS"]],
    ["onde fica a configuração do MDF-e?", ["Configurações", "Empresa", "Notas Fiscais", "MDF-e"]]
  ];
  for (const [question, expected] of cases) {
    await ctx.knowledge.load({ route: "/app/dashboard", question });
    const plan = ctx.knowledge.getLocalNavigationPlan(question);
    assert.deepEqual(Array.from(plan, step => step.label), expected, question);
  }
});


test("conferência de CFOP no grupo tributário para no campo e não oferece salvar", async () => {
  const ctx = createKnowledgeContext();
  const question = "me ajude a conferir o cfop no grupo tributaria nas regras";
  await ctx.knowledge.load({ route: "/app/dashboard", question });
  const plan = ctx.knowledge.getLocalNavigationPlan(question);
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Grupo Tributário", "Procurar", "Botão Opções da Linha", "Editar", "Regras Tributárias", "Editar Regra", "CFOP"
  ]);
  assert.equal(plan.at(-1).kind, "field");
  assert.ok(!plan.some(step => step.kind === "final_action"));
});

test("resposta local de conferência de CFOP é curta e não afirma validade sem contexto", async () => {
  const ctx = createKnowledgeContext();
  const question = "me ajude a conferir o cfop no grupo tributaria nas regras";
  await ctx.knowledge.load({ route: "/app/dashboard", question });
  const answer = ctx.knowledge.getLocalAnswer(question);
  assert.ok(answer.length < 600);
  assert.match(answer, /Cadastros.*Grupo Tributário/);
  assert.match(answer, /envie um print/i);
  assert.match(answer, /não dá para afirmar se o CFOP está correto/i);
  assert.doesNotMatch(answer, /Aula:|Salvar/);
});


test("pedido simples para alterar CFOP inicia roteiro visual mesmo sem mencionar grupo tributário", async () => {
  const ctx = createKnowledgeContext();
  const question = "Como altero o CFOP?";
  await ctx.knowledge.load({ route: "/app/dashboard", question });
  const plan = ctx.knowledge.getLocalNavigationPlan(question);
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Grupo Tributário", "Procurar", "Botão Opções da Linha", "Editar", "Regras Tributárias", "Editar Regra", "CFOP", "Salvar"
  ]);
  assert.equal(plan[0].kind, "click");
  assert.equal(plan.at(-1).kind, "final_action");
  assert.match(plan.find(step => step.label === "Procurar").description, /pesquisa.*grupo/i);
  assert.match(plan.find(step => step.label === "Botão Opções da Linha").description, /linha/i);
  assert.equal(plan.find(step => step.label === "Botão Opções da Linha").manualMarker.title, "Botão Opções da Linha");
  assert.equal(plan.find(step => step.label === "CFOP").manualMarker.title, "CFOP");
  assert.ok(plan.find(step => step.label === "CFOP").manualMarker.id);
});

test("variação 'Como ajusto o CFOP?' inicia o guia visual local com marcadores", async () => {
  const ctx = createKnowledgeContext();
  const question = "Como ajusto o CFOP?";
  await ctx.knowledge.load({ route: "/app/dashboard", question });
  const plan = ctx.knowledge.getLocalNavigationPlan(question);
  assert.ok(Array.isArray(plan), "a pergunta deve gerar um plano visual local, não cair na resposta textual de fallback");
  assert.deepEqual(Array.from(plan, step => step.label), [
    "Cadastros", "Grupo Tributário", "Procurar", "Botão Opções da Linha", "Editar", "Regras Tributárias", "Editar Regra", "CFOP", "Salvar"
  ]);
  for (const label of ["Cadastros", "Grupo Tributário", "Procurar", "Botão Opções da Linha", "Editar Regra", "CFOP"]) {
    const step = plan.find(item => item.label === label);
    assert.ok(step?.manualMarker?.id, `o passo ${label} deve carregar o marcador do Manual Future`);
  }
});

test("Tour Guiado local percorre as 26 aulas e cada marcador único do Manual", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard" });
  const plan = ctx.knowledge.getManualTourPlan();
  const expectedLessons = [...manualBundle.lessons].sort((a, b) => {
    const ma = manualBundle.modules.find(m => m.id === a.module_id)?.position ?? 999;
    const mb = manualBundle.modules.find(m => m.id === b.module_id)?.position ?? 999;
    return ma - mb || (a.position ?? 0) - (b.position ?? 0);
  });
  const expected = new Set();
  for (const lesson of expectedLessons) {
    const seen = new Set();
    const add = marker => {
      if (!marker?.title) return;
      const key = marker.id ? "id:" + marker.id : "text:" + marker.title + "|" + (marker.description || "");
      if (seen.has(key)) return;
      seen.add(key);
      expected.add(lesson.id + ":" + key);
    };
    (lesson.hotspots || []).forEach(add);
    (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(add));
  }
  const lessonStarts = plan.filter(step => step.lessonStart);
  const markers = plan.filter(step => step.manualMarker);
  assert.equal(lessonStarts.length, 26);
  assert.equal(markers.length, expected.size);
  assert.deepEqual(Array.from(lessonStarts, step => step.lessonId), Array.from(expectedLessons, lesson => lesson.id));
  const actual = new Set(markers.map(step => step.lessonId + ":" + (step.manualMarker.id
    ? "id:" + step.manualMarker.id
    : "text:" + step.manualMarker.title + "|" + step.manualMarker.description)));
  assert.deepEqual(actual, expected);
  assert.equal(ctx.knowledge.getManualTourCoverage().modules, 5);
  assert.equal(ctx.knowledge.getManualTourCoverage().lessons, 26);
  assert.equal(ctx.knowledge.getManualTourCoverage().markers, expected.size);
});

test("Tour Guiado conserva título, descrição, dica e aliases de cada marcador", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard" });
  const plan = ctx.knowledge.getManualTourPlan();
  for (const step of plan.filter(item => item.manualMarker)) {
    assert.ok(step.lessonTitle, "cada marcador deve estar vinculado à aula");
    assert.ok(step.moduleTitle, "cada marcador deve estar vinculado ao módulo");
    assert.ok(step.manualMarker.title);
    assert.ok(Array.isArray(step.targetNames) && step.targetNames.includes(step.label));
    assert.equal(step.description.includes(step.manualMarker.description), Boolean(step.manualMarker.description));
  }
});

test("roteiro genérico de cada aula inclui todos os marcadores únicos na ordem do Manual", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard" });
  const candidates = manualBundle.lessons.filter(lesson =>
    !/cliente|produto|servi[cç]o|ve[ií]culo|condutor/i.test(lesson.title || "")
  );
  for (const lesson of candidates) {
    const question = "Como executar a rotina " + lesson.title;
    const plan = ctx.knowledge.getLocalNavigationPlan(question);
    assert.ok(Array.isArray(plan) && plan.length, "sem roteiro para a aula: " + lesson.title);
    const actualIds = plan.map(step => step.manualMarker?.id).filter(Boolean);
    const expectedIds = [];
    const seen = new Set();
    const add = marker => {
      if (!marker?.title || !marker.id || seen.has(marker.id)) return;
      seen.add(marker.id);
      expectedIds.push(marker.id);
    };
    (lesson.hotspots || []).forEach(add);
    (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(add));
    assert.deepEqual(actualIds.filter(id => expectedIds.includes(id)), expectedIds,
      "os marcadores devem aparecer na mesma ordem do Manual: " + lesson.title);
  }
});

test("perguntas de edição não são confundidas com cadastro de novo registro", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard" });
  const plan = ctx.knowledge.getLocalNavigationPlan("Como editar cadastro de cliente?");
  assert.ok(Array.isArray(plan) && plan.length);
  assert.ok(!plan.some(step => /^Novo Cliente$/i.test(step.label)));
  assert.ok(plan.some(step => /Editar|Opções da Linha/i.test(step.label)));
});

test("perguntas de exclusão orientam a linha existente e não abrem formulário novo", async () => {
  const ctx = createKnowledgeContext();
  await ctx.knowledge.load({ route: "/app/dashboard" });
  const plan = ctx.knowledge.getLocalNavigationPlan("Como excluir um cliente?");
  assert.ok(Array.isArray(plan) && plan.length);
  assert.ok(!plan.some(step => /^Novo Cliente$/i.test(step.label)));
  assert.ok(plan.some(step => /Excluir/i.test(step.label)));
});
