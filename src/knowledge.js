(() => {
  let bundlePromise = null;
  let lastStatus = null;

  async function loadBundle() {
    if (!bundlePromise) {
      const data = window.FutureManualBundle;
      if (!Array.isArray(data?.modules) || !Array.isArray(data?.lessons)) {
        throw new Error("A base local do Manual Future não foi carregada pela extensão.");
      }
      bundlePromise = Promise.resolve(data);
    }
    return bundlePromise;
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function relevance(lesson, route, question) {
    const title = normalize(lesson.title);
    const summary = normalize(lesson.summary);
    const path = normalize(lesson.path);
    const content = normalize(lesson.content);
    const hotspotTitles = normalize((lesson.hotspots || []).map(h => h.title).join(" "));
    const hotspotText = normalize((lesson.hotspots || []).map(h => [h.title, h.description, h.tip].join(" ")).join(" "));
    const haystack = [title, summary, path, content, hotspotText].join(" ");
    const r = normalize(route);
    const q = normalize(question);
    let score = 0;

    if (/nfse|nota.?de.?servico|servico/.test(r) && /nfse|nota.?fiscal.?de.?servico/.test(haystack)) score += 70;
    if (/notas\/servico|notas\/servico\/emitir/.test(r) && /nfse|servico/.test(haystack)) score += 50;
    if (!q) return score;

    const stop = new Set([
      "como","onde","fica","me","ajude","ajuda","ajudar","por","favor","para","com","uma","um","de","do","da","dos","das",
      "no","na","nos","nas","o","a","os","as","e","ou","que","qual","quais","meu","minha","meus","minhas",
      "novo","nova","cadastrar","cadastre","cadastro","criar","crie","fazer","faco","quero","preciso","ajustar","ajuste",
      "editar","edite","alterar","altere","corrigir","corrija","configurar","configure","preencher","preencha","informar",
      "informe","campo","campos","sistema","emissor","passo","passos","guia","guiar"
    ]);
    const stem = value => value.replace(/(oes|aes|ais|eis|es|s)$/,"");
    const terms = [...new Set(q.split(/[^a-z0-9]+/).filter(t => t.length > 1 && !stop.has(t)).map(stem))];

    if (title && q.includes(title)) score += 180;
    if (title && title.includes(q)) score += 130;
    for (const term of terms) {
      if (title.includes(term)) score += 24;
      if (path.includes(term)) score += 17;
      if (summary.includes(term)) score += 11;
      if (hotspotTitles.includes(term)) score += 10;
      if (content.includes(term)) score += 4;
    }
    if (/cfop/.test(q) && /grupo.?tributario/.test(title + " " + path)) score += 115;
    if (/cfop/.test(q) && /cfop/.test(content)) score += 45;
    if (/(cst|csosn|icms|pis|cofins|ipi)/.test(q) && /grupo.?tributario|tributacao/.test(title + " " + path)) score += 85;
    if (/(ncm|cest|ean|gtin|origem)/.test(q) && /produto/.test(title + " " + path)) score += 85;
    if (/(cnae|nbs|issqn|item.?lista.?servico)/.test(q) && /servico/.test(title + " " + path)) score += 85;
    if (/(csc|id.?csc|serie|numeracao|certificado|pfx|regime.?tributario)/.test(q) && /empresa|configur/.test(title + " " + path)) score += 85;
    if (/(motorista|condutor)/.test(q) && /condutor/.test(title + " " + path)) score += 90;
    if (/(placa|reboque|renavam|veiculo)/.test(q) && /veiculo/.test(title + " " + path)) score += 90;
    if (/(nfe|nota.?eletronica)/.test(q) && /nfe/.test(title + " " + path)) score += 75;
    if (/(nfce|cupom|consumidor)/.test(q) && /nfce|consumidor/.test(title + " " + path)) score += 75;
    if (/(nfse|nota.?de.?servico)/.test(q) && /nfse|servico/.test(title + " " + path)) score += 75;
    if (/(cte|conhecimento.?transporte)/.test(q) && /cte/.test(title + " " + path)) score += 75;
    if (/(mdfe|manifesto)/.test(q) && /mdfe|manifesto/.test(title + " " + path)) score += 75;
    const matched = terms.filter(term => haystack.includes(term));
    if (terms.length && matched.length === terms.length) score += 55;
    if (terms.length && matched.length) score += matched.length * 7;
    return score;
  }

  function lessonText(lesson, includeVisuals = true) {
    const parts = [
      `## Aula: ${lesson.title}`,
      lesson.path ? `Caminho no sistema: ${lesson.path}` : "",
      lesson.id ? `Link da aula no Manual: https://crm.futuresolucoes.com.br/manual/aula/${encodeURIComponent(lesson.id)}` : "",
      lesson.summary || "",
      lesson.content || ""
    ];
    if (includeVisuals) {
      for (const h of (Array.isArray(lesson.hotspots) ? lesson.hotspots : [])) {
        if (!h) continue;
        parts.push(`- ${h.title || "Elemento"}: ${h.description || ""}${h.tip ? " Dica: " + h.tip : ""}`);
      }
      for (const shot of (Array.isArray(lesson.screenshots) ? lesson.screenshots : [])) {
        if (!shot) continue;
        if (shot.caption) parts.push(`Referência visual: ${shot.caption}`);
        for (const h of (Array.isArray(shot.hotspots) ? shot.hotspots : [])) {
          if (!h) continue;
          parts.push(`- ${h.title || "Elemento"}: ${h.description || ""}${h.tip ? " Dica: " + h.tip : ""}`);
        }
      }
    }
    return parts.filter(Boolean).join("\n");
  }

  function buildKnowledge(bundle, route, question) {
    const moduleById = new Map(bundle.modules.map(m => [m.id, m]));
    const ranked = [...bundle.lessons].sort((a, b) =>
      relevance(b, route, question) - relevance(a, route, question) ||
      (a.position || 0) - (b.position || 0)
    );
    const relevant = ranked.filter(l => relevance(l, route, question) > 0);
    const selected = relevant.slice(0, 9);
    const parts = [
      "BASE LOCAL DO MANUAL FUTURE. Este conteúdo já está instalado dentro da extensão; não é necessário consultar o site do Manual.",
      "Não invente regras fiscais nem valores tributários. Quando a decisão depender do regime, município ou enquadramento, explique a dúvida e recomende confirmação com a contabilidade.",
      "Use somente as aulas selecionadas abaixo, que foram priorizadas pela pergunta e pela tela atual. Se faltar informação, diga exatamente o que não está documentado."
    ];
    for (const lesson of selected) {
      const mod = moduleById.get(lesson.module_id);
      parts.push(`# Módulo: ${mod?.title || "Manual"}`);
      parts.push(lessonText(lesson, true));
    }
    return parts.join("\n\n").slice(0, 42000);
  }

  function findHotspot(bundle, label, path = "") {
    const target = normalize(label);
    const lessons = [...bundle.lessons].sort((a, b) =>
      Number(normalize(b.path) === normalize(path)) - Number(normalize(a.path) === normalize(path))
    );
    for (const lesson of lessons) {
      for (const hotspot of (lesson.hotspots || [])) {
        if (normalize(hotspot.title) === target) return hotspot;
      }
      for (const shot of (lesson.screenshots || [])) {
        for (const hotspot of (shot.hotspots || [])) {
          if (normalize(hotspot.title) === target) return hotspot;
        }
      }
    }
    return null;
  }

  function makeStep(bundle, label, kind, path, extraDescription = "") {
    const hotspot = findHotspot(bundle, label, path);
    const description = extraDescription || hotspot?.description || `Localize ${label} na tela atual.`;
    return { label, kind, path, description };
  }

  function makeLessonStep(bundle, lesson, label, kind, path, extraDescription = "") {
    const target = normalize(label);
    const hotspots = [
      ...(Array.isArray(lesson?.hotspots) ? lesson.hotspots : []),
      ...(Array.isArray(lesson?.screenshots) ? lesson.screenshots.flatMap(shot => shot?.hotspots || []) : [])
    ];
    const hotspot = hotspots.find(item => normalize(item?.title) === target);
    const description = extraDescription || hotspot?.description || ("Localize " + label + " na tela atual, conforme a aula " + (lesson?.title || "do Manual") + ".");
    return { label, kind, path, description };
  }

  function getLocalNavigationPlan(question) {
    const q = normalize(question);
    const taskWords = /\b(cadastrar|cadastre|cadastro|novo|nova|criar|crie|adicionar|adicione|incluir|inclua|editar|edite|ajustar|ajuste|alterar|altere|modificar|modifique|corrigir|corrija|trocar|troque|configurar|configure|emitir|emita|gerar|gere|consultar|consulte|acessar|acesse|abrir|abra|localizar|localize|encontrar|encontre|baixar|exportar|cancelar|cancele|carregar|carregue|enviar|envie|anexar|anexe|instalar|instale|renovar|renove|atualizar|atualize|informar|informe|preencher|preencha|selecionar|selecione|definir|defina|me guie|passo a passo|como faco|como fazer)\b/;
    if (!taskWords.test(q)) return null;

    // Certificado A1: o arquivo .pfx é enviado pela opção da aba Certificado Digital.
    // A extensão não lê, armazena ou preenche a senha do certificado.
    if (/\b(certificado|pfx)\b/.test(q) && /\b(carregar|carregue|enviar|envie|anexar|anexe|instalar|instale|renovar|renove|atualizar|atualize|novo|arquivo)\b/.test(q)) {
      const path = "Configurações > Empresa > Certificado Digital > Opções";
      return [
        makeStep(bundleCache, "Configurações", "click", path, "Abra Configurações no menu lateral."),
        makeStep(bundleCache, "Empresa", "click", path, "Entre nas configurações da empresa."),
        makeStep(bundleCache, "Certificado Digital", "click", path, "Abra a aba Certificado Digital e confira os dados do A1 atual."),
        makeStep(bundleCache, "Opções", "click", path, "No quadro do Certificado Digital A1, abra Opções para enviar ou renovar o arquivo .pfx."),
        makeStep(bundleCache, "Arquivo .pfx", "field", path, "Selecione o novo arquivo .pfx somente na janela oficial do Emissor. A senha deve ser digitada diretamente no sistema; nunca a envie ao assistente.")
      ];
    }

    // CSC e ID CSC pertencem aos parâmetros da NFC-e dentro das configurações da empresa.
    if (/\bcsc\b/.test(q)) {
      const path = "Configurações > Empresa > Notas Fiscais > NFC-e";
      return [
        makeStep(bundleCache, "Configurações", "click", path, "Abra Configurações no menu lateral."),
        makeStep(bundleCache, "Empresa", "click", path, "Entre nas configurações da empresa."),
        makeStep(bundleCache, "Notas Fiscais", "click", path, "Abra a aba Notas Fiscais."),
        makeStep(bundleCache, "NFC-e", "click", path, "Localize a seção ou subaba NFC-e nos parâmetros por tipo de documento."),
        makeStep(bundleCache, "CSC", "field", path, "Informe o Código de Segurança do Contribuinte fornecido pela SEFAZ. Não compartilhe o código no chat."),
        makeStep(bundleCache, "ID CSC", "field", path, "Informe o identificador correspondente ao CSC, também fornecido pela SEFAZ."),
        makeStep(bundleCache, "Salvar Configurações", "final_action", path, "Revise os parâmetros da NFC-e e clique em Salvar Configurações quando estiver pronto.")
      ];
    }

    // Ajustes de CFOP são resolvidos diretamente pela aula local de Grupos Tributários.
    // O usuário escolhe o grupo e a regra; a extensão nunca altera ou salva dados por conta própria.
    if (/\bcfop\b/.test(q) && /\b(grupo|grupos|tributario|tributarios)\b/.test(q)) {
      const path = "Cadastros > Grupo Tributário > grupo desejado > Regras Tributárias > Editar Regra";
      return [
        makeStep(bundleCache, "Cadastros", "click", path, "Abra Cadastros no menu lateral."),
        makeStep(bundleCache, "Grupo Tributário", "click", path, "Selecione Grupo Tributário. É nessa área que as regras fiscais são configuradas; não altere o CFOP diretamente no cadastro do produto."),
        makeStep(bundleCache, "Procurar", "field", path, "Pesquise pelo nome do grupo tributário vinculado ao produto e confirme que selecionou o grupo correto."),
        makeStep(bundleCache, "Opções", "click", path, "Na linha do grupo correto, abra o menu de opções e escolha Editar."),
        makeStep(bundleCache, "Editar Regra", "click", path, "Na seção Regras Tributárias, localize a regra correspondente à Natureza de Operação, destinatário e UF. Clique em Editar Regra. Se a regra ainda não existir, use Adicionar Regra em vez de duplicar uma regra existente."),
        makeStep(bundleCache, "CFOP", "field", path, "Na identificação da regra, confira Natureza de Operação, CFOP, Tipo Destinatário e UFs Destino. Selecione o CFOP somente conforme a operação e a orientação da contabilidade."),
        makeStep(bundleCache, "Salvar", "final_action", path, "Revise os demais parâmetros tributários e clique em Salvar. Você fará a alteração e a gravação; a extensão não salva automaticamente.")
      ];
    }

    if (/\b(condutor|condutores|motorista|motoristas)\b/.test(q)) {
      const path = "Cadastros > Condutores > Novo Condutor";
      return [
        makeStep(bundleCache, "Cadastros", "click", path, "No menu lateral esquerdo, abra Cadastros."),
        makeStep(bundleCache, "Condutores", "click", path, "No submenu Cadastros, selecione Condutores."),
        makeStep(bundleCache, "Novo Condutor", "click", path, "Na listagem, clique em Novo Condutor."),
        makeStep(bundleCache, "Ativo", "field", path, "Deixe a chave Ativo ligada para que o condutor possa ser utilizado."),
        makeStep(bundleCache, "CPF", "field", path, "Informe o CPF válido do motorista."),
        makeStep(bundleCache, "Nome", "field", path, "Digite o nome completo do condutor."),
        makeStep(bundleCache, "Salvar", "final_action", path, "Confira os dados e clique em Salvar para gravar o cadastro.")
      ];
    }

    if (/\b(veiculo|veiculos)\b/.test(q)) {
      const path = "Cadastros > Veículos > Novo Veículo";
      return [
        makeStep(bundleCache, "Cadastros", "click", path, "Abra o menu Cadastros na barra lateral."),
        makeStep(bundleCache, "Veículos", "click", path, "No submenu Cadastros, selecione Veículos."),
        makeStep(bundleCache, "Novo Veículo", "click", path, "Na listagem, clique em Novo Veículo para abrir o formulário."),
        makeStep(bundleCache, "Placa", "field", path, "Informe a placa do veículo."),
        makeStep(bundleCache, "UF", "field", path, "Selecione a UF de emplacamento."),
        makeStep(bundleCache, "Tipo Rodado", "field", path, "Selecione o tipo de rodado correspondente."),
        makeStep(bundleCache, "Tipo Carroceria", "field", path, "Selecione o tipo de carroceria correspondente."),
        makeStep(bundleCache, "Número de eixos", "field", path, "Informe o número de eixos do veículo."),
        makeStep(bundleCache, "Salvar", "final_action", path, "Confira os dados e clique em Salvar. Se necessário, configure a aba Reboques e use Adicionar Reboque antes de salvar.")
      ];
    }

    if (/\b(cliente|clientes)\b/.test(q)) {
      const path = "Cadastros > Clientes > Novo Cliente";
      return [
        makeStep(bundleCache, "Cadastros", "click", path, "Abra o menu Cadastros no menu lateral."),
        makeStep(bundleCache, "Clientes", "click", path, "No submenu Cadastros, escolha Clientes."),
        makeStep(bundleCache, "Novo Cliente", "click", path, "Na listagem, clique em Novo Cliente para abrir o formulário."),
        makeStep(bundleCache, "CPF/CNPJ", "field", path, "Confira se Cliente está habilitado em Tipo de Cadastro e informe o CPF ou CNPJ."),
        makeStep(bundleCache, "Nome", "field", path, "Informe o nome. Telefone e e-mail podem ser preenchidos nos campos opcionais se desejar."),
        makeStep(bundleCache, "Consumidor Final", "field", path),
        makeStep(bundleCache, "Contribuinte ICMS", "field", path),
        makeStep(bundleCache, "Endereço Principal", "click", path, "Abra a aba Endereço Principal para informar o endereço do cliente."),
        makeStep(bundleCache, "CEP", "field", path, "Informe o CEP e use a lupa para buscar/preencher o endereço."),
        makeStep(bundleCache, "Salvar", "final_action", path, "Revise os dados e clique em Salvar quando estiver tudo correto.")
      ];
    }

    if (/\b(produto|produtos)\b/.test(q)) {
      const path = "Cadastros > Produtos > Novo Produto";
      return [
        makeStep(bundleCache, "Cadastros", "click", path, "Abra o menu Cadastros no menu lateral."),
        makeStep(bundleCache, "Produtos", "click", path, "No submenu Cadastros, escolha Produtos."),
        makeStep(bundleCache, "Novo Produto", "click", path, "Na listagem, clique em Novo Produto."),
        makeStep(bundleCache, "Descrição", "field", path),
        makeStep(bundleCache, "Un. Medida", "field", path),
        makeStep(bundleCache, "Preço Unitário", "field", path),
        makeStep(bundleCache, "NCM", "field", path, "Informe o NCM correto; se houver dúvida, confirme com a contabilidade. Código de barras e CEST são complementares quando aplicáveis."),
        makeStep(bundleCache, "Aba Tributação", "click", path, "Abra a aba Tributação do cadastro do produto."),
        makeStep(bundleCache, "Grupo Tributário", "field", path, "Selecione o grupo definido para a operação pela contabilidade."),
        makeStep(bundleCache, "Origem", "field", path),
        makeStep(bundleCache, "Salvar", "final_action", path, "Confira os dados e clique em Salvar para gravar o produto.")
      ];
    }

    if (/\b(servico|servicos)\b/.test(q)) {
      const path = "Cadastros > Serviços > Novo Serviço";
      return [
        makeStep(bundleCache, "Cadastros", "click", path, "Abra o menu Cadastros no menu lateral."),
        makeStep(bundleCache, "Serviços", "click", path, "No submenu Cadastros, escolha Serviços."),
        makeStep(bundleCache, "Novo Serviço", "click", path, "Na listagem, clique em Novo Serviço."),
        makeStep(bundleCache, "Descrição", "field", path),
        makeStep(bundleCache, "Valor", "field", path),
        makeStep(bundleCache, "Unidade", "field", path),
        makeStep(bundleCache, "CNAE", "field", path, "Informe o código conforme a atividade e orientação da contabilidade."),
        makeStep(bundleCache, "Código Trib. Município", "field", path),
        makeStep(bundleCache, "Item Lista de Serviço", "field", path),
        makeStep(bundleCache, "Cód. Trib. Nacional", "field", path),
        makeStep(bundleCache, "NBS", "field", path),
        makeStep(bundleCache, "Salvar", "final_action", path, "Revise os códigos fiscais com a contabilidade e clique em Salvar.")
      ];
    }
    // Roteiro genérico orientado pelo conteúdo real da aula. Funciona para os demais
    // módulos sem criar rótulos fictícios: o content script só destaca controles com nome acessível exato.
    const rankedLessons = [...bundleCache.lessons].map(lesson => ({
      lesson, score: relevance(lesson, location.pathname, question)
    })).sort((a, b) => b.score - a.score);
    const best = rankedLessons[0];
    if (best?.lesson && best.score >= 18) {
      const lesson = best.lesson;
      const path = lesson.path || lesson.title;
      const plan = [];
      const seen = new Set();
      const add = (label, kind, description) => {
        const key = normalize(label);
        if (!label || !key || seen.has(key) || plan.length >= 24) return;
        seen.add(key);
        plan.push(makeLessonStep(bundleCache, lesson, label, kind, path, description || ""));
      };

      const routeParts = String(lesson.path || "").split(/\s*>\s*/).map(part => part.trim())
        .filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
      for (const part of routeParts) {
        add(part, "click", "Siga o caminho documentado no Manual e abra esta opção no sistema.");
      }

      const isCreate = /\b(cadastrar|cadastre|cadastro|novo|nova|criar|crie|adicionar|adicione|incluir|inclua)\b/.test(q);
      const isEdit = /\b(editar|edite|ajustar|ajuste|alterar|altere|modificar|modifique|corrigir|corrija|trocar|troque)\b/.test(q);
      const isIssue = /\b(emitir|emita|gerar|gere|transmitir|transmita|finalizar|finalize)\b/.test(q);

      // Campos citados pelo usuário podem estar descritos em bullets ou hotspots de screenshots.
      const requestedTerms = q.split(/[^a-z0-9]+/).filter(term => term.length >= 3);
      const hotspotPool = [
        ...(lesson.hotspots || []),
        ...(lesson.screenshots || []).flatMap(shot => shot.hotspots || [])
      ];
      for (const hotspot of hotspotPool) {
        const label = String(hotspot.title || "").trim();
        const haystack = normalize([label, hotspot.description, hotspot.tip].join(" "));
        if (label && requestedTerms.some(term => haystack.includes(term))) {
          add(label, "click", hotspot.description || "Confira este item conforme a aula do Manual.");
        }
      }

      if (isCreate || isIssue) {
        const action = (lesson.hotspots || []).find(h => /^(novo|nova|emitir|adicionar|incluir)/i.test(String(h.title || "").trim()));
        if (action) add(action.title, "click", action.description || "Abra o formulário indicado pela aula.");
        const boldActions = [...String(lesson.content || "").matchAll(/\*\*([^*]{2,60})\*\*/g)]
          .map(match => match[1].trim()).filter(label => /^(novo|nova|emitir|adicionar|incluir|gerar|finalizar)/i.test(label));
        for (const label of boldActions.slice(0, 3)) add(label, /^(gerar|emitir|finalizar)/i.test(label) ? "final_action" : "click");
      } else if (isEdit) {
        for (const h of (lesson.hotspots || [])) {
          if (/procurar|pesquisa|opções|opcoes|editar/i.test(h.title || "")) {
            add(h.title, "click", h.description || "Use este controle para localizar e editar o registro desejado.");
          }
        }
        for (const label of ["Procurar", "Opções", "Editar"]) {
          if (new RegExp(label, "i").test(lesson.content || "")) add(label, "click");
        }
      }

      const content = String(lesson.content || "");
      const fieldLabels = [];
      for (const match of content.matchAll(/\*\*([^*]{2,55})\*\*/g)) {
        const label = match[1].trim().replace(/\s+/g, " ");
        const at = match.index || 0;
        const context = content.slice(Math.max(0, at - 140), Math.min(content.length, at + match[0].length + 180));
        if (/^(passo|passo a passo|introdução|introducao|objetivo|print \d+|o que fazer|importante|dica)$/i.test(label)) continue;
        if (!/campo|preench|informe|digite|selecione|escolha|confira|seção|secao|aba|clique|marque|ative|defina/i.test(context)) continue;
        fieldLabels.push(label);
      }
      const needsFieldSteps = isCreate || isEdit || isIssue || /\b(configurar|configure|preencher|preencha|informar|informe|ajustar|ajuste|corrigir|corrija|campo|campos)\b/.test(q);
      if (needsFieldSteps) {
        for (const label of fieldLabels) {
          const finalAction = /^(salvar|salvar configurações|salvar configuracoes|gerar|emitir|finalizar venda|concluir)$/i.test(label);
          add(label, finalAction ? "final_action" : "field");
        }
      }
      if (plan.length) return plan.slice(0, 24);
    }

    return null;
  }

  function getLocalAnswer(question) {
    if (!bundleCache || !String(question || "").trim()) return "";
    const ranked = [...bundleCache.lessons].map(lesson => ({
      lesson, score: relevance(lesson, location.pathname, question)
    })).sort((a, b) => b.score - a.score);
    const best = ranked[0];
    if (!best?.lesson || best.score < 8) return "";
    const related = ranked.filter(item => item.score >= Math.max(8, best.score * 0.42)).slice(0, 2);
    const parts = [
      "Encontrei esta orientação na base local do Manual Future:",
      ...related.map(({ lesson }) => lessonText(lesson, true)),
      "Se a tela estiver diferente, envie um print para eu localizar o controle exato. A extensão não preenche nem salva dados automaticamente."
    ];
    return parts.join("\n\n").slice(0, 22000);
  }

  let bundleCache = null;
  let lastModulesCount = 0;
  let lastLessonsCount = 0;

  async function load(options = {}) {
    const bundle = await loadBundle();
    bundleCache = bundle;
    lastModulesCount = bundle.modules.length;
    lastLessonsCount = bundle.lessons.length;
    const route = options.route || location.pathname;
    const question = options.question || "";
    const text = buildKnowledge(bundle, route, question);
    const prioritized = [...bundle.lessons].sort((a, b) =>
      relevance(b, route, question) - relevance(a, route, question) ||
      (a.position || 0) - (b.position || 0)
    );
    lastStatus = {
      source: "local",
      modules: lastModulesCount,
      lessons: lastLessonsCount,
      prioritized: prioritized.filter(l => relevance(l, route, question) > 0).slice(0, 4).map(l => l.title),
      chars: text.length
    };
    return text;
  }

  window.FutureManualKnowledge = {
    load,
    getLocalNavigationPlan: question => bundleCache ? getLocalNavigationPlan(question) : null,
    getLocalAnswer,
    getStatus: () => lastStatus
  };
})();