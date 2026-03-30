/* ═══════════════════════════════════════════════════════════
   datastore.js  –  GGHS Kagdana Data Layer
   ═══════════════════════════════════════════════════════════

   HOW DATA WORKS (read this carefully):
   ─────────────────────────────────────
   ┌─────────────────────────────────────────────────────────┐
   │  PUBLIC VISITORS (any computer, anywhere)               │
   │    → fetch('./data.json')  from GitHub repo             │
   │    → sees the last data the admin published             │
   ├─────────────────────────────────────────────────────────┤
   │  ADMIN (on their computer)                              │
   │    → loads data.json from GitHub (same as visitors)     │
   │    → makes changes → saved to localStorage              │
   │    → clicks "Publish Data" → downloads data.json        │
   │    → uploads data.json to GitHub repo                   │
   │    → now ALL visitors see the updated data              │
   └─────────────────────────────────────────────────────────┘

   localStorage  = admin's unpublished drafts (local only)
   data.json     = published public data (everyone sees this)
═══════════════════════════════════════════════════════════ */

const DataStore = (() => {
  // In-memory store loaded from data.json
  let _remote = { results: [], teachers: [], activities: [] };
  // Admin's local overrides (from localStorage)
  let _local  = null;
  let _loaded = false;
  let _source = 'none'; // 'remote' | 'local' | 'none'

  // ── raw localStorage helpers ──
  const LS = {
    get(k, fb = null) {
      try { const v = localStorage.getItem('gghs_' + k); return v !== null ? JSON.parse(v) : fb; }
      catch { return fb; }
    },
    set(k, v) {
      try { localStorage.setItem('gghs_' + k, JSON.stringify(v)); return true; }
      catch { return false; }
    }
  };

  // ── Load data.json from the server (GitHub Pages) ──
  async function load() {
    if (_loaded) return;

    // First check if admin has local unpublished data
    const localData = LS.get('adminData', null);
    const adminActive = LS.get('adminMode', false);

    try {
      // Try fetching data.json (works on GitHub Pages and any web server)
      // Add cache-bust only if admin is logged in (to avoid stale data for admin)
      const url = adminActive
        ? './data.json?v=' + Date.now()
        : './data.json';

      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();

      _remote = {
        results:    Array.isArray(json.results)    ? json.results    : [],
        teachers:   Array.isArray(json.teachers)   ? json.teachers   : [],
        activities: Array.isArray(json.activities) ? json.activities : []
      };
      _source = 'remote';

      // If admin has local changes that are NEWER than remote, prefer local
      if (adminActive && localData && localData._savedAt) {
        const remoteDate = json._lastUpdated ? new Date(json._lastUpdated) : new Date(0);
        const localDate  = new Date(localData._savedAt);
        if (localDate > remoteDate) {
          _local = localData;
          _source = 'local';
          console.info('DataStore: using local admin data (newer than remote)');
        }
      }

    } catch (err) {
      // data.json not found or fetch failed → fall back to localStorage
      // This is normal during local file:// development
      console.warn('DataStore: could not fetch data.json (' + err.message + '). Using localStorage fallback.');
      _remote = {
        results:    LS.get('results',    []),
        teachers:   LS.get('teachers',   []),
        activities: LS.get('activities', [])
      };
      _source = 'local-fallback';
    }

    _loaded = true;
  }

  // ── Get data (admin local overrides remote) ──
  function get(key) {
    if (_local && Array.isArray(_local[key])) return _local[key];
    return _remote[key] || [];
  }

  // ── Set data (admin only – writes to localStorage) ──
  function set(key, val) {
    // Always update in-memory remote so UI refreshes immediately
    _remote[key] = val;

    // Persist to localStorage
    LS.set(key, val);

    // Also keep the admin's full local snapshot for publish
    const snap = {
      results:    _remote.results    || [],
      teachers:   _remote.teachers   || [],
      activities: _remote.activities || [],
      _savedAt:   new Date().toISOString()
    };
    LS.set('adminData', snap);
    _local = null; // clear override, use _remote directly
  }

  // ── Delete one record ──
  function del(key, id) {
    const arr = get(key).filter(r => r.id !== id);
    set(key, arr);
  }

  // ── Generate downloadable data.json (the "Publish" action) ──
  function generatePublishJSON() {
    const payload = {
      results:      _remote.results    || [],
      teachers:     _remote.teachers   || [],
      activities:   _remote.activities || [],
      _lastUpdated: new Date().toISOString(),
      _info:        'Published data for GGHS Kagdana website. Upload this file to the GitHub repo root.'
    };
    return JSON.stringify(payload, null, 2);
  }

  // ── Download data.json to disk ──
  function publishData() {
    const json = generatePublishJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ── Export full backup (for safety) ──
  function exportBackup() {
    const json = generatePublishJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'gghs_backup_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ── Import data from JSON file (restore) ──
  function importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const d = JSON.parse(e.target.result);
          if (d.results)    set('results',    d.results);
          if (d.teachers)   set('teachers',   d.teachers);
          if (d.activities) set('activities', d.activities);
          resolve(d);
        } catch (err) { reject(err); }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // ── Info ──
  function info() {
    return {
      source:  _source,
      loaded:  _loaded,
      results: get('results').length,
      teachers: get('teachers').length,
      activities: get('activities').length
    };
  }

  return { load, get, set, del, publishData, exportBackup, importFromFile, info };
})();

// Make available globally
window.DataStore = DataStore;
