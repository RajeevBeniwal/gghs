/* ═══════════════════════════════════
   common.js – Shared Utilities
   GGHS Kagdana
═══════════════════════════════════ */

// ── LocalStorage DB wrapper ──
const DB = {
  get(k, fb = null) {
    try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; }
    catch { return fb; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch { return false; }
  },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};

// ── Active nav link ──
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(a => {
    const h = a.getAttribute('href');
    if (h === page || (page === '' && h === 'index.html')) a.classList.add('active');
  });
})();

// ── Hamburger ──
document.addEventListener('DOMContentLoaded', () => {
  const ham = document.getElementById('ham');
  const navList = document.getElementById('navList');
  if (ham && navList) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      navList.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !navList.contains(e.target)) {
        ham.classList.remove('open');
        navList.classList.remove('open');
      }
    });
  }

  // Ticker
  initTicker();
});

// ── Ticker ──
function initTicker() {
  const el = document.getElementById('tickerText');
  if (!el) return;
  const acts = DB.get('activities', []);
  if (!acts.length) {
    el.textContent = '🌟 Welcome to Govt. Girls High School Kagdana · Nathusari Chopta · Sirsa · Haryana — Empowering Every Girl Through Quality Education';
    return;
  }
  el.textContent = acts.slice(0, 8).map(a => `📌 ${a.title}   •   `).join('  ');
}

// ── Grade from percentage ──
function getGrade(pct) {
  pct = Number(pct);
  if (pct >= 91) return 'A1';
  if (pct >= 81) return 'A2';
  if (pct >= 71) return 'B1';
  if (pct >= 61) return 'B2';
  if (pct >= 51) return 'C1';
  if (pct >= 41) return 'C2';
  if (pct >= 33) return 'D';
  return 'E';
}
function gradeClass(g) {
  const map = { A1:'g-a1', A2:'g-a2', B1:'g-b1', B2:'g-b2', C1:'g-c1', C2:'g-c2', D:'g-d', E:'g-e', F:'g-f' };
  return map[g] || 'g-e';
}
function gradeLabel(g) {
  const map = { A1:'Outstanding', A2:'Excellent', B1:'Very Good', B2:'Good', C1:'Average', C2:'Satisfactory', D:'Pass', E:'Needs Improvement', F:'Fail' };
  return map[g] || '';
}

// ── Toast notification ──
let toastTimer;
function toast(msg, type = 'success') {
  let t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:13px 22px;
      border-radius:10px;font-family:Poppins,sans-serif;font-weight:600;font-size:.84rem;
      box-shadow:0 6px 28px rgba(0,0,0,.18);transform:translateY(16px);opacity:0;
      transition:all .28s cubic-bezier(.4,0,.2,1);max-width:360px;line-height:1.4;
      display:flex;align-items:center;gap:10px;`;
    document.body.appendChild(t);
  }
  clearTimeout(toastTimer);
  const styles = {
    success: ['#e8f8ee', '#145a32'],
    danger:  ['#fde8e8', '#7a0f0f'],
    info:    ['#e8f4f8', '#0d4f5c'],
    warning: ['#fef9e7', '#7d6608']
  };
  const icons = { success: '✅', danger: '❌', info: 'ℹ️', warning: '⚠️' };
  const [bg, color] = styles[type] || styles.info;
  t.style.background = bg; t.style.color = color;
  t.style.borderLeft = `4px solid ${color}`;
  t.innerHTML = `<span>${icons[type] || ''}</span> <span>${msg}</span>`;
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
  toastTimer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(16px)'; }, 3200);
}

// ── Confirm delete helper ──
function confirmDel(msg = 'Are you sure you want to delete this?') {
  return confirm(msg);
}

// ── ID generator ──
function genId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

// ── Format date ──
function fmtDate(d, style = 'medium') {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-IN', {
      medium: { day: 'numeric', month: 'short', year: 'numeric' },
      long:   { day: 'numeric', month: 'long',  year: 'numeric' },
      short:  { day: 'numeric', month: 'short' }
    }[style] || { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return d; }
}

// ── Scroll fade-in ──
function initScrollFade() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('page-fade-in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollFade);
