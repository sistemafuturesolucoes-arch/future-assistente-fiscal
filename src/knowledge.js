(() => {
  const SUPABASE_URL = "https://itbppoailqkuxajesgys.supabase.co";
  const PUBLISHABLE_KEY = "sb_publishable_J3-cgRigKn2QardNRaOFRQ_Jja51yof";
  const CACHE_KEY = "future-manual-knowledge-cache-v2";
  const MAX_CHARS = 58000;
  let lastLessons = [];
  let lastStatus = null;

  async function fetchRows(table, query) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: { apikey: PUBLISHABLE_KEY }
    });
    if (!response.ok) throw new Error(`Falha ao carregar ${table} (HTTP ${response.status}).`);
    return response.json();
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
      for (const term of q.split(/[^a-z0-9]+/).filter(t => t.length > 3)) {
        if (haystack.includes(term)) score += 2;
      }
    }
    return score;
  }

  function lessonText(lesson, includeVisuals) {
    const parts = [
      `## Aula: ${lesson.title}`,
      lesson.path ? `Caminho no sistema: ${lesson.path}` : "",
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

  async function load(options = {}) {
    const route = options.route || location.pathname;
    const question = options.question || "";
    const cache = window.chrome?.storage?.local
      ? await chrome.storage.local.get(CACHE_KEY)
      : {};
    const item = cache[CACHE_KEY];
    const cacheMatches = item?.text && item.route === route &&
      Date.now() - item.savedAt < 5 * 60 * 1000;
    if (cacheMatches) {
      lastLessons = item.lessons || [];
      lastStatus = item.status || null;
      return item.text;
    }

    const [modules, lessons] = await Promise.all([
      fetchRows("course_modules", "select=id,title,description,position,is_published&is_published=eq.true&order=position.asc"),
      fetchRows("course_lessons", "select=id,module_id,title,summary,path,content,hotspots,screenshots,position,is_published&is_published=eq.true&order=position.asc")
    ]);
    lastLessons = lessons;
    const text = buildKnowledge(modules, lessons, route, question);
    const prioritized = [...lessons].sort((a, b) =>
      relevance(b, route, question) - relevance(a, route, question)
    );
    lastStatus = {
      modules: modules.length,
      lessons: lessons.length,
      prioritized: prioritized.filter(l => relevance(l, route, question) > 0).slice(0, 4).map(l => l.title),
      chars: text.length
    };
    if (window.chrome?.storage?.local) {
      await chrome.storage.local.set({
        [CACHE_KEY]: { text, route, lessons, status: lastStatus, savedAt: Date.now() }
      });
    }
    return text;
  }

  window.FutureManualKnowledge = {
    load,
    getStatus: () => lastStatus
  };
})();