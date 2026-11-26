const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright");

test("Chrome real permite digitar, usar Shift+Enter, enviar e anexar print/XML", async () => {
  const extensionPath = path.resolve(__dirname, "..");
  const profilePath = fs.mkdtempSync(path.join(os.tmpdir(), "future-assistente-chrome-"));
  const imagePath = path.join(profilePath, "print-teste.png");
  const xmlPath = path.join(profilePath, "documento.xml");
  fs.writeFileSync(imagePath, Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  fs.writeFileSync(xmlPath, "<?xml version=\"1.0\"?><NFe><infNFe><ide><nNF>123</nNF></ide></infNFe></NFe>");
  let aiRequests = 0;
  let lastPayload = null;
  let context;

  try {
    context = await chromium.launchPersistentContext(profilePath, {
      channel: "chromium",
      headless: true,
      args: [
        "--headless=new",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-extensions-except=" + extensionPath,
        "--load-extension=" + extensionPath,
      ],
    });
    const page = context.pages()[0] || await context.newPage();
    await page.route("https://sistema.emissorfiscalonline.com.br/**", route =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><html><head><title>Emissor de teste</title></head><body><h1>Emissão de serviço</h1><label for='numero'>Número</label><input id='numero'><button id='cadastros'>Cadastros</button><div id='menu'></div><button>Salvar rascunho</button><script>document.getElementById('cadastros').addEventListener('click',()=>{document.getElementById('menu').innerHTML='<button id=clientes>Clientes</button>';document.getElementById('clientes').addEventListener('click',()=>{location.hash='#/cadastros/clientes'});});</script></body></html>" })
    );
    const corsHeaders = { "access-control-allow-origin": "*", "access-control-allow-headers": "authorization, apikey, content-type, x-client-info", "access-control-allow-methods": "GET, POST, PATCH, OPTIONS" };
    await page.route("https://itbppoailqkuxajesgys.supabase.co/functions/v1/ai-assistant", async route => {
      if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: corsHeaders });
      aiRequests += 1;
      lastPayload = route.request().postDataJSON();
      const serializedMessages = JSON.stringify(lastPayload?.messages || []);
      const answer = serializedMessages.includes("FUTURE_NAVIGATION_PLAN_REQUEST")
        ? `Vamos seguir o caminho documentado no Manual. Primeiro, abra Cadastros.
[[FUTURE_NAVIGATION_PLAN]][{"label":"Cadastros","description":"Abra o menu Cadastros.","path":"Cadastros > Clientes"},{"label":"Clientes","description":"Acesse Clientes para abrir a tela de cadastro.","path":"Cadastros > Clientes"}][[/FUTURE_NAVIGATION_PLAN]]`
        : "Resposta de teste do assistente.";
      const events = [
        { type: "start", messageId: "m-test" },
        { type: "text-start", id: "t-test" },
        { type: "text-delta", id: "t-test", delta: answer },
        { type: "text-end", id: "t-test" },
        { type: "finish" },
      ];
      const body = events.map(event => "data: " + JSON.stringify(event) + "\n\n").join("") + "data: [DONE]\n\n";
      await route.fulfill({ status: 200, headers: { ...corsHeaders, "content-type": "text/event-stream", "cache-control": "no-cache" }, body });
    });
    await page.route("https://itbppoailqkuxajesgys.supabase.co/rest/v1/**", route => {
      if (route.request().method() === "OPTIONS") return route.fulfill({ status: 204, headers: corsHeaders });
      const url = new URL(route.request().url());
      if (url.pathname.endsWith("/course_modules")) {
        return route.fulfill({ status: 200, headers: { ...corsHeaders, "content-type": "application/json" }, body: JSON.stringify([{ id: "mod-cadastros", title: "Cadastros", position: 1 }]) });
      }
      if (url.pathname.endsWith("/course_lessons")) {
        return route.fulfill({ status: 200, headers: { ...corsHeaders, "content-type": "application/json" }, body: JSON.stringify([{ id: "lesson-clientes", module_id: "mod-cadastros", title: "Cadastrar cliente", summary: "Acesse Cadastros > Clientes para cadastrar um cliente.", path: "Cadastros > Clientes", content: "Abra o menu Cadastros e selecione Clientes.", position: 1 }]) });
      }
      return route.fulfill({ status: 200, headers: { ...corsHeaders, "content-type": "application/json" }, body: "[]" });
    });
    await page.goto("https://sistema.emissorfiscalonline.com.br/app/notas/servico");
    await page.waitForFunction(() => Boolean(document.getElementById("future-assistente-host")));
    await page.waitForTimeout(500);

    const cdp = await context.newCDPSession(page);
    await cdp.send("DOM.enable");
    const tree = await cdp.send("DOM.getDocument", { depth: -1, pierce: true });
    const findHost = node => {
      if (node.attributes?.includes("id") && node.attributes[node.attributes.indexOf("id") + 1] === "future-assistente-host") return node;
      for (const child of [...(node.children || []), ...(node.shadowRoots || [])]) {
        const found = findHost(child);
        if (found) return found;
      }
      return null;
    };
    const host = findHost(tree.root);
    assert.ok(host, "host do assistente deve existir");
    assert.ok(host.shadowRoots?.length, "Shadow DOM do assistente deve existir");
    const shadowRootId = host.shadowRoots[0].nodeId;

    const query = async selector => {
      const result = await cdp.send("DOM.querySelector", { nodeId: shadowRootId, selector });
      assert.ok(result.nodeId, "elemento não encontrado: " + selector);
      return result.nodeId;
    };
    const call = async (nodeId, declaration) => {
      const resolved = await cdp.send("DOM.resolveNode", { nodeId });
      return cdp.send("Runtime.callFunctionOn", {
        objectId: resolved.object.objectId,
        functionDeclaration: declaration,
        returnByValue: true,
      });
    };
    const launcher = await query(".launcher");
    await call(launcher, "function(){ this.click(); return true; }");
    const textarea = await query(".composer textarea");
    const focused = await call(textarea, "function(){ this.focus(); return this.getRootNode().activeElement === this; }");
    assert.equal(focused.result.value, true, "o campo precisa receber foco");
    await cdp.send("Input.insertText", { text: "Como localizo o campo de serviço?" });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, modifiers: 8 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, modifiers: 8 });
    await cdp.send("Input.insertText", { text: "\n" });
    assert.equal(aiRequests, 0, "Shift+Enter não deve enviar a mensagem");
    await cdp.send("Input.insertText", { text: "Pode detalhar?" });
    const multiline = await call(textarea, "function(){ return this.value; }");
    assert.match(multiline.result.value, /\nPode detalhar\?/);
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    for (let i = 0; i < 40 && aiRequests === 0; i++) await new Promise(resolve => setTimeout(resolve, 100));
    assert.equal(aiRequests, 1, "Enter deve enviar a mensagem uma única vez");
    assert.match(JSON.stringify(lastPayload?.messages || []), /Como localizo o campo de serviço/);
    assert.match(JSON.stringify(lastPayload?.messages || []), /Pode detalhar/);

    const stopButton = await query(".stop");
    for (let i = 0; i < 40; i++) {
      const stopped = await call(stopButton, "function(){ return this.disabled; }");
      if (stopped.result.value) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    await call(textarea, "function(){ this.value = 'Analise este print e XML'; this.dispatchEvent(new Event('input', {bubbles:true})); }");
    const fileInput = await query(".hidden-file");
    await cdp.send("DOM.setFileInputFiles", { nodeId: fileInput, files: [imagePath, xmlPath] });
    await call(fileInput, "function(){ this.dispatchEvent(new Event('change', {bubbles:true})); }");
    await new Promise(resolve => setTimeout(resolve, 500));
    const chips = await query(".pending-files");
    const chipText = await call(chips, "function(){ return this.innerText; }");
    assert.match(chipText.result.value, /print-teste\.png/i, "o print deve aparecer como anexo pendente");
    assert.match(chipText.result.value, /documento\.xml/i, "o XML deve aparecer como anexo pendente");

    const sendButton = await query(".send");
    await call(sendButton, "function(){ this.click(); return true; }");
    for (let i = 0; i < 40 && aiRequests < 2; i++) await new Promise(resolve => setTimeout(resolve, 100));
    assert.equal(aiRequests, 2, "print e XML devem ser enviados à IA");
    const serialized = JSON.stringify(lastPayload?.messages || []);
    assert.match(serialized, /data:image\/png;base64/);
    assert.match(serialized, /application\/xml/);
    assert.match(serialized, /documento\.xml/);
    for (let i = 0; i < 40; i++) {
      const stopped = await call(stopButton, "function(){ return this.disabled; }");
      if (stopped.result.value) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    await call(textarea, "function(){ this.value = 'Quero consultar clientes'; this.dispatchEvent(new Event('input', {bubbles:true})); }");
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await new Promise(resolve => setTimeout(resolve, 500));
    assert.equal(aiRequests, 2, "uma consulta de listagem documentada deve usar a base local sem chamar a IA");
    let guideCard = 0;
    for (let i = 0; i < 50 && !guideCard; i++) {
      const found = await cdp.send("DOM.querySelector", { nodeId: shadowRootId, selector: ".guide-card" });
      guideCard = found.nodeId || 0;
      if (!guideCard) await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(guideCard, "o roteiro local deve aparecer imediatamente");
    const firstGuideTitle = await call(guideCard, "function(){ return this.querySelector('.guide-title')?.textContent || ''; }");
    assert.equal(firstGuideTitle.result.value, "Cadastros");
    await page.locator("#cadastros").click();
    let secondGuideTitle = "";
    for (let i = 0; i < 50; i++) {
      const found = await cdp.send("DOM.querySelector", { nodeId: shadowRootId, selector: ".guide-card .guide-title" });
      if (found.nodeId) {
        const title = await call(found.nodeId, "function(){ return this.textContent || ''; }");
        secondGuideTitle = title.result.value || "";
      }
      if (secondGuideTitle === "Clientes") break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.equal(secondGuideTitle, "Clientes", "o JavaScript local deve avançar para o próximo item do caminho do Manual");
    assert.equal(aiRequests, 2, "o avanço normal do roteiro local não deve chamar a IA");
    await page.locator("#clientes").click();
    let guideDisconnected = false;
    for (let i = 0; i < 40; i++) {
      const found = await cdp.send("DOM.querySelector", { nodeId: shadowRootId, selector: ".guide-card" });
      guideDisconnected = !found.nodeId;
      if (guideDisconnected) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.equal(guideDisconnected, true, "o guia deve encerrar ao chegar ao destino do Manual");
    assert.equal(aiRequests, 2, "a conclusão do caminho documentado também não deve gerar chamada à IA");

    // Mesmo sem o menu Configurações no DOM, a extensão deve manter o caminho local
    // visível, sem chamar a IA e sem destacar um controle incorreto.
    await call(textarea, "function(){ this.value = 'como carregar um novo arquivo do certificado digital A1'; this.dispatchEvent(new Event('input', {bubbles:true})); }");
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await new Promise(resolve => setTimeout(resolve, 500));
    assert.equal(aiRequests, 2, "a orientação do certificado deve usar o roteiro local sem chamar a IA");
    const missingTargetCard = await cdp.send("DOM.querySelector", { nodeId: shadowRootId, selector: ".guide-card" });
    assert.ok(missingTargetCard.nodeId, "o caminho local deve permanecer visível quando o primeiro menu não está na tela");
    const missingTargetText = await call(missingTargetCard.nodeId, "function(){ return this.innerText; }");
    assert.match(missingTargetText.result.value, /Configurações > Empresa > Certificado Digital > Opções/);
    assert.match(missingTargetText.result.value, /Já abri — avançar/);
    const manualNext = await cdp.send("DOM.querySelector", { nodeId: shadowRootId, selector: ".guide-manual-next" });
    assert.ok(manualNext.nodeId, "deve permitir confirmar manualmente a abertura do menu");
    const manualNextHidden = await call(manualNext.nodeId, "function(){ return this.hidden; }");
    assert.equal(manualNextHidden.result.value, false);
    assert.equal(aiRequests, 2, "a falta do alvo visual não deve descartar o roteiro nem consultar a IA");

  } finally {
    if (context) await context.close();
    fs.rmSync(profilePath, { recursive: true, force: true });
  }
});
