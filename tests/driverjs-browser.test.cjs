const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { chromium } = require("playwright");

test("Driver.js headless aguarda elemento dinâmico sem bloquear a página", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent("<!doctype html><html><body><button id='keep-working'>Continuar usando a página</button></body></html>");
    await page.addScriptTag({ path: path.join(__dirname, "../src/driver-headless.bundle.js") });
    const result = await page.evaluate(async () => {
      const driver = globalThis.FutureDriverHeadless?.driver;
      if (typeof driver !== "function") return { loaded: false };
      let waiting = false;
      let highlighted = false;
      const tour = driver({
        steps: [{
          element: () => document.querySelector("#late-menu-item") || undefined,
          waitForElement: 1500,
          scrollIntoView: false,
          advanceOn: false
        }],
        onWaitingForElement: () => { waiting = true; },
        onHighlighted: element => { highlighted = element?.id === "late-menu-item"; }
      });
      tour.drive();
      await new Promise(resolve => setTimeout(resolve, 100));
      const target = document.createElement("button");
      target.id = "late-menu-item";
      target.textContent = "Serviços";
      document.body.append(target);
      await new Promise(resolve => setTimeout(resolve, 150));
      const pageStillInteractive = !document.querySelector("#keep-working").disabled;
      const activeTarget = tour.getActiveElement()?.id === "late-menu-item";
      tour.destroy();
      return { loaded: true, waiting, highlighted, activeTarget, pageStillInteractive };
    });
    assert.equal(result.loaded, true, "bundle Driver.js headless não carregou");
    assert.equal(result.waiting, true, "Driver.js não sinalizou espera pelo menu dinâmico");
    assert.equal(result.highlighted, true, "Driver.js não reconheceu o elemento quando apareceu");
    assert.equal(result.activeTarget, true, "o alvo ativo não corresponde ao elemento dinâmico");
    assert.equal(result.pageStillInteractive, true, "a página ficou bloqueada durante a orientação");
  } finally {
    await browser.close();
  }
});
