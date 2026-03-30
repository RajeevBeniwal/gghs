/* ═══════════════════════════════════
   common.js  –  Shared Utilities
   GGHS Kagdana
═══════════════════════════════════ */

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
  const nav = document.getElementById('navList');
  if (ham && nav) {
    ham.addEventListener('click', () => { ham.classList.toggle('open'); nav.classList.toggle('open'); });
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !nav.contains(e.target)) {
        ham.classList.remove('open'); nav.classList.remove('open');
      }
    });
  }
});

// ── Grade helpers ──
function getGrade(pct) {
  pct = Number(pct);
  if (pct >= 91) return 'A1'; if (pct >= 81) return 'A2';
  if (pct >= 71) return 'B1'; if (pct >= 61) return 'B2';
  if (pct >= 51) return 'C1'; if (pct >= 41) return 'C2';
  if (pct >= 33) return 'D'; return 'E';
}
function gradeClass(g) {
  return ({ A1:'g-a1', A2:'g-a2', B1:'g-b1', B2:'g-b2', C1:'g-c1', C2:'g-c2', D:'g-d', E:'g-e', F:'g-f' })[g] || 'g-e';
}
function gradeLabel(g) {
  return ({ A1:'Outstanding', A2:'Excellent', B1:'Very Good', B2:'Good', C1:'Average', C2:'Satisfactory', D:'Pass', E:'Needs Improvement' })[g] || '';
}

// ── Format date ──
function fmtDate(d, style) {
  if (!d) return '—';
  const opts = {
    medium: { day:'numeric', month:'short',  year:'numeric' },
    long:   { day:'numeric', month:'long',   year:'numeric' },
    short:  { day:'numeric', month:'short' }
  };
  try { return new Date(d).toLocaleDateString('en-IN', opts[style] || opts.medium); }
  catch { return String(d); }
}

// ── Unique ID ──
function genId(pfx) { pfx = pfx||'id'; return pfx+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,8); }

// ── Ticker (called after DataStore loads) ──
function initTicker() {
  const el = document.getElementById('tickerText');
  if (!el) return;
  const acts = window.DataStore ? DataStore.get('activities') : [];
  if (!acts.length) {
    el.textContent = '🌟 Welcome to Govt. Girls High School Kagdana · Tehsil Nathusari Chopta · Sirsa, Haryana — Empowering Every Girl Through Quality Education';
    return;
  }
  el.textContent = acts.slice(0,8).map(a => '📌 '+a.title+'   •   ').join('  ');
}

// ── Toast ──
var _toastTimer;
function toast(msg, type) {
  type = type||'success';
  var t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div'); t.id = '_toast';
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;padding:13px 22px;border-radius:10px;font-family:Poppins,sans-serif;font-weight:600;font-size:.84rem;box-shadow:0 6px 28px rgba(0,0,0,.18);transform:translateY(16px);opacity:0;transition:all .28s;max-width:360px;line-height:1.4;display:flex;align-items:center;gap:10px;border-left:4px solid;';
    document.body.appendChild(t);
  }
  clearTimeout(_toastTimer);
  var s = { success:['#e8f8ee','#145a32'], danger:['#fde8e8','#7a0f0f'], info:['#e8f4f8','#0d4f5c'], warning:['#fef9e7','#7d6608'] };
  var ic = { success:'✅', danger:'❌', info:'ℹ️', warning:'⚠️' };
  var c = s[type]||s.info;
  t.style.background = c[0]; t.style.color = c[1]; t.style.borderLeftColor = c[1];
  t.innerHTML = '<span>'+(ic[type]||'')+'</span><span>'+msg+'</span>';
  requestAnimationFrame(function(){ t.style.opacity='1'; t.style.transform='translateY(0)'; });
  _toastTimer = setTimeout(function(){ t.style.opacity='0'; t.style.transform='translateY(16px)'; }, 3200);
}

function confirmDel(msg) { return confirm(msg||'Are you sure?'); }
