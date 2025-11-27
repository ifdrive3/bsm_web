// script.js — Fully optimized BroadsomeMedia behavior engine
(() => {
  const $ = sel => document.querySelector(sel);

  /* ================== THEME CONTROL ================== */
  const themeToggle = $('.theme-toggle');
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('bm_theme');
  const setTheme = theme => {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('bm_theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  setTheme(storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeToggle && themeToggle.addEventListener('click', () => setTheme(root.classList.contains('dark') ? 'light' : 'dark'));

  /* ================== MOBILE MENU ================== */
  const menuToggle = $('.menu-toggle');
  const nav = $('.nav');
  menuToggle && nav && menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('show'));
  });

  /* ================== UPDATE YEAR ================== */
  const yearEl = $('#year');
  yearEl && (yearEl.textContent = new Date().getFullYear());

  /* ================== CONSENT BAR ================== */
  const consentBar = $('#consentBar');
  const accept = $('#acceptCookies');
  const reject = $('#rejectCookies');
  const consentKey = 'bm_consent';

  const hideConsentBar = () => {
    if (consentBar) {
      consentBar.classList.add('hidden');
      setTimeout(() => consentBar.style.display = 'none', 400);
    }
  };

  const existingConsent = localStorage.getItem(consentKey);
  if (existingConsent) {
    hideConsentBar();
    if (existingConsent === 'accepted') loadAllTrackers();
  } else {
    if (consentBar) consentBar.style.display = 'flex';
  }

  accept && accept.addEventListener('click', () => {
    localStorage.setItem(consentKey, 'accepted');
    hideConsentBar();
    loadAllTrackers();
  });

  reject && reject.addEventListener('click', () => {
    localStorage.setItem(consentKey, 'rejected');
    hideConsentBar();
  });

  /* ================== LOAD TRACKERS ================== */
  function injectScript(src) {
    if (!src) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }

  function loadAllTrackers() {
    injectScript('https://cloud.umami.is/p/pm0FrEkw0'); // Umami
    injectScript('https://www.googletagmanager.com/gtag/js?id=G-B14EYCLETX'); // GA
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-B14EYCLETX');
  }

  /* ================== CTA BUTTON LINKS ================== */
  const ctas = [
    { selector: '#ignite-cta', url: 'https://tally.so/r/lbbGGB' },
    { selector: '#surge-cta', url: 'https://tally.so/r/WOOWLa' },
    { selector: '#scheduleBtn', url: 'https://cal.com/broadsomedia/secret' }
  ];
  ctas.forEach(item => {
    const el = $(item.selector);
    el && el.addEventListener('click', e => { e.preventDefault(); window.open(item.url, '_blank'); });
  });

  /* ================== SMALL ENHANCEMENTS ================== */
  document.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));
  document.addEventListener('keydown', e => { if(e.key === 'Tab') document.body.classList.remove('using-mouse'); });
})();
