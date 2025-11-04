/* services.js
   Navigation, particles, and scroll reveal (IntersectionObserver).
   Keep files names consistent and place this script at the end of the body.
*/

const $ = (s, el = document) => (el || document).querySelector(s);
const $$ = (s, el = document) => Array.from((el || document).querySelectorAll(s));

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Drawer ---
  const hamburger = $('#hamburger');
  const navDrawer = $('#navDrawer');
  const overlay = $('#overlay');
  const closeDrawer = $('#closeDrawer');

  const openDrawer = () => {
    navDrawer.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
  };
  const closeDrawerFn = () => {
    navDrawer.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
  };

  hamburger?.addEventListener('click', () => {
    if (navDrawer.classList.contains('open')) closeDrawerFn();
    else openDrawer();
  });
  closeDrawer?.addEventListener('click', closeDrawerFn);
  overlay?.addEventListener('click', closeDrawerFn);

  // close drawer on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawerFn();
  });

  // --- Particles (optimized) ---
  (function particles() {
    const holder = document.getElementById('particles');
    if (!holder) return;
    const c = document.createElement('canvas');
    holder.appendChild(c);
    const ctx = c.getContext('2d');
    let dots = [];
    const deviceRatio = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      c.width = innerWidth * deviceRatio;
      c.height = innerHeight * deviceRatio;
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      initDots();
    }
    function initDots() {
      const area = innerWidth * innerHeight;
      const density = Math.min(160, Math.max(40, Math.floor(area / 18000)));
      dots = Array.from({ length: density }).map(() => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: (Math.random() * 1.6 + 0.6) * deviceRatio,
        vx: (Math.random() * 0.6 - 0.3) * deviceRatio,
        vy: (Math.random() * 0.6 - 0.3) * deviceRatio,
        a: 0.35 + Math.random() * 0.7
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > c.width) d.vx *= -1;
        if (d.y < 0 || d.y > c.height) d.vy *= -1;
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
        g.addColorStop(0, `rgba(168,85,247,${0.45 * d.a})`);
        g.addColorStop(1, `rgba(253,183,26,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    addEventListener('resize', () => {
      // throttle resize
      clearTimeout(window._particles_resize);
      window._particles_resize = setTimeout(resize, 120);
    });

    resize();
    draw();
  })();

  // --- Scroll Reveal using IntersectionObserver ---
  (function revealObserver() {
    const items = $$('.reveal');
    if (!items.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // optional: unobserve to avoid repeated triggers
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.09 });

    items.forEach((el, i) => {
      // add slight progressive delays for a nicer cascade
      el.style.transitionDelay = (i * 40) + 'ms';
      io.observe(el);
    });
  })();

  // --- small accessibility tweak: focus trap for nav drawer (basic) ---
  (function a11yDrawer() {
    if (!$('#navDrawer')) return;
    const focusableSelector = 'a, button, input, textarea, [tabindex]:not([tabindex="-1"])';
    let first, last;
    const observer = new MutationObserver(() => {
      const focusables = $('#navDrawer').querySelectorAll(focusableSelector);
      first = focusables[0];
      last = focusables[focusables.length - 1];
    });
    observer.observe($('#navDrawer'), { childList: true, subtree: true });
    document.addEventListener('keydown', (e) => {
      if (!navDrawer.classList.contains('open')) return;
      if (e.key === 'Tab') {
        const active = document.activeElement;
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
    });
  })();
});