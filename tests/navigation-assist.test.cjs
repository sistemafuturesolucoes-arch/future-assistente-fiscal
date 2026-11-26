const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "../src/content.js"), "utf8");
const knowledgeSource = fs.readFileSync(path.join(__dirname, "../src/knowledge.js"), "utf8");
const manualBundle = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/manual-knowledge.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "../manifest.json"), "utf8"));

test("botão Tour guiado inicia orientação interativa baseada no Manual", () => {
  assert.match(source, /class="tour-button"/);
  assert.match(source, /\[TOUR GUIADO\]/);
  assert.match(source, /identifique a aula correspondente/);
  assert.match(source, /aguarde o usuário clicar/);
  assert.match(source, /até concluir o procedimento/);
  assert.match(source, /não clique nem preencha pelo usuário/);
});

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
  assert.match(source, /raw === "\[DONE\]"/);
  assert.match(source, /type === "finish" \|\| type === "message-finish"/);
  assert.match(source, /return \{ answer, completed: completed && !stalled \}/);
});

test("resposta interrompida tenta continuar automaticamente sem pedir nova pergunta", () => {
  assert.match(source, /A resposta foi interrompida\. Estou recuperando a continuação automaticamente/);
  assert.match(source, /\[CONTINUAÇÃO AUTOMÁTICA/);
  assert.match(source, /Continue exatamente do ponto em que parou/);
  assert.match(source, /Você não precisa repetir a pergunta/);
});

test("orientação visual usa marcador de pergunta e não sobrepõe o elemento com balão aberto", () => {
  assert.match(source, /className = "guide-question"/);
  assert.match(source, /guideState\.card\.hidden = true/);
  assert.match(source, /guideState\.marker\.style\.left/);
  assert.doesNotMatch(source, /guide-prev|guide-next|Anterior/);
  assert.match(source, /guide-end/);
});

test("painel do assistente pode ser arrastado pelo cabeçalho sem capturar botões", () => {
  assert.match(source, /const panelHeader = panel\.querySelector\("\.head"\)/);
  assert.match(source, /panelHeader\.addEventListener\("pointerdown"/);
  assert.match(source, /event\.target\.closest\("button, a, input, textarea, select"\)/);
  assert.match(source, /panelHeader\.addEventListener\("pointermove"/);
});

test("stream não considera finish-step como resposta completa e possui limite contra travamento", () => {
  assert.doesNotMatch(source, /event\.type === "finish" \|\| event\.type === "finish-step"/);
  assert.match(source, /45000/);
});

test("respostas interrompidas recebem até três tentativas automáticas de continuação", () => {
  assert.match(source, /while \(!signal\.aborted && !streamResult\.completed && answer\.trim\(\) && recoveryAttempts < 3\)/);
  assert.match(source, /recuperando a continuação automaticamente \(/i);
  assert.match(source, /\[CONTINUAÇÃO AUTOMÁTICA /);
});


test("indicador visual pode ser fechado sem reativar a navegação", () => {
  assert.match(source, /className = "guide-dismiss"/);
  assert.match(source, /clearNavigationTask\(\);\s*closeGuide\(\)/);
});

test("chat envia com Enter e preserva quebra de linha com Shift+Enter", () => {
  assert.match(source, /event\.key === "Enter" && !event\.shiftKey/);
  assert.match(source, /form\.requestSubmit\(\)/);
});

test("botão parar aborta a requisição e impede continuações automáticas", () => {
  assert.match(source, /new AbortController\(\)/);
  assert.match(source, /activeRequestController\?\.abort\(\)/);
  assert.match(source, /while \(!signal\.aborted && !streamResult\.completed/);
});

test("orientação de salvar verifica campos obrigatórios antes de destacar o botão", () => {
  assert.match(source, /const asksToSave/);
  assert.match(source, /el\.required \|\| el\.getAttribute\("aria-required"\)/);
  assert.match(source, /Antes de salvar, faltam campos obrigatórios/);
  assert.match(source, /validationField: true/);
});

test("leitura de navegação aguarda transições lentas e observa menus em qualquer região", () => {
  assert.match(source, /function navigationSnapshot\(\)/);
  assert.match(source, /waitForNavigationUpdate\(beforeSnapshot/);
  assert.match(source, /timeoutMs = 3000/);
  assert.match(source, /window\.setTimeout\(check, 80\)/);
  assert.match(source, /window\.setInterval\(check, 120\)/);
  assert.match(source, /characterData: true/);
  assert.match(source, /aria-controls/);
});

test("continuidade salva a última etapa confirmada para não reiniciar o roteiro", () => {
  assert.match(source, /lastCompletedStep: navigationLastCompletedStep/);
  assert.match(source, /navigationLastCompletedStep = current\.title/);
  assert.match(source, /Última ação confirmada pelo usuário/);
  assert.match(source, /navigationLastCompletedStep = saved\.lastCompletedStep/);
});


test("erros do Emissor não iniciam diagnóstico automático nem interrompem o chat", () => {
  assert.doesNotMatch(source, /function detectVisibleErrors/);
  assert.doesNotMatch(source, /new MutationObserver\(\(\) => \{[\s\S]{0,180}diagnos/i);
  assert.doesNotMatch(source, /autoDiagnosisInProgress|pendingErrorDiagnostic|queueErrorDiagnosis/);
  assert.match(source, /if \(\(!question && pendingAttachments\.length === 0\) \|\| requestInProgress\) return;/);
});

test("a coleta de erros é executada somente ao clicar em Revisar documento", () => {
  assert.match(source, /reviewButton\.addEventListener\("click", \(\) => \{/);
  assert.match(source, /const issues = collectDocumentIssues\(\)/);
  assert.doesNotMatch(source, /setTimeout\(detectVisibleErrors|errorObserver\.observe/);
});


test("campo de conversa permanece interativo dentro do Shadow DOM", () => {
  assert.ok(source.includes('host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none'));
  assert.ok(source.includes(":host{all:initial;pointer-events:none}"));
  assert.ok(source.includes(".panel{pointer-events:auto;position:fixed"));
  assert.ok(source.includes(".composer textarea{display:block;position:relative;z-index:1;pointer-events:auto;user-select:text;-webkit-user-select:text"));
  assert.ok(source.includes("requestAnimationFrame(() => input.focus({ preventScroll: true }))"));
});

test("extensão aceita XML e enriquece o contexto visual sem ler valores digitados", () => {
  assert.ok(source.includes('accept="image/*,audio/*,application/xml,text/xml,.xml"'));
  assert.ok(source.includes('const isXml = file.type.includes("xml")'));
  assert.ok(source.includes("file.size > 1500 * 1024"));
  assert.ok(source.includes("Campo em foco (sem ler o valor digitado)"));
  assert.ok(source.includes('el.getAttribute("aria-invalid") === "true"'));
  assert.ok(source.includes('el.getAttribute("aria-describedby")'));
});

test("cliques da navegação validam Node antes de usar contains e composedPath", () => {
  assert.ok(source.includes('typeof value.nodeType === "number"'));
  assert.ok(source.includes('typeof event.composedPath === "function"'));
  assert.ok(source.includes("path.find(node => isNode(node)"));
});

test("alvos de navegação reconhecem componentes customizados com tabindex e data-action", () => {
  assert.ok(source.includes("[data-action]"));
  assert.ok(source.includes("[tabindex]:not([tabindex='-1'])"));
});

test("temporizadores do guia são limpos ao fechar ou trocar de rota", () => {
  assert.ok(source.includes("clearTimeout(guideState.waitTimer)"));
  assert.ok(source.includes("clearTimeout(guideState.navigationTimer)"));
  assert.ok(source.includes("navigationTimer: null"));
});


test("rotas do Manual viram um plano local e o próximo passo é resolvido no DOM", () => {
  assert.match(source, /FUTURE_NAVIGATION_PLAN_REQUEST/);
  assert.match(source, /function extractNavigationPlan\(answer\)/);
  assert.match(source, /function advanceLocalNavigationPlan\(\)/);
  assert.match(source, /findElementByName\(next\.label\)/);
  assert.match(source, /plan: navigationPlan, planIndex: navigationPlanIndex/);
  assert.match(source, /navigationPlanIndex = Number\.isInteger\(saved\.planIndex\)/);
});

test("avanço normal do roteiro local não chama a IA a cada clique", () => {
  const localAdvance = source.indexOf("if (advanceLocalNavigationPlan()) return;");
  const aiFallback = source.indexOf("const responseMessage = await ask(prompt, []);", localAdvance);
  assert.ok(localAdvance > 0, "deve tentar resolver o próximo alvo localmente primeiro");
  assert.ok(aiFallback > localAdvance, "a IA só deve ser chamada depois que o alvo local não for encontrado");
  assert.match(source, /waitForNavigationUpdate\(beforeSnapshot/);
});

test("pedidos naturais de localização e cadastro ativam navegação assistida", () => {
  assert.match(source, /cadastro\|acesse\|acessar/);
  assert.match(source, /onde fica\|onde é\|onde e\|onde encontro/);
  assert.match(source, /me guie\|me mostre\|passo a passo/);
});

test("o plano local cobre o fluxo completo, inclusive campos e botão final", () => {
  assert.match(source, /ROTEIRO COMPLETO de ponta a ponta/);
  assert.match(source, /kind=field/);
  assert.match(source, /kind=final_action/);
  assert.match(source, /navigationPlanRequest/);
  assert.match(source, /parsed\.slice\(0, 30\)/);
  assert.match(source, /waitForInput: next\.kind === "field"/);
  assert.match(source, /completeNavigationInputStep/);
  assert.match(source, /Preencha este campo conforme a orientação/);
  assert.match(source, /NUNCA clique, preencha ou envie automaticamente/);
  assert.match(source, /Não vou repetir o mesmo clique automaticamente/);
});


test("Manual Future completo fica empacotado localmente na extensão", () => {
  assert.equal(manualBundle.modules.length, 5);
  assert.equal(manualBundle.lessons.length, 26);
  assert.ok(manualBundle.lessons.some(lesson => lesson.id === "cliente-cadastro"));
  assert.ok(manualBundle.lessons.some(lesson => lesson.id === "produto-dados"));
  assert.ok(manualBundle.lessons.some(lesson => lesson.id === "servico-cadastro"));
  assert.match(manualBundle.version, /^2026-11-26/);
});

test("base de conhecimento não consulta tabelas do Supabase nem baixa o Manual pela internet", () => {
  assert.match(knowledgeSource, /window\.FutureManualBundle/);
  assert.doesNotMatch(knowledgeSource, /SUPABASE_URL|PUBLISHABLE_KEY|\/rest\/v1\/course_lessons|fetch\(/);
  assert.match(knowledgeSource, /getLocalNavigationPlan/);
});

test("cadastro de clientes, produtos e serviços possui roteiros locais sem IA", () => {
  assert.match(knowledgeSource, /getLocalNavigationPlan\(question\)/);
  assert.match(knowledgeSource, /"Novo Cliente", "click"/);
  assert.match(knowledgeSource, /"CPF\/CNPJ", "field"/);
  assert.match(knowledgeSource, /"Novo Produto", "click"/);
  assert.match(knowledgeSource, /"Aba Tributação", "click"/);
  assert.match(knowledgeSource, /"Novo Serviço", "click"/);
  assert.match(knowledgeSource, /"Cód\. Trib\. Nacional", "field"/);
  const localBranch = source.indexOf("Tarefas conhecidas são conduzidas pela base instalada");
  const apiCall = source.indexOf("const requestAssistantStream = async");
  assert.ok(localBranch > 0 && apiCall > localBranch);
  assert.match(source.slice(localBranch, apiCall), /advanceLocalNavigationPlan\(\)/);
  assert.match(source.slice(localBranch, apiCall), /Nenhuma chamada à IA foi feita/);
});

test("base JSON do Manual está autorizada como recurso local da extensão", () => {
  assert.deepEqual(manifest.web_accessible_resources, []);
  assert.deepEqual(manifest.content_scripts[0].js.slice(0, 3), [
    "src/manual-knowledge.js", "src/knowledge.js", "src/content.js"
  ]);
});


test("marcadores não usam aproximação textual e exigem instrução com rótulo exato", () => {
  const start = source.indexOf("function findGuideSteps(answer)");
  const end = source.indexOf("function persistGuideProgress", start);
  const locator = source.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.match(locator, /const actionable =/);
  assert.match(locator, /lineNorm\.indexOf\(key\)/);
  assert.match(locator, /byKey\.get\(match\.key\)\?\.size !== 1/);
  assert.doesNotMatch(locator, /score >= 0\.82|tokens\.filter|answerNorm\.indexOf/);
});

test("roteiro local de condutores está ligado ao caminho correto do Manual", () => {
  assert.match(knowledgeSource, /condutor\|condutores\|motorista\|motoristas/);
  assert.match(knowledgeSource, /Cadastros > Condutores > Novo Condutor/);
  assert.match(knowledgeSource, /"Novo Condutor", "click"/);
  assert.match(knowledgeSource, /"CPF", "field"/);
  assert.match(knowledgeSource, /"Nome", "field"/);
});
