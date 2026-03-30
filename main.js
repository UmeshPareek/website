/* =============================================
   WENDZ — main.js
   All animations, interactions, scroll magic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── PRELOADER ────────────────────────────────
  const preloader = document.getElementById('preloader');
  const barFill   = document.querySelector('.preloader-bar-fill');

  if (preloader && barFill) {
    // Start fill animation
    requestAnimationFrame(() => { barFill.style.width = '100%'; });

    // Hide preloader after load
    const dismiss = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
      }, 900);
    };

    setTimeout(dismiss, 2200);
    document.body.style.overflow = 'hidden';
  }

  // ── CUSTOM CURSOR ────────────────────────────
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    const lerpRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(lerpRing);
    };
    lerpRing();

    // Hover states
    const hoverEls = document.querySelectorAll('a, button, [data-cursor="hover"]');
    const textEls  = document.querySelectorAll('h1, h2, h3, p, blockquote');

    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    textEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-text'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  // ── SCROLL PROGRESS BAR ──────────────────────
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = ((scrolled / total) * 100) + '%';
    }, { passive: true });
  }

  // ── NAV SCROLL BEHAVIOR ───────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── HAMBURGER MOBILE MENU ────────────────────
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── SCROLL REVEAL (IntersectionObserver) ─────
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .features-line'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────
  const counters = document.querySelectorAll('[data-count]');

  const formatNumber = (val, suffix) => {
    if (suffix) return val.toLocaleString() + suffix;
    return val.toLocaleString();
  };

  const animateCounter = (el) => {
    const target  = parseFloat(el.dataset.count);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const duration = 2000;
    const start    = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * target);
      el.textContent = prefix + formatNumber(current, suffix);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + formatNumber(target, suffix);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ── TEXT SCRAMBLE EFFECT ──────────────────────
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#█░▒';
      this.queue = [];
      this.frame = 0;
      this.frameRequest = null;
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const old = this.el.innerText;
      const len = Math.max(old.length, newText.length);
      const promise = new Promise(res => this.resolve = res);
      this.queue = [];
      for (let i = 0; i < len; i++) {
        const from  = old[i] || '';
        const to    = newText[i] || '';
        const start = Math.floor(Math.random() * 16);
        const end   = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0; i < this.queue.length; i++) {
        const { from, to, start, end } = this.queue[i];
        let char = this.queue[i].char;
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            this.queue[i].char = this.chars[Math.floor(Math.random() * this.chars.length)];
          }
          output += `<span style="opacity:0.5;color:var(--primary)">${this.queue[i].char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  // Apply scramble to elements with [data-scramble]
  document.querySelectorAll('[data-scramble]').forEach(el => {
    const original = el.textContent.trim();
    const fx = new TextScramble(el);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          fx.setText(original);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // ── PARALLAX ON SCROLL ────────────────────────
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.3;
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - center) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

  // ── HOVER TILT ON CARDS ───────────────────────
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    });
    card.style.transition = 'transform 0.5s ease';
  });

  // ── SMOOTH ANCHOR SCROLL ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── SPLIT TEXT LINE ANIMATION (Hero lines already handled by CSS,
  //    this adds extra flair for section headings with [data-split]) ──
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.textContent.split(' ');
    el.innerHTML = words.map((w, i) =>
      `<span style="display:inline-block;overflow:hidden;"><span style="display:inline-block;animation:lineReveal 0.9s cubic-bezier(0.19,1,0.22,1) ${i * 0.06 + 0.1}s both">${w}</span></span>`
    ).join(' ');
  });

  // ── MOUSE-FOLLOW GLOW ─────────────────────────
  const heroGlow = document.querySelector('.hero-bg-glow');
  if (heroGlow) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth)  * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      heroGlow.style.left = x + '%';
      heroGlow.style.top  = y + '%';
      heroGlow.style.transform = 'translate(-50%, -50%)';
    });
  }

  // ── NAV ACTIVE STATE ──────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  console.log('%cWENDZ.', 'font-size:2rem;font-weight:900;color:#003ec7;font-family:sans-serif;');
  console.log('%cNot another boring screen.', 'color:#434656;font-size:0.75rem;letter-spacing:0.2em;');
});
