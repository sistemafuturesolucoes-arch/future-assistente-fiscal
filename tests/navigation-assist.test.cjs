const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "../src/content.js"), "utf8");

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
  assert.match(source, /event\.type === "finish"/);
  assert.match(source, /payload === "\[DONE\]"/);
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
  assert.doesNotMatch(source, /guide-prev|guide-next|Anterior|Concluir/);
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
  assert.match(source, /waitForNavigationUpdate\(beforeSnapshot\)/);
  assert.match(source, /timeoutMs = 5000/);
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

test("a coleta de erros é executada somente ao clicar em Revisar documento e é protegida contra falhas", () => {
  assert.match(source, /reviewButton\.addEventListener\("click", \(\) => \{/);
  assert.match(source, /try\s*\{\s*issues = collectDocumentIssues\(\)/);
  assert.match(source, /finally\s*\{[\s\S]{0,900}reviewActive = false/);
  assert.doesNotMatch(source, /setTimeout\(detectVisibleErrors|errorObserver\.observe/);
});

test("campo de conversa permanece interativo dentro do Shadow DOM", () => {
  assert.ok(source.includes('host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none'));
  assert.ok(source.includes(":host{all:initial;pointer-events:none}"));
  assert.ok(source.includes(".panel{pointer-events:auto;position:fixed"));
  assert.ok(source.includes(".composer textarea{display:block;position:relative;z-index:1;pointer-events:auto;user-select:text;-webkit-user-select:text"));
  assert.ok(source.includes("requestAnimationFrame(() => focusComposer())"));
  assert.ok(source.includes("const focusComposer = () =>"));
  assert.ok(source.includes("input.addEventListener(\"input\""));
});

test("extensão aceita XML e enriquece o contexto visual sem ler valores digitados", () => {
  assert.ok(source.includes('accept="image/*,audio/*,application/xml,text/xml,.xml"'));
  assert.ok(source.includes('const isXml = file.type.includes("xml")'));
  assert.ok(source.includes("file.size > 1500 * 1024"));
  assert.ok(source.includes("Campo em foco (sem ler o valor digitado)"));
  assert.ok(source.includes('el.getAttribute("aria-invalid") === "true"'));
  assert.ok(source.includes('el.getAttribute("aria-describedby")'));
});

test("revisão não declara sucesso quando a IA devolve resposta vazia", () => {
  assert.match(source, /!String\(reviewMessage\.textContent \|\| ""\)\.trim\(\)/);
  assert.match(source, /não recebi uma resposta/i);
  assert.match(source, /target\.dataset\.requestFailed = "true"/);
});

test("revisão reconhece alertas comuns do Emissor, incluindo toast e mensagens de validação", () => {
  assert.match(source, /\.toast-body/);
  assert.match(source, /\.alert-danger/);
  assert.match(source, /\[data-sonner-toast\]/);
  assert.match(source, /validation\|rejected/);
});

test("falha ao ler metadados da tela não deixa o chat bloqueado", () => {
  assert.match(source, /let context = "";\s*try\s*\{\s*context = safeScreenContext\(\)/);
  assert.match(source, /metadados visuais da tela não puderam ser lidos/);
  assert.match(source, /requestInProgress = false/);
  assert.match(source, /send\.disabled = false/);
});


test("compositor recupera foco e permanece editável ao abrir o painel", () => {
  assert.match(source, /const focusComposer = \(\) => \{[\s\S]*?input\.disabled = false;[\s\S]*?input\.readOnly = false;[\s\S]*?input\.focus\(/);
  assert.match(source, /requestAnimationFrame\(\(\) => focusComposer\(\)\)/);
  assert.match(source, /input\.addEventListener\("input"/);
});

test("chat oferece conteúdo do Manual quando a IA ou o provedor falha", () => {
  assert.match(source, /quotaOrProviderFailure/);
  assert.match(source, /modo de apoio pelo Manual ativo/);
  assert.match(source, /Encontrei este conteúdo do Manual para ajudar agora/);
});

test("revisão visual termina localmente mesmo sem resposta da IA", () => {
  assert.match(source, /Revisão visual local concluída/);
  assert.match(source, /renderReviewIssueCards\(issues, reviewMessage\)/);
  assert.match(source, /Não foram encontrados campos inválidos ou alertas de erro visíveis/);
});


test("submenus atualizados são detectados mesmo quando ficam fora dos primeiros itens do DOM", () => {
  assert.match(source, /function collectPageElements\(selector\)/);
  assert.match(source, /getBoundingClientRect\(\)/);
  assert.match(source, /style\.display \+ "\/" \+ style\.visibility/);
  assert.doesNotMatch(source, /items\.slice\(0, 900\)/);
});

test("destaque prefere o controle mais específico dentro de menus aninhados", () => {
  assert.match(source, /const specificCandidates = candidates\.filter/);
  assert.match(source, /candidate\.el\.contains\(other\.el\)/);
  assert.match(source, /return a\.name\.length - b\.name\.length/);
});

test("marcador ? abre e fecha o balão sem perder o evento de clique", () => {
  assert.match(source, /marker\.addEventListener\("click", event =>/);
  assert.match(source, /guideState\.card\.hidden = !guideState\.card\.hidden/);
  assert.match(source, /event\.stopPropagation\(\)/);
});

test("botão x encerra o destaque e remove seus elementos", () => {
  assert.match(source, /dismiss\.addEventListener\("click", event =>/);
  assert.match(source, /clearNavigationTask\(\);\s*closeGuide\(\);/);
  assert.match(source, /guideState\.dismiss\?\.remove\(\)/);
});

test("contorno acompanha o retângulo real do controle e não desloca ao rolar", () => {
  assert.match(source, /function positionGuideStep\(\)/);
  assert.match(source, /const pad = 2/);
  assert.match(source, /reposition: scheduleGuidePosition/);
  assert.doesNotMatch(source, /reposition: \(\) => showGuideStep/);
});

test("avisos visíveis pausam a continuação automática e preservam o chat", () => {
  assert.match(source, /function hasVisibleErrorIndicators\(\)/);
  assert.match(source, /if \(hasVisibleErrorIndicators\(\)\)/);
  assert.match(source, /Encontrei uma mensagem de erro\/retorno nesta tela/);
  assert.match(source, /Não iniciei uma análise automática para não bloquear sua conversa/);
});


test("carregar uma página nunca inicia IA automaticamente nem bloqueia o compositor", () => {
  const start = source.indexOf("function restoreNavigationAfterPageLoad()");
  const end = source.indexOf('window.addEventListener("pageshow"', start);
  assert.ok(start >= 0 && end > start);
  const restore = source.slice(start, end);
  assert.match(restore, /navigationGuideActive = false/);
  assert.match(restore, /Orientação pausada nesta tela/);
  assert.doesNotMatch(restore, /continueNavigationGuide\(\)/);
  assert.doesNotMatch(restore, /\\bask\(/);
});

test("páginas com campos inválidos pausam a restauração do tour sem bloquear o chat", () => {
  assert.match(source, /input:invalid,select:invalid,textarea:invalid/);
  assert.match(source, /\[aria-invalid="true"\]/);
  assert.match(source, /\.is-invalid/);
  assert.match(source, /\.field-error/);
  assert.match(source, /A orientação foi pausada e o chat está livre/);
});

test("marcador visual não usa sombra de tela inteira nem animação de layout", () => {
  const start = source.indexOf(".spotlight{");
  const end = source.indexOf("}", start);
  const css = source.slice(start, end);
  assert.doesNotMatch(css, /9999px/);
  assert.match(css, /transition:none/);
  assert.match(source, /function scheduleGuidePosition\(\)/);
  assert.match(source, /requestAnimationFrame\(\(\) => \{\s*guidePositionFrame = 0;\s*positionGuideStep\(\)/);
  assert.match(source, /reposition: scheduleGuidePosition/);
});

test("fechar orientação cancela atualização visual pendente", () => {
  assert.match(source, /function closeGuide\(\) \{\s*if \(guidePositionFrame\) \{\s*cancelAnimationFrame\(guidePositionFrame\)/);
});

test("marcadores ? e × recebem cliques mesmo dentro do host com pointer-events desativado", () => {
  assert.match(source, /\.guide-question,\.guide-dismiss\{pointer-events:auto;touch-action:manipulation\}/);
  assert.match(source, /marker\.addEventListener\("click"/);
  assert.match(source, /dismiss\.addEventListener\("click"/);
});

test("mudanças de estado CSS em menus são reconhecidas pela navegação guiada", () => {
  assert.match(source, /String\(el\.className \|\| ""\)\.slice\(0, 180\)/);
  assert.match(source, /el\.getAttribute\("style"\) \|\| ""/);
  assert.match(source, /async function waitForNavigationUpdate\(beforeSnapshot, timeoutMs = 5000\)/);
});

test("navegação varre todos os elementos interativos sem truncar os primeiros 900", () => {
  assert.match(source, /function collectPageElements\(selector\)/);
  assert.match(source, /root\.querySelectorAll\(selector\)/);
  assert.match(source, /if \(el\.shadowRoot\) visitRoot\(el\.shadowRoot\)/);
  assert.match(source, /if \(el\.tagName === 'IFRAME'\)/);
  assert.match(source, /const fingerprint = items\.map\(el =>/);
  assert.doesNotMatch(source, /items\.slice\(0, 900\)/);
  assert.match(source, /el\.getAttribute\("aria-label"\)/);
});
