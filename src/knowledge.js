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

  function markerTargetNames(title) {
    const raw = String(title || "").trim();
    const n = normalize(raw);
    const names = [raw];
    if (/^menu:\s*/i.test(raw)) names.push(raw.replace(/^menu:\s*/i, ""));
    else if (/^menu do\s+/i.test(raw)) names.push(raw.replace(/^menu do\s+/i, ""));
    else if (/^menu\s+/i.test(raw)) names.push(raw.replace(/^menu\s+/i, ""));
    if (/^(botao|campo|chave|aba)\s+/.test(n)) names.push(raw.replace(/^(bot[aã]o|campo|chave|aba)\s+/i, ""));
    if (/^barra de pesquisa|^campo procurar/.test(n)) names.push("Procurar");
    if (/^ordenar por\s*\/\s*procurar/.test(n)) names.push("Ordenar por", "Procurar");
    if (/^situacao:\s*/.test(n)) names.push(raw.replace(/^situa[cç][aã]o:\s*/i, ""));
    if (/^botao opcoes da linha/.test(n)) names.push("Opções da Linha", "Opções");
    return [...new Set(names.filter(Boolean))];
  }

  function getDocumentedActions(lesson, markers = []) {
    const available = new Set(markers.flatMap(marker => markerTargetNames(marker.title).map(normalize)));
    const allowed = /^(salvar|salvar rascunho|gerar|gerar cte|emitir|emitir ciot|enviar|finalizar venda|confirmar|entrar|concluir|imprimir|fechar|pre-visualizar)$/;
    const actions = [], seen = new Set();
    for (const line of String(lesson?.content || "").split(/\n+/)) {
      for (const match of line.matchAll(/\*\*([^*]{2,60})\*\*/g)) {
        const label = match[1].trim(), key = normalize(label);
        if (!allowed.test(key) || available.has(key) || seen.has(key)) continue;
        if (!/(clique|pressione|confirme|selecione|aperte|toque)/i.test(line.slice(0, match.index))) continue;
        seen.add(key);
        actions.push({ label, kind: "final_action", description: line.replace(/\*\*/g, "").trim(), source: "lesson_text" });
      }
    }
    for (const marker of markers) {
      if (!/acoes finais/.test(normalize(marker?.title))) continue;
      for (const line of String(marker.description || "").split(/\n+/)) {
        const match = line.match(/^\s*[•-]?\s*(Salvar rascunho|Salvar|Pré-visualizar|Gerar CTe|Emitir CIOT)\s*:\s*(.+)$/i);
        if (!match) continue;
        const label = match[1].trim(), key = normalize(label);
        if (seen.has(key)) continue;
        seen.add(key);
        actions.push({
          label,
          kind: /pre-visualizar/.test(key) ? "click" : "final_action",
          description: match[2].trim(),
          source: "marker_description"
        });
      }
    }
    return actions;
  }


  function getLessonMarkerRoute(lesson, pathOverride = "", includeRoute = true) {
    if (!lesson) return [];
    const path = pathOverride || lesson.path || lesson.title;
    const markers = [], seen = new Set();
    const addMarker = marker => {
      if (!marker?.title) return;
      const key = marker.id || normalize(marker.title) + "|" + normalize(marker.description);
      if (seen.has(key)) return;
      seen.add(key); markers.push(marker);
    };
    (lesson.hotspots || []).forEach(addMarker);
    (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(addMarker));
    const markerLabels = new Set(markers.flatMap(marker => markerTargetNames(marker.title).map(normalize)));
    const routeParts = String(path || "").split(/\s*>\s*/).map(part => part.trim())
      .filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
    const plan = [];
    if (includeRoute) {
      for (const label of routeParts) {
        if (markerLabels.has(normalize(label))) continue;
        plan.push({ ...makeLessonStep(bundleCache, lesson, label, "click", path, "Abra esta seção para seguir o procedimento documentado no Manual."), manualMarker: null });
      }
    }
    for (const marker of markers) {
      const label = String(marker.title).trim(), n = normalize(label);
      const finalAction = /salvar|emitir|transmitir|autorizar|cancelar|excluir|finalizar|concluir|gerar|enviar|confirmar|entrar|imprimir|fechar/.test(n);
      const field = /campo|chave|barra de pesquisa|procurar|ordenar|cfop|cst|aliquota|senha|cpf|cnpj|e-mail|email|telefone|cep|uf|natureza|tipo|finalidade|destinatario|tomador|remetente|chave|serie|numeracao|nome|descricao|codigo|preco|valor|unidade|ativo|ncm|cest|ean|gtin|cnae|nbs|issqn|origem|placa|renavam|razao social|fantasia|endereco|bairro|municipio|inscricao|categoria|quantidade|peso|periodo|ambiente|regime|csc|data|numero|serie|emitente|contratante|contratado|transportadora|percurso/.test(n);
      const kind = /^(listagem|painel|area|acoes finais|secoes complementares)$/.test(n) ? "info" : finalAction ? "final_action" : field ? "field" : "click";
      plan.push({
        label, kind, path,
        description: [marker.description, marker.tip ? "Dica: " + marker.tip : ""].filter(Boolean).join("\n\n") || "Siga esta etapa conforme o Manual Future.",
        manualMarker: { id: marker.id || "", title: label, tip: marker.tip || "", description: marker.description || "", x: Number.isFinite(marker.x) ? marker.x : null, y: Number.isFinite(marker.y) ? marker.y : null, w: Number.isFinite(marker.w) ? marker.w : null, h: Number.isFinite(marker.h) ? marker.h : null },
        targetNames: markerTargetNames(label),
        optional: /^(barra de pesquisa|campo procurar|procurar)$/.test(n),
        lessonTitle: lesson.title || "",
        lessonId: lesson.id || ""
      });
    }
    for (const action of getDocumentedActions(lesson, markers)) {
      plan.push({
        label: action.label, kind: action.kind || "final_action", path, description: action.description,
        manualMarker: null, targetNames: markerTargetNames(action.label),
        lessonTitle: lesson.title || "", lessonId: lesson.id || "",
        manualActionFromContent: action.source === "lesson_text",
        manualActionFromMarker: action.source === "marker_description"
      });
    }
    return plan;
  }

  function relevance(lesson, route, question) {
    const title = normalize(lesson.title);
    const summary = normalize(lesson.summary);
    const path = normalize(lesson.path);
    const content = normalize(lesson.content);
    const allHotspots = [
      ...(Array.isArray(lesson.hotspots) ? lesson.hotspots : []),
      ...(Array.isArray(lesson.screenshots) ? lesson.screenshots.flatMap(shot => shot?.hotspots || []) : [])
    ];
    const hotspotTitles = normalize(allHotspots.map(h => h.title).join(" "));
    const hotspotText = normalize(allHotspots.map(h => [h.title, h.description, h.tip].join(" ")).join(" "));
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
    if (/(nf.?e|nota.?eletronica)/.test(q) && /nf.?e/.test(title + " " + path)) score += 75;
    if (/(nfc.?e|cupom|consumidor)/.test(q) && /nfc.?e|consumidor/.test(title + " " + path)) score += 75;
    if (/(nfs.?e|nota.?de.?servico)/.test(q) && /nfs.?e|servico/.test(title + " " + path)) score += 75;
    const cteOsQuery = /ct.?e.?os/.test(q);
    const cteOsLesson = /ct.?e.?os/.test(title + " " + path);
    if (cteOsQuery && cteOsLesson) score += 150;
    else if (!cteOsQuery && cteOsLesson) score -= 60;
    else if (/ct.?e|conhecimento.?transporte/.test(q) && /ct.?e/.test(title + " " + path)) score += 100;
    if (/mdf.?e|manifesto/.test(q) && /mdf.?e|manifesto/.test(title + " " + path)) score += 75;
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
    const manualMarker = hotspot ? {
      id: hotspot.id || "",
      title: hotspot.title || label,
      tip: hotspot.tip || "",
      description: hotspot.description || description,
      x: Number.isFinite(hotspot.x) ? hotspot.x : null,
      y: Number.isFinite(hotspot.y) ? hotspot.y : null,
      w: Number.isFinite(hotspot.w) ? hotspot.w : null,
      h: Number.isFinite(hotspot.h) ? hotspot.h : null
    } : null;
    return { label, kind, path, description, manualMarker };
  }

  function makeLessonStep(bundle, lesson, label, kind, path, extraDescription = "") {
    const target = normalize(label);
    const hotspots = [
      ...(Array.isArray(lesson?.hotspots) ? lesson.hotspots : []),
      ...(Array.isArray(lesson?.screenshots) ? lesson.screenshots.flatMap(shot => shot?.hotspots || []) : [])
    ];
    const hotspot = hotspots.find(item => normalize(item?.title) === target);
    const description = extraDescription || hotspot?.description || ("Localize " + label + " na tela atual, conforme a aula " + (lesson?.title || "do Manual") + ".");
    const manualMarker = hotspot ? {
      id: hotspot.id || "",
      title: hotspot.title || label,
      tip: hotspot.tip || "",
      description: hotspot.description || description,
      x: Number.isFinite(hotspot.x) ? hotspot.x : null,
      y: Number.isFinite(hotspot.y) ? hotspot.y : null,
      w: Number.isFinite(hotspot.w) ? hotspot.w : null,
      h: Number.isFinite(hotspot.h) ? hotspot.h : null
    } : null;
    return { label, kind, path, description, manualMarker };
  }

  function getLocalNavigationPlan(question) {
    const q = normalize(question);
    const taskWords = /\b(onde fica|onde esta|onde encontro|onde acho|onde acesso|qual caminho|qual menu|como|configur\w*|mudar|mude|mud\w*|remover|remova|excluir|exclua|cadastrar|cadastre|cadastro|novo|nova|criar|crie|adicionar|adicione|incluir|inclua|editar|edite|ajust\w*|alterar|altere|modificar|modifique|corrigir|corrija|trocar|troque|configurar|configure|emitir|emita|gerar|gere|consultar|consulte|acessar|acesse|abrir|abra|localizar|localize|encontrar|encontre|baixar|exportar|cancelar|cancele|carregar|carregue|enviar|envie|anexar|anexe|instalar|instale|renovar|renove|atualizar|atualize|informar|informe|preencher|preencha|selecionar|selecione|definir|defina|altero|conferir|confira|verificar|verifique|revisar|revise|validar|valide|checar|cheque|me ajude|me ajuda|me guie|passo a passo|como faco|como fazer)\b/;
    if (!taskWords.test(q)) return null;
    const deleteRequest = /\b(remover|remova|excluir|exclua|apagar|apague)\b/.test(q);
    const editRequest = !deleteRequest && /\b(editar|edite|edicao|ajustar|ajuste|alterar|altere|modificar|modifique|corrigir|corrija|trocar|troque)\b/.test(q);
    const lookupRequest = /\b(consultar|consulte|listar|liste|pesquisar|pesquise|ver|mostrar|mostre|localizar|localize)\b/.test(q);
    const createRequest = !editRequest && !deleteRequest && !lookupRequest
      && /\b(cadastrar|cadastre|cadastro|novo|nova|criar|crie|adicionar|adicione|incluir|inclua)\b/.test(q);


    // Pedidos para LOCALIZAR uma tela devem terminar no destino solicitado.
    // Não transformar "onde fica NFC-e?" em um roteiro de emissão ou preenchimento.
    const locateOnly = /^\s*(onde fica|onde esta|onde encontro|onde acho|onde acesso|como acessar|como chegar|ir para|ir ate|qual caminho|qual menu)\b/.test(q)
      || (/\b(localizar|localize|me mostre onde)\b/.test(q) && !createRequest);
    if (locateOnly) {
      const rankedForRoute = [...bundleCache.lessons].map(lesson => ({
        lesson,
        score: relevance(lesson, location.pathname, question)
          + (/configur|serie|parametro/.test(q) && /configuracoes|empresa/.test(normalize(lesson.module_id + " " + lesson.title + " " + lesson.path)) ? 90 : 0)
      })).sort((a, b) => b.score - a.score);
      const settingsRequested = /(configur|serie|parametro|csc)/.test(q)
        && /(nf.?e|nfc.?e|nfs.?e|ct.?e|mdf.?e|certificado|csc)/.test(q);
      const companySettingsLesson = bundleCache.lessons.find(lesson =>
        /configurando os dados gerais da empresa/i.test(lesson.title || "")
      );
      const bestRoute = settingsRequested && companySettingsLesson
        ? companySettingsLesson
        : rankedForRoute[0]?.lesson;
      if (bestRoute && rankedForRoute[0].score >= 18) {
        let routeParts = String(bestRoute.path || "").split(/\s*>\s*/)
          .map(part => part.trim()).filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
        const lessonTextAll = normalize([bestRoute.title, bestRoute.summary, bestRoute.content,
          ...(bestRoute.hotspots || []).map(h => h.title + " " + h.description),
          ...(bestRoute.screenshots || []).flatMap(s => (s.hotspots || []).map(h => h.title + " " + h.description))
        ].join(" "));
        // A aula de Empresa contém várias abas internas; explicitar a aba solicitada.
        if (/certificado|\bpfx\b/.test(q) && /certificado digital/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Certificado Digital"];
        } else if (/\bcsc\b/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "NFC-e"];
        } else if (/nfc.?e|nota.?de.?consumidor|cupom/.test(q) && /(configur|csc|serie|parametro)/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "NFC-e"];
        } else if (/nfs.?e|nota.?de.?servico/.test(q) && /(configur|serie|parametro)/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "NFS-e"];
        } else if (/ct.?e.?os/.test(q) && /(configur|serie|parametro)/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "CT-e OS"];
        } else if (/ct.?e/.test(q) && /(configur|serie|parametro)/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "CT-e"];
        } else if (/mdf.?e/.test(q) && /(configur|serie|parametro)/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "MDF-e"];
        } else if (/nf.?e|nota.?eletronica/.test(q) && /(configur|serie|parametro)/.test(q) && /notas fiscais/.test(lessonTextAll)) {
          routeParts = ["Configurações", "Empresa", "Notas Fiscais", "NF-e"];
        }
        const path = routeParts.join(" > ");
        return routeParts.map((label, index) => makeLessonStep(
          bundleCache, bestRoute, label, "click", path,
          index === routeParts.length - 1
            ? (label === "NFC-e" ? "Você chegou à configuração da NFC-e. Nesta tela ficam os parâmetros do documento, incluindo série, CSC e ID CSC."
              : label === "Certificado Digital" ? "Você chegou à tela do certificado digital. Aqui é possível conferir o certificado A1 e abrir Opções para importar ou atualizar o arquivo."
              : "Você chegou à área solicitada no Manual Future.")
            : "Abra esta opção seguindo a sequência documentada no Manual Future."
        ));
      }
      return null;
    }

    // Consultas às listas de cadastros devem abrir a listagem, nunca o formulário de novo registro.
    if (!createRequest && /\b(consultar|consulte|listar|liste|pesquisar|pesquise|ver|mostrar|mostre|localizar|localize)\b/.test(q)) {
      const listingRoutes = [
        { re: /\b(cliente|clientes)\b/, labels: ["Cadastros", "Clientes"] },
        { re: /\b(produto|produtos)\b/, labels: ["Cadastros", "Produtos"] },
        { re: /\b(servico|servicos)\b/, labels: ["Cadastros", "Serviços"] },
        { re: /\b(veiculo|veiculos)\b/, labels: ["Cadastros", "Veículos"] },
        { re: /\b(condutor|condutores|motorista|motoristas)\b/, labels: ["Cadastros", "Condutores"] },
        { re: /grupo.?tributario/, labels: ["Cadastros", "Grupo Tributário"] },
        { re: /natureza.?de.?operacao/, labels: ["Cadastros", "Natureza de Operação"] }
      ];
      const selected = listingRoutes.find(item => item.re.test(q));
      if (selected) {
        const path = selected.labels.join(" > ");
        return selected.labels.map((label, index) => makeStep(
          bundleCache, label, "click", path,
          index === selected.labels.length - 1
            ? "Abra a listagem para pesquisar, consultar ou selecionar um registro existente. Não é necessário criar um novo cadastro."
            : "Abra esta opção no menu lateral para seguir até a listagem."
        ));
      }
    }

    // Certificado A1: o arquivo .pfx é enviado pela opção da aba Certificado Digital.
    // A extensão não lê, armazena ou preenche a senha do certificado.
    if (/\b(certificado|pfx)\b/.test(q) && /\b(carregar|carregue|enviar|envie|anexar|anexe|instalar|instale|renovar|renove|atualizar|atualize|novo|arquivo)\b/.test(q)) {
      const path = "Configurações > Empresa > Certificado Digital";
      return [
        makeStep(bundleCache, "Configurações", "click", path, "Abra Configurações no menu lateral."),
        makeStep(bundleCache, "Empresa", "click", path, "Entre nas configurações da empresa."),
        makeStep(bundleCache, "Certificado Digital", "click", path, "Abra a aba Certificado Digital. Você chegou à tela correta para atualizar o certificado."),
        makeStep(bundleCache, "Opções", "click", path, "Na seção Certificado Digital A1, clique em Opções para importar o novo arquivo .pfx."),
        makeStep(bundleCache, "Arquivo .pfx", "field", path, "Selecione o novo arquivo do certificado digital (.pfx) nesta tela do Emissor."),
        makeStep(bundleCache, "Senha do certificado", "field", path, "Digite a senha do certificado diretamente no campo do Emissor. Não envie a senha pelo chat nem compartilhe com o assistente."),
        makeStep(bundleCache, "Salvar", "final_action", path, "Clique em Salvar/confirmar na própria tela para concluir a importação. Depois confira os dados e a validade do certificado.")
      ];
    }

    // CSC e ID CSC pertencem aos parâmetros da NFC-e dentro das configurações da empresa.
    if (/\bcsc\b/.test(q)) {
      const path = "Configurações > Empresa > Notas Fiscais > NFC-e";
      return [
        makeStep(bundleCache, "Configurações", "click", path, "Abra Configurações no menu lateral."),
        makeStep(bundleCache, "Empresa", "click", path, "Entre nas configurações da empresa."),
        makeStep(bundleCache, "Notas Fiscais", "click", path, "Abra a aba Notas Fiscais."),
        makeStep(bundleCache, "NFC-e", "click", path, "Abra a seção ou subaba NFC-e. É aqui que ficam os campos CSC e ID CSC; localize-os nesta tela. Os códigos são fornecidos pela SEFAZ e devem ser digitados diretamente no Emissor, nunca no chat.")
      ];
    }

    // Ajustes de CFOP são resolvidos diretamente pela aula local de Grupos Tributários.
    // O usuário escolhe o grupo e a regra; a extensão nunca altera ou salva dados por conta própria.
    if (/\bcfop\b/.test(q)) {
      const path = "Cadastros > Grupo Tributário > grupo desejado > Opções da Linha > Editar > Regras Tributárias > Editar Regra";
      const inspectionOnly = /\b(conferir|confira|verificar|verifique|revisar|revise|validar|valide|checar|cheque)\b/.test(q)
        && !/\b(ajustar|ajuste|alterar|altere|altero|corrigir|corrija|editar|edite|trocar|troque|modificar|modifique)\b/.test(q);
      const plan = [
        makeStep(bundleCache, "Cadastros", "click", path, "No menu lateral, abra Cadastros."),
        makeStep(bundleCache, "Grupo Tributário", "click", path, "Abra Grupo Tributário para acessar a listagem dos grupos."),
        { ...makeStep(bundleCache, "Procurar", "field", path, "Etapa opcional: use a pesquisa apenas se precisar localizar o grupo. Se já estiver vendo o grupo correto, avance sem pesquisar."), optional: true, targetNames: ["Barra de Pesquisa (Procurar)", "Procurar"] },
        { ...makeStep(bundleCache, "Botão Opções da Linha", "click", path, "Na linha do grupo tributário correto, abra as opções daquela linha. Não use o botão Opções geral da listagem."), targetNames: ["Opções da Linha", "Opções"] },
        makeStep(bundleCache, "Editar", "click", path, "No menu contextual da linha selecionada, escolha Editar para abrir o grupo tributário."),
        makeStep(bundleCache, "Regras Tributárias", "info", path, "Dentro do grupo, localize a área Regras Tributárias. Escolha a regra correspondente à natureza da operação, ao tipo de destinatário e à UF de destino."),
        makeStep(bundleCache, "Editar Regra", "click", path, "Na regra correspondente, clique em Editar Regra. Não altere uma regra diferente apenas porque ela está mais visível."),
        makeStep(bundleCache, "CFOP", "field", path, "Confira o campo CFOP junto com Natureza de Operação, Tipo Destinatário e UFs Destino. A escolha fiscal depende da operação real e deve ser validada com a contabilidade."),
        { ...makeStep(bundleCache, "Salvar", "final_action", path, "Depois de validar todos os parâmetros com a contabilidade, revise a regra e clique você mesmo em Salvar. A extensão não altera nem grava dados automaticamente."), targetNames: ["Salvar", "Salvar Regra", "Salvar alterações"] }
      ];
      return inspectionOnly ? plan.slice(0, 8) : plan;
    }

    if (editRequest || deleteRequest) {
      const editRoutes = [
        { re: /\b(cliente|clientes)\b/, title: "Lista de Clientes" },
        { re: /\b(produto|produtos)\b/, title: "Lista de Produtos" },
        { re: /\b(servico|servicos)\b/, title: "Lista de Serviços" },
        { re: /\b(veiculo|veiculos)\b/, title: "Gerenciamento e Edição de Veículos" },
        { re: /\b(condutor|condutores|motorista|motoristas)\b/, title: "Cadastro de Condutores" },
        { re: /grupo.?tributario|regra.?tributaria/, title: "Gerenciamento e Edição de Grupos Tributários" },
        { re: /natureza.?de.?operacao/, title: "Natureza de Operação" }
      ];
      const selected = editRoutes.find(item => item.re.test(q));
      const lesson = selected && bundleCache.lessons.find(item => item.title === selected.title);
      if (lesson) {
        const routeParts = String(lesson.path || "").split(/\s*>\s*/).map(part => part.trim())
          .filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
        if (routeParts.length && /^(novo|nova)\b/i.test(routeParts[routeParts.length - 1])) routeParts.pop();
        const path = routeParts.join(" > ") || lesson.title;
        const plan = routeParts.map(label => makeLessonStep(bundleCache, lesson, label, "click", path,
          "Abra a listagem documentada no Manual para localizar o registro existente."));
        const markers = [], seen = new Set();
        const collect = marker => {
          if (!marker?.title) return;
          const key = marker.id || normalize(marker.title) + "|" + normalize(marker.description);
          if (seen.has(key)) return;
          seen.add(key); markers.push(marker);
        };
        (lesson.hotspots || []).forEach(collect);
        (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(collect));
        let hasEditAction = false;
        for (const marker of markers) {
          const label = String(marker.title).trim(), n = normalize(label);
          if (/^(novo|nova|adicionar|incluir|duplicar)\b/.test(n)) continue;
          if (editRequest && /excluir|remover|apagar/.test(n)) continue;
          if (/opcoes.*geral|geral.*opcoes/.test(n) || /opcoes gerais|exportar e importar grupos em excel/i.test(normalize(marker.description))) continue;
          const relevant = deleteRequest
            ? /procurar|pesquisa|linha|opcoes|excluir|remover|apagar/.test(n)
            : /procurar|pesquisa|linha|opcoes|editar|regra/.test(n);
          if (!relevant) continue;
          if (deleteRequest && /excluir|remover|apagar/.test(n)) hasEditAction = true;
          if (editRequest && /editar|edicao/.test(n)) hasEditAction = true;
          const targetNames = markerTargetNames(label);
          plan.push({
            label, kind: deleteRequest && /excluir|remover|apagar/.test(n) ? "final_action" : "click", path,
            description: marker.description || marker.tip || "Siga este controle conforme o Manual Future.",
            manualMarker: { id: marker.id || "", title: label, tip: marker.tip || "", description: marker.description || "", x: Number.isFinite(marker.x) ? marker.x : null, y: Number.isFinite(marker.y) ? marker.y : null, w: Number.isFinite(marker.w) ? marker.w : null, h: Number.isFinite(marker.h) ? marker.h : null },
            targetNames: [...new Set(targetNames)]
          });
        }
        if (editRequest) {
          for (const action of getDocumentedActions(lesson, markers)) {
            plan.push({ label: action.label, kind: "final_action", path, description: action.description, manualMarker: null, targetNames: markerTargetNames(action.label), manualActionFromContent: true });
          }
        }
        if (!hasEditAction) {
          plan.push({
            label: "Limite da documentação",
            kind: "info",
            path,
            description: "O Manual Future mostra a listagem e os controles disponíveis, mas não documenta o passo específico de " + (deleteRequest ? "exclusão" : "edição") + " deste registro. Não vou inventar o próximo botão. Se você enviar uma captura da opção aberta, posso identificar o controle correto."
          });
        }
        if (plan.length) return plan;
      }
    }

    if (/\b(condutor|condutores|motorista|motoristas)\b/.test(q) && createRequest) {
      const lesson = bundleCache.lessons.find(item => item.title === "Cadastro de Condutores");
      return getLessonMarkerRoute(lesson, "Cadastros > Condutores");
    }

    if (/\b(veiculo|veiculos)\b/.test(q) && createRequest) {
      const lesson = bundleCache.lessons.find(item => item.title === "Gerenciamento e Edição de Veículos");
      return getLessonMarkerRoute(lesson, "Cadastros > Veículos");
    }

    if (/\b(cliente|clientes)\b/.test(q) && createRequest) {
      const lesson = bundleCache.lessons.find(item => item.title === "Cadastrar cliente");
      return getLessonMarkerRoute(lesson, "Cadastros > Clientes > Novo Cliente");
    }

    if (/\b(produto|produtos)\b/.test(q) && createRequest) {
      const path = "Cadastros > Produtos > Novo Produto";
      const dataLesson = bundleCache.lessons.find(item => item.title === "Cadastrar produto: Dados do Produto");
      const taxLesson = bundleCache.lessons.find(item => item.title === "Cadastrar produto: Tributação");
      if (/tributacao|grupo tributario|origem/.test(q) && !/dados do produto/.test(q)) {
        return getLessonMarkerRoute(taxLesson, path);
      }
      const dataPlan = getLessonMarkerRoute(dataLesson, path);
      if (/dados do produto/.test(q) || !taxLesson) return dataPlan;
      const dataWithoutPrematureSave = dataPlan.filter(step => !(step.manualMarker && normalize(step.label) === "salvar"));
      const taxPlan = getLessonMarkerRoute(taxLesson, path, false);
      const existing = new Set(dataWithoutPrematureSave.filter(step => step.manualMarker).map(step => normalize(step.label)));
      return [...dataWithoutPrematureSave, ...taxPlan.filter(step => step.manualMarker && !existing.has(normalize(step.label)))];
    }

    if (/\b(servico|servicos)\b/.test(q) && createRequest) {
      const lesson = bundleCache.lessons.find(item => item.title === "Cadastrar serviço");
      return getLessonMarkerRoute(lesson, "Cadastros > Serviços > Novo Serviço");
    }
    // Roteiro genérico orientado pelo conteúdo real da aula. Funciona para os demais
    // módulos sem criar rótulos fictícios: o content script só destaca controles com nome acessível exato.
    const rankedLessons = [...bundleCache.lessons].map(lesson => ({
      lesson, score: relevance(lesson, location.pathname, question)
    })).sort((a, b) => b.score - a.score);
    const best = rankedLessons[0];
    if (best?.lesson && best.score >= 18) {
      const lesson = best.lesson;
      let path = lesson.path || lesson.title;
      const plan = [];
      const seen = new Set();
      const add = (label, kind, description) => {
        const key = normalize(label);
        if (!label || !key || seen.has(key) || plan.length >= 1000) return;
        seen.add(key);
        plan.push(makeLessonStep(bundleCache, lesson, label, kind, path, description || ""));
      };

      const routeParts = String(lesson.path || "").split(/\s*>\s*/).map(part => part.trim())
        .filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
      if ((editRequest || deleteRequest) && routeParts.length && /^(novo|nova|novo\s+|nova\s+)/i.test(routeParts[routeParts.length - 1])) routeParts.pop();
      path = routeParts.join(" > ") || path;
      for (const part of routeParts) {
        add(part, "click", "Siga o caminho documentado no Manual e abra esta opção no sistema.");
      }

      const isCreate = /\b(cadastrar|cadastre|cadastro|novo|nova|criar|crie|adicionar|adicione|incluir|inclua)\b/.test(q);
      const isEdit = /\b(editar|edite|ajustar|ajuste|alterar|altere|modificar|modifique|corrigir|corrija|trocar|troque)\b/.test(q);
      const isIssue = /\b(emitir|emita|gerar|gere|transmitir|transmita|finalizar|finalize)\b/.test(q);
      const isExport = /\b(exportar|exporte|baixar|download|enviar xml)\b/.test(q);
      const isConfigure = /\b(configurar|configure|preencher|preencha|informar|informe|ajustar|ajuste|corrigir|corrija)\b/.test(q);

      // Campos citados pelo usuário podem estar descritos em bullets ou hotspots de screenshots.
      const requestedTerms = q.split(/[^a-z0-9]+/).filter(term => term.length >= 3);
      const hotspotPool = [
        ...(lesson.hotspots || []),
        ...(lesson.screenshots || []).flatMap(shot => shot.hotspots || [])
      ];
      for (const hotspot of hotspotPool) {
        const description = String(hotspot.description || "");
        for (const line of description.split(/\n+/)) {
          const match = line.match(/^\s*(?:[-•*]\s*)?(?:\*\*)?([^:\n]{2,70}?)(?:\*\*)?\s*:\s*(.+)$/);
          if (!match) continue;
          const fieldLabel = match[1].replace(/^[\s•*\d.]+/, "").replace(/\*\*/g, "").trim();
          const fieldText = match[2].replace(/\*\*/g, "").trim();
          const fieldNorm = normalize(fieldLabel);
          if (!fieldLabel || !requestedTerms.some(term => fieldNorm.includes(term))) continue;
          add(fieldLabel, "field", fieldText || "Confira este campo conforme a aula do Manual.");
        }
      }
      for (const line of String(lesson.content || "").split(/\n+/)) {
        const match = line.match(/^\s*(?:[-•*]\s*)?(?:\*\*)?([^:\n]{2,70}?)(?:\*\*)?\s*:\s*(.+)$/);
        if (!match) continue;
        const fieldLabel = match[1].replace(/^[\s•*\d.]+/, "").replace(/\*\*/g, "").trim();
        const fieldText = match[2].replace(/\*\*/g, "").trim();
        const fieldNorm = normalize(fieldLabel);
        if (fieldLabel && requestedTerms.some(term => fieldNorm.includes(term))) {
          add(fieldLabel, "field", fieldText || "Confira este campo conforme a aula do Manual.");
        }
      }

      if (isCreate || isIssue) {
        const action = (lesson.hotspots || []).find(h => isIssue
          ? /^(emitir|gerar)/i.test(String(h.title || "").trim())
          : /^(novo|nova|adicionar|incluir)/i.test(String(h.title || "").trim()));
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
      // Para os módulos com capturas de tela, aproveite os hotspots ordenados
      // por etapa do Manual (listagem, formulário, seções e ações finais).
      // Isso amplia a cobertura sem inventar rótulos que não estejam documentados.
      const screenshots = Array.isArray(lesson.screenshots) ? lesson.screenshots : [];
      if (screenshots.length && (isCreate || isEdit || isIssue || isExport || isConfigure)) {
        for (let si = 0; si < screenshots.length; si++) {
          const shot = screenshots[si];
          const caption = normalize(shot.caption || "");
          const isList = /listagem|notas emitidas|painel inicial|tela inicial|menu lateral/.test(caption)
            || (/^\d+$/.test(caption) && si === 1);
          const isForm = /formulario|dados gerais|lancamento|secao|totais|transporte|pagamento|informacoes|finalizacao|configuracao|tribut|carga|valores|veiculo|percurso|servico/.test(caption)
            || (/^\d+$/.test(caption) && si >= 2);
          for (const h of (shot.hotspots || [])) {
            const label = String(h.title || "").trim();
            const labelNorm = normalize(label);
            if (!label || /^(listagem|painel|area|acoes finais|secoes complementares)$/i.test(labelNorm)) {
              if (isIssue || isExport) {
                const actions = [...String(h.description || "").matchAll(/(?:^|\n)\s*[•-]?\s*(Salvar(?: rascunho)?|Pré-visualizar|Gerar [A-ZÀ-Ú -]+|Emitir [A-ZÀ-Ú -]+|Enviar)\\s*:/gi)];
                for (const action of actions) {
                  const actionLabel = action[1].trim();
                  add(actionLabel, /gerar|emitir|enviar/i.test(actionLabel) ? "final_action" : "click", "Ação descrita nesta etapa do Manual. Confira todos os dados antes de confirmar.");
                }
              }
              continue;
            }
            if (isIssue && isList && !/emitir|gerar/i.test(label)) continue;
            if (isIssue && si > 0 && !isForm && !/formulario|dados|secao|totais|transporte|pagamento|finalizacao|configuracao|tribut|carga|valores|veiculo|percurso|servico/.test(caption)) continue;
            if (isEdit && isList && !/procurar|busca|opcoes|editar/i.test(label)) continue;
            if (!isList && !isForm && si > 0) continue;
            const isFinal = /^(salvar|salvar configuracoes|botao salvar|botao gerar|gerar nfe|gerar nfse|gerar cte|emitir ciot|emitir mdfe|emitir nfce)$/i.test(labelNorm);
            const isAction = /^(emitir|gerar|novo|adicionar|botao emitir|botao gerar)/i.test(labelNorm);
            add(label, isFinal ? "final_action" : isAction ? "click" : "field", h.description || h.tip || "");
          }
        }
      }

      if (isExport) {
        const exportLines = String(lesson.content || "").split(/\n+/);
        for (const line of exportLines) {
          let match = line.match(/\bno campo\s+([^,.:;]+)/i);
          if (match) add(match[1].replace(/[“”"]/g, "").trim(), "field", line.replace(/^\s*\d+\.\s*/, "").trim());
          match = line.match(/\bchave\s+([^,.:;?]+\??)/i);
          if (match) add(match[1].replace(/[“”"]/g, "").trim(), "field", line.replace(/^\s*\d+\.\s*/, "").trim());
          match = line.match(/\bbot[aã]o\s+([^,.:;]+)/i);
          if (match) add(match[1].trim(), /enviar|exportar|gerar/i.test(match[1]) ? "final_action" : "click", line.replace(/^\s*\d+\.\s*/, "").trim());
        }
      }

      if (plan.length) {
        // Para uma tarefa genérica, reconstrói a sequência na ordem do Manual:
        // caminho da tela primeiro e, depois, cada marcador único das capturas.
        // Isso evita que filtros por tipo de ação deixem a navegação pela metade.
        const routeSteps = routeParts.map(label => {
          const step = plan.find(item => normalize(item.label) === normalize(label));
          return step ? { ...step, manualMarker: null } : null;
        }).filter(Boolean);
        const orderedMarkers = [], markerKeys = new Set();
        const routeAliases = new Set(routeParts.map(normalize));
        const collectMarker = marker => {
          if (!marker?.title) return;
          const aliases = markerTargetNames(marker.title).map(normalize);
          const routeDuplicate = aliases.some(alias => routeAliases.has(alias))
            || routeParts.some(part => normalize(part).length >= 3 && normalize(marker.title).startsWith(normalize(part) + " "));
          if (routeDuplicate) return;
          const key = normalize(marker.title) + "|" + normalize(marker.description);
          if (markerKeys.has(key)) return;
          markerKeys.add(key); orderedMarkers.push(marker);
        };
        (lesson.hotspots || []).forEach(collectMarker);
        (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(collectMarker));
        const includedIds = new Set(routeSteps.map(step => step.manualMarker?.id).filter(Boolean));
        const completePlan = [...routeSteps];
        for (const marker of orderedMarkers) {
          if (marker.id && includedIds.has(marker.id)) continue;
          const label = String(marker.title).trim(), n = normalize(label);
          if (editRequest && /^(novo|nova|adicionar|incluir|duplicar|excluir|remover)\b/.test(n)) continue;
          if (createRequest && /^(editar|edicao|duplicar|excluir|remover)\b/.test(n)) continue;
          if (deleteRequest && !/^(procurar|barra de pesquisa|campo procurar|opcoes|botao opcoes|botao opcoes da linha|excluir|remover|apagar)\b/.test(n)) continue;
          const kind = /^(listagem|painel|area|acoes finais|secoes complementares)$/.test(n) ? "info"
            : /salvar|emitir|transmitir|autorizar|cancelar|excluir|finalizar|concluir|gerar|enviar|confirmar|entrar|imprimir|fechar/.test(n) ? "final_action"
            : /campo|pesquisa|procurar|ordenar|cfop|cst|aliquota|senha|cpf|cnpj|e-mail|email|telefone|cep|uf|natureza|chave|serie|numeracao|nome|descricao|codigo|preco|valor|unidade|ativo|ncm|cest|ean|gtin|cnae|nbs|issqn|origem|placa|renavam|razao social|fantasia|endereco|bairro|municipio|inscricao|categoria|quantidade|peso|frete/.test(n) ? "field" : "click";
          const targetNames = [label];
          if (/^menu:\\s*/i.test(label)) targetNames.push(label.replace(/^menu:\\s*/i, ""));
          if (/^barra de pesquisa/i.test(label)) targetNames.push("Procurar");
          if (/^botao\\s+/i.test(n)) targetNames.push(label.replace(/^botao\\s+/i, ""));
          if (/^botao opcoes da linha/.test(n)) targetNames.push("Opções da Linha", "Opções");
          completePlan.push({
            label, kind, path, description: [marker.description, marker.tip ? "Dica: " + marker.tip : ""].filter(Boolean).join("\\n\\n") || "Siga esta etapa conforme o Manual Future.",
            manualMarker: { id: marker.id || "", title: label, tip: marker.tip || "", description: marker.description || "", x: Number.isFinite(marker.x) ? marker.x : null, y: Number.isFinite(marker.y) ? marker.y : null, w: Number.isFinite(marker.w) ? marker.w : null, h: Number.isFinite(marker.h) ? marker.h : null },
            targetNames: [...new Set(targetNames)],
            optional: /^(barra de pesquisa|procurar)$/.test(n)
          });
          if (marker.id) includedIds.add(marker.id);
        }
        for (const action of getDocumentedActions(lesson, orderedMarkers)) {
          completePlan.push({
            label: action.label, kind: action.kind || "final_action", path, description: action.description,
            manualMarker: null, targetNames: markerTargetNames(action.label),
            manualActionFromContent: action.source === "lesson_text",
            manualActionFromMarker: action.source === "marker_description"
          });
        }
        return completePlan.slice(0, 1000);
      }
    }

    const fallbackMatch = !locateOnly ? [...bundleCache.lessons]
      .map(lesson => ({ lesson, score: relevance(lesson, location.pathname, question) }))
      .sort((a, b) => b.score - a.score)[0] : null;
    if (fallbackMatch?.lesson && fallbackMatch.score >= 12) {
      const lesson = fallbackMatch.lesson;
      const routeParts = String(lesson.path || "").split(/\s*>\s*/).filter(part => part && !/^(menu lateral|tela inicial|menu)$/i.test(part));
      const result = [];
      for (const label of routeParts) {
        if (!result.some(step => normalize(step.label) === normalize(label))) {
          result.push(makeLessonStep(bundleCache, lesson, label, "click", routeParts.join(" > "), "Abra esta seção para seguir o procedimento documentado na aula " + lesson.title + "."));
        }
      }
      const markers = [], seen = new Set();
      const collect = marker => {
        if (!marker?.title) return;
        const key = marker.id ? "id:" + marker.id : normalize(marker.title) + "|" + normalize(marker.description);
        if (seen.has(key)) return;
        seen.add(key); markers.push(marker);
      };
      (lesson.hotspots || []).forEach(collect);
      (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(collect));
      for (const marker of markers) {
        if (result.some(step => normalize(step.label) === normalize(marker.title))) continue;
        const n = normalize(marker.title);
        const kind = /salvar|emitir|transmitir|autorizar|cancelar|excluir|finalizar|concluir|gerar|enviar|confirmar|entrar|imprimir|fechar/.test(n) ? "final_action"
          : /campo|pesquisa|procurar|ordenar|cfop|cst|al[ií]quota|senha|cpf|cnpj|e-mail|email|telefone|cep|uf|natureza|tipo|finalidade|destinat[aá]rio|tomador|remetente|data|n[uú]mero|s[eé]rie|munic[ií]pio|emitente|contratante|contratado|transportadora|percurso|chave|nome|descri[cç][aã]o|c[oó]digo|pre[cç]o|valor|unidade|ativo|ncm|cest|ean|gtin|cnae|nbs|issqn|origem|placa|renavam|raz[aã]o social|fantasia|endere[cç]o|bairro|inscri[cç][aã]o|categoria|quantidade|peso|frete|per[ií]odo|ambiente|regime|csc/.test(n) ? "field" : "click";
        const step = makeLessonStep(bundleCache, lesson, marker.title, kind, routeParts.join(" > "), marker.description || marker.tip || "");
        step.targetNames = markerTargetNames(marker.title);
        result.push(step);
      }
      if (result.length) return result.slice(0, 1000);
    }
    return null;
  }


  function getManualTourPlan() {
    if (!bundleCache) return [];
    const moduleById = new Map(bundleCache.modules.map(module => [module.id, module]));
    const lessons = [...bundleCache.lessons].sort((a, b) => {
      const ma = moduleById.get(a.module_id)?.position ?? 999;
      const mb = moduleById.get(b.module_id)?.position ?? 999;
      return ma - mb || (a.position ?? 0) - (b.position ?? 0);
    });
    const plan = [];
    lessons.forEach((lesson, lessonIndex) => {
      const module = moduleById.get(lesson.module_id);
      const path = String(lesson.path || "").split(/\s*>\s*/).filter(Boolean).join(" > ");
      const markers = [], seen = new Set();
      const addMarker = marker => {
        if (!marker || !String(marker.title || "").trim()) return;
        const key = marker.id ? "id:" + marker.id : "text:" + normalize(marker.title) + "|" + normalize(marker.description);
        if (seen.has(key)) return;
        seen.add(key); markers.push(marker);
      };
      (lesson.hotspots || []).forEach(addMarker);
      (lesson.screenshots || []).forEach(shot => (shot.hotspots || []).forEach(addMarker));
      const contentActions = getDocumentedActions(lesson, markers);
      const total = markers.length + contentActions.length + 1;
      plan.push({
        label: lesson.title, kind: "info", path, lessonStart: true, lessonId: lesson.id || "",
        lessonIndex, lessonCount: lessons.length, lessonStepIndex: 1, lessonStepCount: total,
        lessonTitle: lesson.title, moduleTitle: module?.title || "Manual Future",
        description: [lesson.summary, lesson.content, path ? "Caminho no Emissor: " + path : ""].filter(Boolean).join("\n\n"),
        manualMarker: null, targetNames: []
      });
      markers.forEach((marker, markerIndex) => {
        const title = String(marker.title || "").trim(), targetNames = markerTargetNames(title), n = normalize(title);
        const field = /campo|pesquisa|procurar|ordenar|cfop|cst|aliquota|senha|cpf|cnpj|e-mail|email|telefone|cep|uf|natureza|tipo|finalidade|destinatario|tomador|remetente|data|numero|serie|municipio|emitente|contratante|contratado|transportadora|percurso|chave|nome|descricao|codigo|preco|valor|unidade|ativo|ncm|cest|ean|gtin|cnae|nbs|issqn|origem|placa|renavam|razao social|fantasia|endereco|bairro|inscricao|categoria|quantidade|peso|periodo|ambiente|regime|csc/.test(n);
        const finalAction = /salvar|emitir|transmitir|autorizar|cancelar|excluir|finalizar|concluir|gerar|enviar|confirmar|entrar|imprimir|fechar/.test(n);
        plan.push({
          label: title, kind: finalAction ? "final_action" : field ? "field" : "click", path,
          lessonId: lesson.id || "", lessonIndex, lessonCount: lessons.length,
          lessonStepIndex: markerIndex + 2, lessonStepCount: total,
          lessonTitle: lesson.title, moduleTitle: module?.title || "Manual Future",
          description: [marker.description, marker.tip ? "Dica: " + marker.tip : ""].filter(Boolean).join("\n\n") || "Consulte este elemento conforme o Manual Future.",
          manualMarker: { id: marker.id || "", title, tip: marker.tip || "", description: marker.description || "", x: Number.isFinite(marker.x) ? marker.x : null, y: Number.isFinite(marker.y) ? marker.y : null, w: Number.isFinite(marker.w) ? marker.w : null, h: Number.isFinite(marker.h) ? marker.h : null },
          targetNames: [...new Set(targetNames)]
        });
      });
      contentActions.forEach((action, actionIndex) => {
        plan.push({
          label: action.label, kind: action.kind || "final_action", path,
          lessonId: lesson.id || "", lessonIndex, lessonCount: lessons.length,
          lessonStepIndex: markers.length + actionIndex + 2, lessonStepCount: total,
          lessonTitle: lesson.title, moduleTitle: module?.title || "Manual Future",
          description: action.description, manualMarker: null,
          targetNames: markerTargetNames(action.label), manualActionFromContent: action.source === "lesson_text", manualActionFromMarker: action.source === "marker_description"
        });
      });
    });
    return plan;
  }

  function getManualTourCoverage() {
    const plan = getManualTourPlan();
    return {
      modules: bundleCache?.modules?.length || 0,
      lessons: new Set(plan.filter(step => step.lessonStart).map(step => step.lessonId)).size,
      steps: plan.length,
      markers: plan.filter(step => step.manualMarker).length,
      markerIds: [...new Set(plan.filter(step => step.manualMarker?.id).map(step => step.manualMarker.id))].length
    };
  }

  function getLocalAnswer(question) {
    if (!bundleCache || !String(question || "").trim()) return "";
    const ranked = [...bundleCache.lessons].map(lesson => ({
      lesson, score: relevance(lesson, location.pathname, question)
    })).sort((a, b) => b.score - a.score);
    const best = ranked[0];
    if (!best?.lesson || best.score < 8) return "";
    // Responda com uma única aula principal. Misturar aulas relacionadas (por exemplo,
    // configuração da NFC-e com emissão de NFC-e) gera respostas longas e fora da intenção.
    const lesson = best.lesson;
    const plan = getLocalNavigationPlan(question);
    const normalizedQuestion = normalize(question);
    const isCfopInspection = /\bcfop\b/.test(normalizedQuestion)
      && /\b(grupo|grupos|tributario|tributarios)\b/.test(normalizedQuestion)
      && /\b(conferir|confira|verificar|verifique|revisar|revise|validar|valide|checar|cheque)\b/.test(normalizedQuestion)
      && !/\b(ajustar|ajuste|alterar|altere|corrigir|corrija|editar|edite|trocar|troque|modificar|modifique)\b/.test(normalizedQuestion);
    if (isCfopInspection) {
      return "Claro! Vamos conferir juntos. Acesse Cadastros → Grupo Tributário, abra o grupo usado pelo produto e localize Regras Tributárias. Abra a regra correspondente à operação e confira o campo CFOP. Envie um print dessa tela para eu ajudar a analisar; não dá para afirmar se o CFOP está correto sem conhecer a operação e validar a orientação fiscal com a contabilidade.";
    }
    if (Array.isArray(plan) && plan.length) {
      const route = plan.map(step => step.label).join(" > ");
      const finalStep = plan[plan.length - 1];
      return [
        "## Aula: " + lesson.title,
        lesson.summary || "",
        "Caminho no Emissor: " + route.replace(/ > /g, " → "),
        ...plan.map(step => step.label + ": " + step.description),
        "Se algum menu estiver diferente, envie um print para eu localizar a opção correta. A extensão não preenche nem salva dados automaticamente."
      ].filter(Boolean).join("\n\n").slice(0, 9000);
    }
    return [
      "Encontrei esta orientação na base local do Manual Future:",
      lessonText(lesson, false),
      "Se a tela estiver diferente, envie um print para eu localizar o controle exato. A extensão não preenche nem salva dados automaticamente."
    ].join("\n\n").slice(0, 9000);
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
    getManualTourPlan: () => getManualTourPlan(),
    getManualTourCoverage: () => getManualTourCoverage(),
    getLocalAnswer,
    getStatus: () => lastStatus
  };
})();