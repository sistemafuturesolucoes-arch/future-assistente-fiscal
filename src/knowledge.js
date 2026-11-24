(() => {
  const SUPABASE_URL = "https://itbppoailqkuxajesgys.supabase.co";
  // Chave publishable já utilizada pelo Manual; não é service_role nem segredo.
  const PUBLISHABLE_KEY = "sb_publishable_J3-cgRigKn2QardNRaOFRQ_Jja51yof";
  const CACHE_KEY = "future-manual-knowledge-cache-v1";
  const MAX_CHARS = 60000;

  async function fetchRows(table, query) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: { apikey: PUBLISHABLE_KEY }
    });
    if (!response.ok) throw new Error(`Falha ao carregar ${table} (HTTP ${response.status}).`);
    return response.json();
  }

  function buildKnowledge(modules, lessons) {
    const byModule = new Map();
    for (const lesson of lessons) {
      if (!byModule.has(lesson.module_id)) byModule.set(lesson.module_id, []);
      byModule.get(lesson.module_id).push(lesson);
    }
    const parts = [];
    for (const mod of modules) {
      parts.push(`# Módulo: ${mod.title} — ${mod.description || ""}`);
      for (const lesson of byModule.get(mod.id) || []) {
        parts.push(
          `## Aula "${lesson.title}" (link: /aula/${lesson.id})`,
          lesson.path ? `Caminho no sistema: ${lesson.path}` : "",
          lesson.summary || "",
          lesson.content || ""
        );
        const shots = Array.isArray(lesson.screenshots) && lesson.screenshots.length
          ? lesson.screenshots
          : lesson.image_url
            ? [{ id: `screen-${lesson.id}`, image: lesson.image_url, caption: "", hotspots: lesson.hotspots }]
            : [];
        shots.forEach((shot, index) => {
          if (!shot || typeof shot.image !== "string" || !shot.image) return;
          parts.push(
            `PRINT VISUAL [VISUAL:${lesson.id}:${shot.id || `screen-${lesson.id}-${index+1}`}]`,
            `Etapa/legenda: ${shot.caption || `Tela ${index + 1} da aula`}`,
            `Imagem real: ${shot.image}`,
            "Elementos e posições neste print (coordenadas em porcentagem x, y, largura, altura):",
            ...(Array.isArray(shot.hotspots) ? shot.hotspots : []).map((h, i) =>
              `${i+1}. ${h.title || "Item"} (x=${h.x}, y=${h.y}, largura=${h.w}, altura=${h.h}): ${h.description || ""}${h.tip ? ` Dica: ${h.tip}` : ""}`
            )
          );
        });
      }
    }
    const text = parts.filter(Boolean).join("\n");
    return text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;
  }

  async function load(force = false) {
    if (!force && window.chrome?.storage?.local) {
      const cached = await chrome.storage.local.get(CACHE_KEY);
      const item = cached[CACHE_KEY];
      if (item?.text && Date.now() - item.savedAt < 30 * 60 * 1000) return item.text;
    }
    const [modules, lessons] = await Promise.all([
      fetchRows("course_modules", "select=id,title,description,position,is_published&is_published=eq.true&order=position.asc"),
      fetchRows("course_lessons", "select=id,module_id,title,summary,path,image_url,content,hotspots,screenshots,position,is_published&is_published=eq.true&order=position.asc")
    ]);
    const text = buildKnowledge(modules, lessons);
    if (window.chrome?.storage?.local) {
      await chrome.storage.local.set({ [CACHE_KEY]: { text, savedAt: Date.now() } });
    }
    return text;
  }

  window.FutureManualKnowledge = { load };
})();