(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const format = new Intl.NumberFormat(document.documentElement.lang, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const countUp = (el) => {
    const target = Number.parseFloat(el.dataset.count);
    if (reduceMotion) {
      el.textContent = format.format(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format.format(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observe = (elements, onEnter, options, once = true) => {
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => onEnter(el, true));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        onEnter(entry.target, entry.isIntersecting);
        if (once && entry.isIntersecting) observer.unobserve(entry.target);
      });
    }, options);
    elements.forEach((el) => observer.observe(el));
  };

  observe(
    document.querySelectorAll('[data-reveal]'),
    (el, visible) => {
      if (!visible) return;
      el.classList.add('is-visible');
      el.querySelectorAll('[data-count]').forEach(countUp);
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  observe(
    document.querySelectorAll('.hero, .motto'),
    (el, visible) => el.classList.toggle('in-view', visible),
    { threshold: 0 },
    false,
  );

  const tour = document.querySelector('[data-tour]');
  if (tour) {
    const steps = [...tour.querySelectorAll('.tour-step')];
    const screens = [...tour.querySelectorAll('.tour-screen')];
    const activate = (index) => {
      steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
      screens.forEach((screen, i) => {
        const active = i === index;
        if (active && !screen.classList.contains('is-active')) {
          screen.querySelectorAll('[data-count]').forEach(countUp);
        }
        screen.classList.toggle('is-active', active);
      });
      steps[index]?.querySelectorAll('.tour-inline [data-count]').forEach(countUp);
    };
    activate(0);
    observe(
      steps,
      (el, visible) => {
        if (visible) activate(steps.indexOf(el));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      false,
    );
  }

  const scrubbers = [...document.querySelectorAll('[data-scrub]')];
  if (!reduceMotion && scrubbers.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const clamp = (value) => Math.min(Math.max(value, 0), 1).toFixed(3);
      scrubbers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--p', clamp((vh * 0.9 - rect.top) / (vh * 0.65)));
        el.style.setProperty('--q', clamp((vh - rect.top) / (vh + rect.height)));
      });
    };
    const request = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  }

  const floatArea = document.querySelector('[data-float]');
  if (floatArea && finePointer && !reduceMotion) {
    floatArea.addEventListener('pointermove', (event) => {
      const rect = floatArea.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      floatArea.style.setProperty('--mx', x.toFixed(3));
      floatArea.style.setProperty('--my', y.toFixed(3));
    });
    floatArea.addEventListener('pointerleave', () => {
      floatArea.style.setProperty('--mx', '0');
      floatArea.style.setProperty('--my', '0');
    });
  }

  const header = document.querySelector('header.site');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
