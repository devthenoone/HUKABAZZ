/* ==========================================================================
   HUKAA BAZZ — Interactions
   ========================================================================== */

(() => {
  'use strict';

  /* ----- LOADER ----- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.classList.add('gone');
      // trigger initial reveals
      document.querySelectorAll('.word.reveal').forEach(w => w.classList.add('revealed'));
      document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }, 1800);
  });

  /* ----- CUSTOM CURSOR ----- */
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (cursor && window.matchMedia('(min-width: 901px)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });
    const tick = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(tick);
    };
    tick();

    // Hover state for interactive elements
    document.querySelectorAll('a, button, .exp-card, .venue-card, .g-item, .blend-row, input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ----- NAV SCROLL STATE ----- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- MOBILE MENU ----- */
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- SCROLL REVEAL ----- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  // Auto-tag elements for reveal
  document.querySelectorAll(
    '.section-head, .story-text, .story-visual, .exp-card, .blend-row, .venue-card, .g-item, .testimonial blockquote, .contact-info, .contact-form, .footer-top'
  ).forEach((el, i) => {
    el.classList.add('reveal-up');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });

  /* ----- HERO PARALLAX ----- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ----- SMOOTH ANCHOR SCROLL (offset for fixed nav) ----- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ----- BACK-TO-TOP BUTTON ----- */
  const fabTop = document.getElementById('fabTop');
  if (fabTop) {
    const toggleFab = () => {
      if (window.scrollY > 600) fabTop.classList.add('show');
      else fabTop.classList.remove('show');
    };
    window.addEventListener('scroll', toggleFab, { passive: true });
    toggleFab();
    fabTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
