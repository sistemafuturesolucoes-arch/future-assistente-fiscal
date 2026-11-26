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
    const haystack = normalize([lesson.title, lesson.summary, lesson.path, lesson.content,
      ...(lesson.hotspots || []).map(h => [h.title, h.description, h.tip].join(" "))].join(" "));
    const r = normalize(route);
    const q = normalize(question);
    let score = 0;
    if (/nfse|nota.?de.?servico|servico/.test(r) && /nfse|nota.?fiscal.?de.?servico/.test(haystack)) score += 100;
    if (/notas\/servico|notas\/servico\/emitir/.test(r) && /nfse|servico/.test(haystack)) score += 80;
    if (q) {
      if (/regras? fiscais?/.test(q) && /grupos? tributarios?|tributacao/.test(haystack)) score += 110;
      const title = normalize(lesson.title);
      const stop = new Set(["como","onde","fica","me","ajude","ajuda","por","favor","para","com","uma","um","de","do","da","dos","das","no","na","nos","nas","novo","nova","cadastrar","cadastre","cadastro","criar","crie","fazer","faco","quero","preciso"]);
      const queryTerms = q.split(/[^a-z0-9]+/).filter(t => t.length > 2 && !stop.has(t));
      const stem = value => value.replace(/(oes|aes|es|s)$/,"");
      if (title && q.includes(title)) score += 120;
      if (title && title.includes(q)) score += 90;
      if (queryTerms.some(term => ["condutor","motorista"].includes(stem(term))) && /condutor|motorista/.test(haystack)) score += 260;
      if (queryTerms.some(term => ["veiculo","caminhao"].includes(stem(term))) && /veiculo|caminhao/.test(haystack)) score += 220;
      if (queryTerms.some(term => ["cliente","fornecedor","transportadora"].includes(stem(term))) && /cliente|fornecedor|transportadora/.test(haystack)) score += 180;
      if (queryTerms.some(term => ["produto","mercadoria"].includes(stem(term))) && /produto|mercadoria/.test(haystack)) score += 180;
      if (queryTerms.some(term => stem(term) === "servico") && /servico/.test(haystack)) score += 180;
      const matched = queryTerms.filter(term => haystack.includes(term) || haystack.includes(stem(term)));
      if (queryTerms.length && matched.length === queryTerms.length) score += 55;
      if (queryTerms.length && matched.length) score += matched.length * 8;
      for (const term of queryTerms) if (haystack.includes(term) || haystack.includes(stem(term))) score += term.length > 3 ? 3 : 1;
    }
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
    const selected = relevant.slice(0, 6);
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
    return parts.join("\n\n").slice(0, 26000);
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

  function getLocalNavigationPlan(question) {
    const q = normalize(question);
    const taskWords = /\b(cadastrar|cadastre|cadastro|novo|nova|criar|crie|adicionar|adicione|incluir|inclua|me guie|passo a passo|como faco|como fazer)\b/;
    if (!taskWords.test(q)) return null;

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

    if (/\\b(cliente|clientes)\\b/.test(q)) {
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
    return null;
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
    getStatus: () => lastStatus
  };
})();