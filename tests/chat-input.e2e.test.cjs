const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require("playwright");

test("Chrome real permite digitar, enviar e anexar print no chat da extensão", async () => {
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
      route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><html><head><title>Emissor de teste</title></head><body><h1>Emissão de serviço</h1><label for='numero'>Número</label><input id='numero'><button>Salvar rascunho</button></body></html>" })
    );
    await page.route("https://itbppoailqkuxajesgys.supabase.co/functions/v1/ai-assistant", async route => {
      aiRequests += 1;
      lastPayload = route.request().postDataJSON();
      const events = [
        { type: "start", messageId: "m-test" },
        { type: "text-start", id: "t-test" },
        { type: "text-delta", id: "t-test", delta: "Resposta de teste do assistente." },
        { type: "text-end", id: "t-test" },
        { type: "finish" },
      ];
      const body = events.map(event => "data: " + JSON.stringify(event) + "\n\n").join("") + "data: [DONE]\n\n";
      await route.fulfill({ status: 200, headers: { "content-type": "text/event-stream", "cache-control": "no-cache" }, body });
    });
    await page.route("https://itbppoailqkuxajesgys.supabase.co/rest/v1/**", route =>
      route.fulfill({ status: 200, contentType: "application/json", body: "[]" })
    );
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
    await call(textarea, "function(){ this.focus(); return document.activeElement === this; }");
    await cdp.send("Input.insertText", { text: "Como localizo o campo de serviço?" });
    const typed = await call(textarea, "function(){ return this.value; }");
    assert.equal(typed.result.value, "Como localizo o campo de serviço?", "o texto deve entrar no campo");
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, modifiers: 8 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, modifiers: 8 });
    await cdp.send("Input.insertText", { text: "Pode detalhar?" });
    const multiline = await call(textarea, "function(){ return this.value; }");
    assert.match(multiline.result.value, /\\nPode detalhar\\?/);
    for (let i = 0; i < 40 && aiRequests === 0; i++) await new Promise(resolve => setTimeout(resolve, 100));
    assert.equal(aiRequests, 1, "Enter deve enviar a mensagem uma única vez");
    assert.ok(lastPayload?.messages?.length, "a pergunta deve chegar à IA");
    assert.match(JSON.stringify(lastPayload.messages), /Como localizo o campo de serviço/);
    assert.match(JSON.stringify(lastPayload.messages), /Pode detalhar/);

    await call(textarea, "function(){ this.value = 'Analise este print'; this.dispatchEvent(new Event('input', {bubbles:true})); }");
    const fileInput = await query(".hidden-file");
    await cdp.send("DOM.setFileInputFiles", { nodeId: fileInput, files: [imagePath, xmlPath] });
    await call(fileInput, "function(){ this.dispatchEvent(new Event('change', {bubbles:true})); }");
    await new Promise(resolve => setTimeout(resolve, 350));
    const chips = await query(".pending-files");
    const chipText = await call(chips, "function(){ return this.innerText; }");
    assert.match(chipText.result.value, /print-teste\.png/i, "o print deve aparecer como anexo pendente");
  } finally {
    if (context) await context.close();
    fs.rmSync(profilePath, { recursive: true, force: true });
  }
});
