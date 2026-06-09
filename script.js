/* OCA Arquitetos — script.js */
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // YEAR
  $('#yr').textContent = new Date().getFullYear();

  // THEME
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('oca-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  $('#themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('oca-theme', next);
  });

  // MOBILE NAV
  const mt = $('#menuToggle'), nm = $('#navMobile');
  mt?.addEventListener('click', () => {
    nm.classList.toggle('open');
    mt.setAttribute('aria-expanded', nm.classList.contains('open'));
  });
  $$('#navMobile a').forEach(a => a.addEventListener('click', () => nm.classList.remove('open')));

  // REVEAL
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // GALLERY
  const projects = [
    { img:'assets/images/projeto-02-living.jpg', cat:'residencial', title:'Ambiente residencial com identidade', desc:'Soluções pensadas para unir estética, conforto e funcionalidade.', span:8, h:'h-wide' },
    { img:'assets/images/projeto-01-sala.jpg', cat:'interiores', title:'Interiores pensados para o bem-estar', desc:'Cada detalhe é desenvolvido para refletir identidade e bem-estar.', span:4, h:'h-tall' },
    { img:'assets/images/projeto-03-tv.jpg', cat:'interiores', title:'Projeto com funcionalidade e acolhimento', desc:'Composição de materiais e luz pensada para a rotina real.', span:4, h:'h-sq' },
    { img:'assets/images/projeto-04-quarto.jpg', cat:'residencial', title:'Espaço contemporâneo e natural', desc:'Madeira, iluminação acolhedora e cuidado com o bem-estar.', span:4, h:'h-sq' },
    { img:'assets/images/projeto-05-studio.jpg', cat:'planejados', title:'Composição de materiais e luz', desc:'Marcenaria sob medida e iluminação que valoriza cada metro.', span:4, h:'h-sq' },
    { img:'assets/images/projeto-06-corredor.jpg', cat:'reforma', title:'Ambiente planejado para a rotina', desc:'Layout inteligente para conforto e uso real do espaço.', span:4, h:'h-sq' },
    { img:'assets/images/projeto-07-coworking.jpg', cat:'comercial', title:'Projeto presencial ou à distância', desc:'Espaços comerciais com identidade clara e experiência cuidadosa.', span:6, h:'h-wide' },
    { img:'assets/images/projeto-08-comercial.jpg', cat:'comercial', title:'Arquitetura que valoriza o viver', desc:'Projetos comerciais que conectam marca, pessoas e ambiente.', span:6, h:'h-wide' },
  ];
  const gallery = $('#gallery');
  function renderGallery(filter='all'){
    gallery.innerHTML = '';
    projects.filter(p => filter==='all' || p.cat===filter).forEach((p,i) => {
      const el = document.createElement('div');
      el.className = `g-card span-${p.span} ${p.h} reveal`;
      el.innerHTML = `<img loading="lazy" src="${p.img}" alt="${p.title}">
        <div class="g-info"><div class="cat">${p.cat}</div><h4>${p.title}</h4></div>`;
      el.addEventListener('click', () => openLightbox(p));
      gallery.appendChild(el);
      requestAnimationFrame(()=> el.classList.add('in'));
    });
  }
  renderGallery();
  $$('.filters .chip').forEach(c => c.addEventListener('click', () => {
    $$('.filters .chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    renderGallery(c.dataset.filter);
  }));

  // LIGHTBOX
  const lb = $('#lightbox');
  function openLightbox(p){
    $('#lbImg').src = p.img;
    $('#lbImg').alt = p.title;
    $('#lbCat').textContent = p.cat;
    $('#lbTitle').textContent = p.title;
    $('#lbDesc').textContent = p.desc;
    $('#lbWpp').href = `https://wa.me/5511983819509?text=${encodeURIComponent('Olá, OCA Arquitetos. Gostei do projeto: '+p.title+'. Quero um projeto assim.')}`;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
  }
  $('#lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  function closeLb(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }

  // QUIZ
  const questions = [
    { q:'O que você deseja transformar?', opts:['Casa','Apartamento','Sala comercial','Loja','Consultório','Ambiente específico','Ainda estou decidindo'] },
    { q:'Qual sensação você quer para o espaço?', opts:['Moderno','Aconchegante','Minimalista','Sofisticado','Natural','Funcional','Elegante'] },
    { q:'Quais elementos você mais gosta?', opts:['Madeira','Tons claros','Iluminação quente','Cimento','Mármore','Cores neutras','Plantas','Vidro e linhas retas'] },
    { q:'Qual é o maior problema hoje?', opts:['Falta de espaço','Ambiente sem personalidade','Pouca funcionalidade','Reforma parada','Dúvida de orçamento','Falta de planejamento','Não sei por onde começar'] },
    { q:'O que você espera do projeto?', opts:['Mais conforto e bem-estar','Mais beleza','Mais organização','Valorização do imóvel','Experiência para clientes','Aproveitamento do espaço'] },
  ];
  const results = {
    natural:{ title:'Sofisticação Natural com Toque Acolhedor', text:'Seu perfil combina com materiais naturais, iluminação acolhedora, tons equilibrados e ambientes que transmitem bem-estar sem abrir mão da elegância.' },
    minimal:{ title:'Minimalismo Funcional', text:'Seu projeto pede clareza, organização visual e soluções inteligentes para aproveitar melhor cada metro do espaço.' },
    contemp:{ title:'Elegância Contemporânea', text:'Seu estilo combina com linhas modernas, materiais sofisticados e uma atmosfera visualmente marcante, mas equilibrada.' },
    func:{ title:'Funcionalidade Inteligente', text:'Seu principal desafio parece ser transformar o espaço em algo mais prático, bem resolvido e adaptado à rotina.' },
    identity:{ title:'Ambiente com Identidade e Bem-estar', text:'Seu projeto precisa unir identidade, conforto e cuidado para criar um espaço que reflita quem você é e como você quer viver.' },
  };
  let qi = 0, answers = [];
  const body = $('#quizBody'), bar = $('#quizBar');
  function renderQuiz(){
    bar.style.width = ((qi)/(questions.length))*100 + '%';
    if (qi >= questions.length) return showResult();
    const q = questions[qi];
    body.innerHTML = `<div class="q-step">Pergunta ${qi+1} de ${questions.length}</div>
      <div class="q-question">${q.q}</div>
      <div class="q-opts">${q.opts.map(o => `<button class="q-opt" data-v="${o}">${o}</button>`).join('')}</div>
      <div class="q-nav">
        <button class="btn btn-ghost" id="qBack" ${qi===0?'disabled style=\"opacity:.4\"':''}>← Voltar</button>
        <button class="btn btn-primary" id="qNext" disabled style="opacity:.5">Continuar →</button>
      </div>`;
    let chosen = null;
    $$('.q-opt', body).forEach(b => b.addEventListener('click', () => {
      $$('.q-opt', body).forEach(x => x.classList.remove('selected'));
      b.classList.add('selected'); chosen = b.dataset.v;
      const n = $('#qNext'); n.disabled = false; n.style.opacity=1;
    }));
    $('#qBack').addEventListener('click', () => { if (qi>0){ qi--; answers.pop(); renderQuiz(); } });
    $('#qNext').addEventListener('click', () => { if (chosen){ answers[qi]=chosen; qi++; renderQuiz(); } });
  }
  function computeResult(){
    const a = answers.map(s=>s.toLowerCase()).join(' ');
    if (/sala comercial|loja|consultório|clientes/.test(a)) return results.identity;
    if (/minimalista|organização|clareza/.test(a)) return results.minimal;
    if (/natural|aconchegante|madeira|plantas|bem-estar/.test(a)) return results.natural;
    if (/sofisticado|elegante|mármore|moderno/.test(a)) return results.contemp;
    return results.func;
  }
  function showResult(){
    bar.style.width='100%';
    const r = computeResult();
    const msg = `Olá, OCA Arquitetos. Fiz o quiz no site e meu resultado foi: ${r.title}. Quero conversar sobre um projeto nesse estilo.`;
    body.innerHTML = `<div class="q-result">
      <span class="pill">Seu estilo combina com</span>
      <h3>${r.title}</h3>
      <p>${r.text}</p>
      <div class="hero-cta" style="margin-top:18px">
        <a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/5511983819509?text=${encodeURIComponent(msg)}">Quero conversar sobre meu projeto nesse estilo</a>
        <a class="btn btn-ghost" href="#projetos">Ver projetos parecidos</a>
        <button class="btn btn-link" id="qRestart">Refazer o quiz ↻</button>
      </div>
    </div>`;
    $('#qRestart').addEventListener('click', () => { qi=0; answers=[]; renderQuiz(); });
  }
  renderQuiz();

  // CHAT
  const fab = $('#chatFab'), panel = $('#chatPanel'), msgs = $('#chatMsgs'),
        form = $('#chatForm'), input = $('#chatText');
  let chatId = localStorage.getItem('oca-chat-id');
  if (!chatId){ chatId = 'oca-' + Date.now() + '-' + Math.random().toString(36).slice(2,9); localStorage.setItem('oca-chat-id', chatId); }
  function addMsg(text, who='bot'){
    const b = document.createElement('div'); b.className = `bubble ${who}`; b.textContent = text; msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight; return b;
  }
  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', !panel.classList.contains('open'));
    if (msgs.children.length === 0){
      addMsg('Oi, seja bem-vindo(a). Você está pensando em reformar, construir ou entender possibilidades para transformar seu espaço?');
    }
    if (panel.classList.contains('open')) input.focus();
  });
  $('#chatClose').addEventListener('click', () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim(); if (!text) return;
    addMsg(text, 'me'); input.value = '';
    const typing = addMsg('digitando…', 'bot'); typing.classList.add('typing');
    try{
      const res = await fetch('https://memoken.com/webhook/artificial-inteligence/completion', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: chatId, human_message: text })
      });
      const data = await res.json().catch(()=> ({}));
      typing.remove();
      const reply = data.message || data.response || data.reply || data.output || data.text || (typeof data === 'string' ? data : null);
      addMsg(reply || 'Obrigado pela mensagem. Em breve retornaremos.');
    } catch(err){
      typing.remove();
      addMsg('Não consegui responder agora, mas você pode falar diretamente com a OCA Arquitetos pelo WhatsApp.');
    }
  });
})();
