/* ═══════════════════════════════════
   layout.js – Injects shared header / footer
   GGHS Kagdana
═══════════════════════════════════ */
(function () {
  // ── TOPBAR ──
  const topbarEl = document.getElementById('siteTopbar');
  if (topbarEl) {
    topbarEl.innerHTML = `
      <div class="topbar-inner">
        <span>📍 Village Kagdana, Tehsil Nathusari Chopta, Sirsa, Haryana – 125110</span>
        <div class="topbar-right">
          <span class="topbar-email">📧 gghs4700kagdana@gmail.com</span>
          <a href="admin.html">🔐 Admin Portal</a>
        </div>
      </div>`;
  }

  // ── HEADER ──
  const headerEl = document.getElementById('siteHeader');
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="header-inner container">
        <div class="hdr-logo">🏫</div>
        <div class="hdr-text">
          <div class="hdr-school">Govt. Girls High School Kagdana</div>
          <div class="hdr-sub">Education Department, Haryana &nbsp;·&nbsp; Sirsa District &nbsp;·&nbsp; Affiliated: HBSE, Bhiwani</div>
          <div class="hdr-sub2">Tehsil Nathusari Chopta, District Sirsa, Haryana – 125110 &nbsp;·&nbsp; gghs4700kagdana@gmail.com</div>
        </div>
        <div class="hdr-badges">
          <span class="hdr-badge">Est. 1985</span>
          <span class="hdr-badge">Class VI – X</span>
          <span class="hdr-badge">Girls Only</span>
        </div>
      </div>`;
  }

  // ── NAVBAR ──
  const navEl = document.getElementById('siteNav');
  if (navEl) {
    navEl.innerHTML = `
      <div class="nav-wrap container">
        <ul class="nav-list" id="navList">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="teachers.html">Teachers</a></li>
          <li><a href="activities.html">Activities</a></li>
          <li><a href="results.html">Results</a></li>
          <li><a href="admin.html" class="nav-cta">Admin Panel</a></li>
        </ul>
        <button class="hamburger" id="ham" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  }

  // ── TICKER ──
  const tickerEl = document.getElementById('siteTicker');
  if (tickerEl) {
    tickerEl.innerHTML = `
      <div class="ticker-inner container">
        <span class="ticker-tag">📢 Latest</span>
        <div class="ticker-track">
          <span class="ticker-text" id="tickerText">Loading…</span>
        </div>
      </div>`;
  }

  // ── FOOTER ──
  const footEl = document.getElementById('siteFooter');
  if (footEl) {
    footEl.innerHTML = `
      <div class="foot-top">
        <div class="container">
          <div class="foot-grid">
            <div class="foot-col">
              <div class="foot-logo">🏫</div>
              <h4>Govt. Girls High School Kagdana</h4>
              <p>Village Kagdana, Tehsil Nathusari Chopta<br>District Sirsa, Haryana – 125110<br><br>
              📧 gghs4700kagdana@gmail.com<br>
              🕐 Mon – Sat: 8:00 AM – 2:00 PM<br>
              📚 Classes VI to X (Girls Only)</p>
            </div>
            <div class="foot-col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About School</a></li>
                <li><a href="teachers.html">Our Teachers</a></li>
                <li><a href="activities.html">Activities</a></li>
                <li><a href="results.html">Student Results</a></li>
                <li><a href="admin.html">Admin Panel</a></li>
              </ul>
            </div>
            <div class="foot-col">
              <h4>School Info</h4>
              <ul>
                <li><a href="about.html">School History</a></li>
                <li><a href="about.html">Vision & Mission</a></li>
                <li><a href="about.html">Facilities</a></li>
                <li><a href="about.html">Admission Info</a></li>
              </ul>
            </div>
            <div class="foot-col">
              <h4>Affiliation</h4>
              <p>Under: Haryana School Education Department<br><br>
              Board: HBSE, Bhiwani<br>
              Block: Nathusari Chopta<br>
              District: Sirsa<br>
              Pin: 125110</p>
            </div>
          </div>
        </div>
      </div>
      <div class="foot-bottom">
        <div class="container">
          © 2024 Govt. Girls High School Kagdana, Sirsa, Haryana &nbsp;|&nbsp; Education Department, Haryana &nbsp;|&nbsp;
          <a href="admin.html">Admin Login</a>
        </div>
      </div>`;
  }
})();
