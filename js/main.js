// ===== CANVAS =====
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  class Node {
    constructor() { this.x=Math.random()*W; this.y=Math.random()*H; this.vx=(Math.random()-.5)*.35; this.vy=(Math.random()-.5)*.35; this.r=Math.random()*1.8+.8; }
    update() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W)this.vx*=-1; if(this.y<0||this.y>H)this.vy*=-1; }
  }
  for(let i=0;i<50;i++) nodes.push(new Node());
  function draw() {
    ctx.clearRect(0,0,W,H);
    const dark = document.documentElement.dataset.theme !== 'light';
    const nc = dark ? 'rgba(0,229,255,.5)' : 'rgba(0,100,180,.3)';
    const lb = dark ? '0,229,255' : '0,100,180';
    nodes.forEach((n,i) => {
      n.update();
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle=nc; ctx.fill();
      nodes.slice(i+1).forEach(m => {
        const d = Math.hypot(n.x-m.x, n.y-m.y);
        if(d<140) { ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y); ctx.strokeStyle=`rgba(${lb},${.12*(1-d/140)})`; ctx.lineWidth=.4; ctx.stroke(); }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  if (btn) btn.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'light' : 'dark';
    localStorage.setItem('theme', dark ? 'light' : 'dark');
    btn.textContent = dark ? '☀️' : '🌙';
  });
}

// ===== NAV =====
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
  // Set active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== OBSERVER =====
function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('visible');
          el.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.width + '%'; });
        }, delay);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.ai-card, .fade-in, .tl-item, .how-card, .br-card').forEach(el => obs.observe(el));
  return obs;
}

// ===== COUNTER =====
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target, target = parseInt(el.dataset.target);
        let c = 0; const step = target / 60;
        const t = setInterval(() => {
          c = Math.min(c + step, target);
          el.textContent = Math.floor(c).toLocaleString('pt-BR') + '+';
          if (c >= target) clearInterval(t);
        }, 16);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(c => obs.observe(c));
}

// ===== MODAL =====
function openModal(id) {
  if (typeof AI_DATA === 'undefined') return;
  const ai = AI_DATA.find(a => a.id === id); if (!ai) return;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-header">
      <div class="modal-icon">${ai.logo}</div>
      <div><div class="modal-title">${ai.name}</div><div class="modal-subtitle">${ai.maker}</div></div>
    </div>
    <div class="modal-sec"><h4>SOBRE</h4><p>${ai.about}</p></div>
    <div class="modal-sec"><h4>ESPECIFICAÇÕES</h4>
      <div class="modal-specs">${ai.specs.map(s=>`<div class="spec-item"><div class="spec-label">${s.l}</div><div class="spec-value">${s.v}</div></div>`).join('')}</div>
    </div>
    <div class="modal-sec"><h4>PRÓS & CONTRAS</h4>
      <div class="modal-pros-cons">
        <div class="pros"><h5>✓ Pontos Fortes</h5><ul>${ai.pros.map(p=>`<li>${p}</li>`).join('')}</ul></div>
        <div class="cons"><h5>✗ Pontos Fracos</h5><ul>${ai.cons.map(c=>`<li>${c}</li>`).join('')}</ul></div>
      </div>
    </div>
    <div class="modal-sec" style="margin-top:1rem">
      <a href="${ai.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Acessar ${ai.name} →</a>
    </div>`;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function initModal() {
  const closeBtn = document.getElementById('modalClose');
  const overlay = document.getElementById('modalOverlay');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ===== VOTES =====
let votes = JSON.parse(localStorage.getItem('aiVotes') || '{}');
function saveVotes() { localStorage.setItem('aiVotes', JSON.stringify(votes)); }

// ===== RENDER CARDS =====
function renderCards(data, containerId = 'aiGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  const obs = initObserver();
  data.forEach((ai, i) => {
    const v = votes[ai.id] || 0;
    const userVoted = localStorage.getItem('voted_' + ai.id);
    const card = document.createElement('div');
    card.className = 'ai-card';
    card.dataset.cats = ai.cats;
    card.dataset.id = ai.id;
    card.dataset.name = ai.name.toLowerCase();
    card.dataset.delay = Math.min(i, 8) * 80;
    card.style.setProperty('--card-accent', ai.accent);
    card.innerHTML = `
      <div class="ai-card-header">
        <div class="ai-logo">${ai.logo}</div>
        <div><div class="ai-name">${ai.name}</div><div class="ai-maker">${ai.maker}</div></div>
        <div class="ai-badge">${ai.badge}</div>
      </div>
      <p class="ai-desc">${ai.desc}</p>
      <div class="ai-tags">${ai.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="usage-bar">
        <span class="usage-bar-label">USO</span>
        <div class="bar-track"><div class="bar-fill" data-width="${ai.pct}"></div></div>
        <span class="bar-pct">${ai.pct}%</span>
      </div>
      <div class="vote-row">
        <button class="vote-btn${userVoted?' voted':''}" data-id="${ai.id}">
          🔥 ${userVoted?'Votado':'Votar favorita'}
        </button>
        <span class="vote-count" id="vc-${ai.id}">${v} voto${v!==1?'s':''}</span>
      </div>
      <p class="card-hint">↗ clique para detalhes</p>`;
    grid.appendChild(card);
    obs.observe(card);
    card.querySelector('.vote-btn').addEventListener('click', e => {
      e.stopPropagation();
      const id = e.currentTarget.dataset.id;
      if (localStorage.getItem('voted_' + id)) return;
      votes[id] = (votes[id] || 0) + 1;
      saveVotes();
      localStorage.setItem('voted_' + id, '1');
      const vc = document.getElementById('vc-' + id);
      if (vc) vc.textContent = votes[id] + ' votos';
      e.currentTarget.classList.add('voted');
      e.currentTarget.innerHTML = '🔥 Votado';
    });
    card.addEventListener('click', () => openModal(ai.id));
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initTheme();
  initNav();
  initModal();
  initCounters();
});
