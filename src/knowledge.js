(() => {
  const SUPABASE_URL = "https://itbppoailqkuxajesgys.supabase.co";
  const PUBLISHABLE_KEY = "sb_publishable_J3-cgRigKn2QardNRaOFRQ_Jja51yof";
  const CACHE_KEY = "future-manual-knowledge-cache-v3";
  const MAX_CHARS = 58000;
  let lastLessons = [];
  let lastStatus = null;

  async function fetchRows(table, query) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
        headers: { apikey: PUBLISHABLE_KEY },
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`Falha ao carregar ${table} (HTTP ${response.status}).`);
      return await response.json();
    } catch (error) {
      if (error?.name === "AbortError") throw new Error(`O Manual demorou para carregar ${table}. A consulta pode continuar sem o Manual.`);
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function relevance(lesson, route, question) {
    const haystack = normalize([lesson.title, lesson.summary, lesson.path, lesson.content].join(" "));
    const r = normalize(route);
    const q = normalize(question);
    let score = 0;
    if (/nfse|nota.?de.?servico|servico/.test(r) && /nfse|nota.?fiscal.?de.?servico/.test(haystack)) score += 100;
    if (/notas\/servico|notas\/servico\/emitir/.test(r) && /nfse|servico/.test(haystack)) score += 80;
    if (q) {
      // No Manual, "regra fiscal" é documentada principalmente como grupo tributário e tributação.
      if (/regras? fiscais?/.test(q) && /grupos? tributarios?|tributacao/.test(haystack)) score += 110;
      const title = normalize(lesson.title);
      const summary = normalize(lesson.summary);
      const queryTerms = q.split(/[^a-z0-9]+/).filter(t => t.length > 2);
      if (title && q.includes(title)) score += 120;
      if (title && title.includes(q)) score += 90;
      if (queryTerms.length >= 2 && queryTerms.every(term => title.includes(term))) score += 55;
      if (queryTerms.length >= 2 && queryTerms.every(term => haystack.includes(term))) score += 25;
      if (summary && queryTerms.length >= 2 && queryTerms.every(term => summary.includes(term))) score += 12;
      for (const term of queryTerms) if (haystack.includes(term)) score += term.length > 3 ? 3 : 1;
    }
    return score;
  }

  function lessonText(lesson, includeVisuals) {
    const parts = [
      `## Aula: ${lesson.title}`,
      lesson.path ? `Caminho no sistema: ${lesson.path}` : "",
      lesson.id ? `Link direto da aula no Manual: https://crm.futuresolucoes.com.br/manual/aula/${encodeURIComponent(lesson.id)}` : "",
      lesson.summary || "",
      lesson.content || ""
    ];
    if (includeVisuals) {
      const shots = Array.isArray(lesson.screenshots) ? lesson.screenshots : [];
      shots.forEach((shot, index) => {
        if (!shot) return;
        parts.push(`### Referência visual ${index + 1}: ${shot.caption || "Tela da aula"}`);
        for (const h of (Array.isArray(shot.hotspots) ? shot.hotspots : [])) {
          if (!h) continue;
          parts.push(`- ${h.title || "Elemento"}: ${h.description || ""}${h.tip ? " Dica: " + h.tip : ""}`);
        }
      });
      for (const h of (Array.isArray(lesson.hotspots) ? lesson.hotspots : [])) {
        if (!h) continue;
        parts.push(`- ${h.title || "Elemento"}: ${h.description || ""}${h.tip ? " Dica: " + h.tip : ""}`);
      }
    }
    return parts.filter(Boolean).join("\n");
  }

  function buildKnowledge(modules, lessons, route, question) {
    const moduleById = new Map(modules.map(m => [m.id, m]));
    const ranked = [...lessons].sort((a, b) =>
      relevance(b, route, question) - relevance(a, route, question) ||
      (a.position || 0) - (b.position || 0)
    );
    const relevantIds = new Set(ranked.filter(l => relevance(l, route, question) > 0).slice(0, 4).map(l => l.id));
    const parts = [
      "BASE DE CONHECIMENTO DO MANUAL FUTURE. Use este material antes de afirmar que uma tela ou assunto não está documentado.",
      "Não invente regras fiscais nem valores tributários. Quando a decisão depender do regime, município ou enquadramento, explique a dúvida e recomende confirmação com a contabilidade.",
      "Todas as aulas publicadas abaixo estão disponíveis no Manual. As aulas mais relacionadas à tela atual aparecem primeiro e incluem os pontos visuais explicativos."
    ];
    for (const lesson of ranked) {
      const mod = moduleById.get(lesson.module_id);
      parts.push(`# Módulo: ${mod?.title || "Manual"}`);
      parts.push(lessonText(lesson, relevantIds.has(lesson.id)));
    }
    let text = parts.join("\n\n");
    if (text.length > MAX_CHARS) {
      // Keep complete high-priority lessons; trim only the tail of unrelated lesson material.
      const header = parts.slice(0, 3).join("\n\n");
      const selected = ranked.filter(l => relevantIds.has(l.id)).map(l => lessonText(l, true));
      const others = ranked.filter(l => !relevantIds.has(l.id)).map(l => lessonText(l, false));
      text = [header, ...selected, ...others].join("\n\n");
      if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS);
    }
    return text;
  }

  let lastModulesCount = 0;

  function buildStatus(lessons, route, question, text) {
    const prioritized = [...lessons].sort((a, b) =>
      relevance(b, route, question) - relevance(a, route, question) ||
      (a.position || 0) - (b.position || 0)
    );
    return {
      modules: lastModulesCount,
      lessons: lessons.length,
      prioritized: prioritized.filter(l => relevance(l, route, question) > 0).slice(0, 4).map(l => l.title),
      chars: text.length
    };
  }

  async function load(options = {}) {
    const route = options.route || location.pathname;
    const question = options.question || "";
    const cache = window.chrome?.storage?.local ? await chrome.storage.local.get(CACHE_KEY) : {};
    const item = cache[CACHE_KEY];
    const cacheMatches = Array.isArray(item?.modules) && Array.isArray(item?.lessons) &&
      item.route === route && Date.now() - item.savedAt < 5 * 60 * 1000;
    let modules, lessons;
    if (cacheMatches) {
      modules = item.modules;
      lessons = item.lessons;
    } else {
      [modules, lessons] = await Promise.all([
        fetchRows("course_modules", "select=id,title,description,position,is_published&is_published=eq.true&order=position.asc"),
        fetchRows("course_lessons", "select=id,module_id,title,summary,path,content,hotspots,screenshots,position,is_published&is_published=eq.true&order=position.asc")
      ]);
      if (window.chrome?.storage?.local) {
        await chrome.storage.local.set({ [CACHE_KEY]: { route, modules, lessons, savedAt: Date.now() } });
      }
    }
    lastLessons = lessons;
    lastModulesCount = modules.length;
    const text = buildKnowledge(modules, lessons, route, question);
    lastStatus = buildStatus(lessons, route, question, text);
    return text;
  }

  window.FutureManualKnowledge = {
    load,
    getStatus: () => lastStatus
  };
})();