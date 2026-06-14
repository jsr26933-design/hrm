/* ═══════════════════════════════════════════
   WorkPilot HR — Shared Components
════════════════════════════════════════════ */

/* Inject Navbar */
function injectNav(activePage) {
  const pages = [
    { href: 'features.html',     label: 'Features' },
    { href: 'modules.html',      label: 'Modules' },
    { href: 'pricing.html',      label: 'Pricing' },
    { href: 'industries.html',   label: 'Industries' },
    { href: 'testimonials.html', label: 'Reviews' },
    { href: 'contact.html',      label: 'Contact' }
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a></li>`
  ).join('');
  const mLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="wp-nav" id="wp-nav">
      <div class="wp-nav-inner">
        <a href="index-home.html" class="wp-logo">
          <img src="assets/logo.svg" alt="WorkPilot HR"/>
        </a>
        <ul class="wp-nav-links">${links}</ul>
        <div class="wp-nav-actions">
          <a href="index.html" class="wp-btn-login">Login</a>
          <a href="contact.html" class="wp-btn-trial">Free Trial</a>
        </div>
        <button class="wp-hamburger" id="wp-ham" onclick="toggleWPNav()">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="wp-mobile-nav" id="wp-mobile">
        ${mLinks}
        <a href="index.html" class="wp-btn-login" style="margin:4px 0">Login</a>
        <a href="contact.html" class="wp-btn-trial">Free Trial →</a>
      </div>
    </nav>
  `);

  window.addEventListener('scroll', () => {
    document.getElementById('wp-nav').classList.toggle('scrolled', window.scrollY > 50);
  });
}

function toggleWPNav() {
  document.getElementById('wp-mobile').classList.toggle('open');
  document.getElementById('wp-ham').classList.toggle('open');
}

/* Inject Footer */
function injectFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="wp-footer">
      <div class="wp-foot-grid">
        <div>
          <a href="index-home.html" class="wp-logo wp-logo-sm" style="margin-bottom:12px;display:inline-flex">
            <img src="assets/logo-white.svg" alt="WorkPilot HR"/>
          </a>
          <p class="wp-foot-desc">Smart HR. Simplified Workforce Management.<br/>India's most comprehensive cloud HRMS for SMEs and enterprises.</p>
          <div class="wp-foot-socials">
            <a href="#" class="wp-fsoc">in</a>
            <a href="#" class="wp-fsoc">𝕏</a>
            <a href="#" class="wp-fsoc">yt</a>
          </div>
        </div>
        <div class="wp-foot-col">
          <h5>Product</h5>
          <a href="features.html">Features</a>
          <a href="modules.html">Modules</a>
          <a href="pricing.html">Pricing</a>
          <a href="#">Integrations</a>
          <a href="#">Security</a>
          <a href="#">Roadmap</a>
        </div>
        <div class="wp-foot-col">
          <h5>Company</h5>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Press Kit</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="wp-foot-col">
          <h5>Resources</h5>
          <a href="#">Documentation</a>
          <a href="#">Help Center</a>
          <a href="#">Tutorials</a>
          <a href="#">API Reference</a>
          <a href="#">Webinars</a>
        </div>
        <div class="wp-foot-col">
          <h5>Legal</h5>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">GDPR</a>
          <a href="#">Cookie Policy</a>
          <a href="#">SLA</a>
        </div>
      </div>
      <div class="wp-foot-bottom">
        <span>© 2025 WorkPilot HR. All rights reserved. Made in India 🇮🇳</span>
        <div class="wp-foot-badges">
          <span>ISO 27001</span><span>GDPR Ready</span><span>SSL Secured</span><span>99.9% Uptime</span>
        </div>
      </div>
    </footer>
  `);
}

/* Scroll reveal */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
    obs.observe(el);
  });
}

/* Animated counter */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString('en-IN');
        if (cur >= target) clearInterval(t);
      }, 22);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* Smooth scroll for anchors */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* Init all on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initSmoothScroll();
});
