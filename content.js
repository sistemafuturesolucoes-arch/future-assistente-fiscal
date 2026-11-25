(async () => {
  window.__futureGuideCleanup?.();
  const {flows, findTarget} = await import(chrome.runtime.getURL('flows.js'));
  const response = await chrome.runtime.sendMessage({type:'GET_GUIDE'});
  const guide = response?.guide;
  if (!guide || guide.origin !== location.origin || !flows[guide.intent]) return;
  let index = guide.step;
  let target = null;
  let frame = 0;
  let advanceTimer;
  let finished = false;
  const host = document.createElement('div');
  host.id = 'future-guia-extension';
  document.documentElement.append(host);
  const shadow = host.attachShadow({mode:'open'});
  shadow.innerHTML = `<style>:host{all:initial;--green:#087d60;--paper:#fff;--ink:#20332c;--muted:#6f7c75;font-family:Arial,sans-serif}.ring{position:fixed;pointer-events:none;border:3px solid var(--green);border-radius:7px;box-shadow:0 0 0 5px #a4e8c960,0 0 0 9999px #172d2448;z-index:2147483645;display:none}.panel{position:fixed;bottom:24px;right:24px;width:min(330px,calc(100vw - 48px));background:var(--paper);border:1px solid #d8e8de;border-radius:12px;padding:22px;box-shadow:0 12px 60px #12291b30;z-index:2147483646;box-sizing:border-box;color:var(--ink);font-size:14px;line-height:1.5}header{display:flex;align-items:center;justify-content:space-between;color:var(--green);font-weight:bold}button{font:inherit;border:0;cursor:pointer;border-radius:5px;padding:8px 12px;background:#edf5ef;color:var(--green)}h2{font-size:19px;line-height:1.4;margin:16px 0 8px}p{color:var(--muted);margin:0 0 14px}small{display:block;color:var(--muted);font-size:11px;margin-top:14px}.actions{display:flex;gap:8px}.status{font-size:12px;color:var(--green)}</style><div class="ring"></div><section class="panel" role="dialog" aria-label="Future Guia"><header><span>✦ future guia</span><button class="close" aria-label="Fechar guia">✕</button></header><small class="count"></small><h2></h2><p></p><div class="status" role="status"></div><div class="actions"><button class="back">← Voltar</button><button class="retry">Procurar novamente</button></div><small>Você está no controle. O guia não preenche nem envia dados.</small></section>`;
  const ring = shadow.querySelector('.ring');
  const panel = shadow.querySelector('.panel');
  const clearTarget = () => {target?.removeEventListener('click', next); target = null; ring.style.display = 'none';};
  const cleanup = () => {clearTarget();clearTimeout(advanceTimer);cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('keydown', keydown);host.remove();};
  window.__futureGuideCleanup = cleanup;
  const stop = () => {chrome.runtime.sendMessage({type:'STOP'});cleanup();};
  function keydown(e) {if(e.key === 'Escape') stop();}
  async function next() {
    if (finished) return;
    clearTarget();
    index += 1;
    await chrome.runtime.sendMessage({type:'STEP',step:index});
    advanceTimer = setTimeout(render, 350);
  }
  function locate() {
    if(finished) return;
    const step = flows[guide.intent].steps[index];
    if(!step) return;
    const elements = [...document.querySelectorAll('a,button,[role="menuitem"],[role="button"],summary')].filter(el => { const r=el.getBoundingClientRect();return r.width>0 && r.height>0 && getComputedStyle(el).visibility !== 'hidden' && !el.disabled && el.getAttribute('aria-disabled')!=='true'; }).map(element=>({element,text:element.getAttribute('aria-label') || element.innerText || element.textContent || ''}));
    const found = findTarget(elements,step.terms);
    if(found !== target) {
      clearTarget(); target=found;
      if(target){target.scrollIntoView({behavior:'smooth',block:'center'});target.addEventListener('click',next,{once:true});}
    }
    shadow.querySelector('.status').textContent = target ? 'Clique no item destacado para continuar.' : 'Não encontrei este menu visível. Abra o menu lateral ou confira se está na página correta.';
  }
  function render() {
    const flow=flows[guide.intent];const step=flow.steps[index];
    if(!step){finished=true;clearTarget();shadow.querySelector('h2').textContent='Você chegou ao lugar certo!';shadow.querySelector('p').textContent='Continue o preenchimento no emissor. Nenhum dado foi enviado pelo guia.';shadow.querySelector('.count').textContent='CAMINHO CONCLUÍDO';shadow.querySelector('.status').textContent='';shadow.querySelector('.actions').style.display='none';chrome.runtime.sendMessage({type:'STOP'});return;}
    shadow.querySelector('.count').textContent=`PASSO ${index+1} DE ${flow.steps.length}`;
    shadow.querySelector('h2').textContent=step.label;
    shadow.querySelector('p').textContent=step.detail;
    shadow.querySelector('.back').disabled=index===0;
    locate();
  }
  function position(){if(target){const r=target.getBoundingClientRect();Object.assign(ring.style,{display:'block',top:`${r.top-4}px`,left:`${r.left-4}px`,width:`${r.width+2}px`,height:`${r.height+2}px`});const p=panel.getBoundingClientRect();panel.style.bottom=r.bottom>p.top && r.right>p.left ? 'auto':'24px';panel.style.top=r.bottom>p.top && r.right>p.left ? '24px':'auto';}frame=requestAnimationFrame(position);}
  let mutationTimer;
  const observer=new MutationObserver(()=>{clearTimeout(mutationTimer);mutationTimer=setTimeout(locate,120);});
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden','aria-expanded']});
  shadow.querySelector('.close').addEventListener('click',stop);
  shadow.querySelector('.retry').addEventListener('click',locate);
  shadow.querySelector('.back').addEventListener('click',async()=>{if(index>0){clearTarget();index--;await chrome.runtime.sendMessage({type:'STEP',step:index});render();}});
  window.addEventListener('keydown',keydown);render();position();
})();
