/* o9Tech site behaviour. No dependencies. */
(() => {
  const doc = document;
  const root = doc.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => motionQuery.matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, el = doc) => el.querySelector(s);
  const $$ = (s, el = doc) => Array.from(el.querySelectorAll(s));

  /* Navigation */
  const nav = $('.nav');
  if (nav) {
    const toggle = $('.nav-toggle', nav);
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      doc.body.classList.toggle('menu-open', open);
      toggle?.setAttribute('aria-expanded', String(open));
      toggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle?.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    $$('.nav-links a', nav).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    doc.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle?.focus(); } });
    window.addEventListener('resize', () => { if (window.innerWidth > 960) setOpen(false); });
  }

  /* Stagger delays for grouped reveals */
  $$('[data-stagger]').forEach((group) => {
    const step = parseFloat(group.dataset.stagger) || 0.06;
    $$(':scope > [data-reveal]', group).forEach((el, i) => el.style.setProperty('--d', `${Math.min(i * step, 0.42)}s`));
  });

  /* Scroll reveal */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced()) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* Counters */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const end = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const out = $('.n', el) || el;
    if (reduced()) { out.textContent = end.toFixed(decimals); return; }
    const dur = 1400;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      out.textContent = (end * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  } else counters.forEach(runCounter);

  /* Hero: pointer tilt on the device stage */
  const stage = $('.stage-inner');
  const hero = $('.hero');
  if (stage && hero && finePointer) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      if (reduced()) return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.setProperty('--ry', `${-12 + x * 14}deg`);
        stage.style.setProperty('--rx', `${6 - y * 10}deg`);
      });
    });
    hero.addEventListener('pointerleave', () => { stage.style.removeProperty('--ry'); stage.style.removeProperty('--rx'); });
  }

  /* Hero: constellation canvas */
  const canvas = $('#constellation');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, nodes = [], running = false, visible = true;
    const palette = ['254,241,25', '59,130,246', '244,244,245'];
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (w * h) / 16000));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6, c: palette[i % 7 === 0 ? 0 : i % 5 === 0 ? 1 : 2],
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const max = 140;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < max) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / max) * 0.09})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.fillStyle = `rgba(${n.c},${n.c === palette[2] ? 0.35 : 0.85})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
    };
    const step = () => {
      if (!running) return;
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10) n.x = w + 10; if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10; if (n.y > h + 10) n.y = -10;
      });
      draw();
      requestAnimationFrame(step);
    };
    const start = () => { if (!running && visible && !reduced() && !doc.hidden) { running = true; requestAnimationFrame(step); } };
    const stop = () => { running = false; };
    size(); draw(); start();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { size(); draw(); }, 150); });
    doc.addEventListener('visibilitychange', () => (doc.hidden ? stop() : start()));
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(canvas);
    }
    motionQuery.addEventListener?.('change', () => (reduced() ? stop() : start()));
  }

  /* Marquee pause control */
  $$('.marquee-toggle').forEach((btn) => {
    const m = doc.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', () => {
      const paused = m.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      $('.label', btn).textContent = paused ? 'Play' : 'Pause';
    });
  });

  /* Pointer glow on bento cards */
  if (finePointer) {
    $$('.bento-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* Architecture diagram: draw wires between connected nodes */
  const arch = $('.arch');
  if (arch) {
    const svg = $('.arch-wires', arch);
    const detail = $('.arch-detail', arch.parentElement);
    const defaultDetail = detail?.innerHTML;
    const nodes = $$('.arch-node', arch);
    const byId = Object.fromEntries(nodes.map((n) => [n.dataset.id, n]));
    let edges = [];
    nodes.forEach((n) => (n.dataset.to || '').split(' ').filter(Boolean).forEach((t) => byId[t] && edges.push([n.dataset.id, t])));
    const NS = 'http://www.w3.org/2000/svg';
    const layout = () => {
      const box = arch.getBoundingClientRect();
      [...svg.querySelectorAll('path')].forEach((p) => p.remove());
      edges.forEach(([a, b]) => {
        const ra = byId[a].getBoundingClientRect();
        const rb = byId[b].getBoundingClientRect();
        let d;
        if (rb.left >= ra.right - 1) {
          // target sits to the right: horizontal curve between facing edges
          const x1 = ra.right - box.left, y1 = ra.top + ra.height / 2 - box.top;
          const x2 = rb.left - box.left, y2 = rb.top + rb.height / 2 - box.top;
          const mx = (x1 + x2) / 2;
          d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        } else if (rb.top >= ra.bottom - 1) {
          // target sits below (wrapped or stacked grid): vertical curve
          const x1 = ra.left + ra.width / 2 - box.left, y1 = ra.bottom - box.top;
          const x2 = rb.left + rb.width / 2 - box.left, y2 = rb.top - box.top;
          const my = (y1 + y2) / 2;
          d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
        } else return;
        ['base', 'flow'].forEach((kind) => {
          const p = doc.createElementNS(NS, 'path');
          p.setAttribute('d', d);
          if (kind === 'flow') p.setAttribute('class', 'flow');
          p.dataset.a = a; p.dataset.b = b;
          svg.appendChild(p);
        });
      });
    };
    const connected = (id) => {
      const set = new Set([id]);
      // walk both directions so a hover shows the full path through the system
      let grew = true;
      const down = new Set([id]), up = new Set([id]);
      while (grew) {
        grew = false;
        edges.forEach(([a, b]) => {
          if (down.has(a) && !down.has(b)) { down.add(b); grew = true; }
          if (up.has(b) && !up.has(a)) { up.add(a); grew = true; }
        });
      }
      down.forEach((x) => set.add(x)); up.forEach((x) => set.add(x));
      return set;
    };
    const highlight = (node) => {
      if (!node) {
        nodes.forEach((n) => n.classList.remove('is-hot', 'is-dim'));
        $$('path', svg).forEach((p) => p.classList.remove('is-hot', 'is-dim'));
        if (detail) detail.innerHTML = defaultDetail;
        return;
      }
      const set = connected(node.dataset.id);
      nodes.forEach((n) => { n.classList.toggle('is-hot', set.has(n.dataset.id)); n.classList.toggle('is-dim', !set.has(n.dataset.id)); });
      $$('path', svg).forEach((p) => {
        const on = set.has(p.dataset.a) && set.has(p.dataset.b);
        p.classList.toggle('is-hot', on && !p.classList.contains('flow'));
        p.classList.toggle('is-dim', !on);
      });
      if (detail) detail.innerHTML = `<strong>${node.querySelector('strong').textContent}:</strong> <span>${node.dataset.detail}</span>`;
    };
    nodes.forEach((n) => {
      n.addEventListener('mouseenter', () => highlight(n));
      n.addEventListener('focus', () => highlight(n));
      n.addEventListener('click', () => highlight(n));
    });
    arch.addEventListener('mouseleave', () => highlight(null));
    arch.addEventListener('focusout', (e) => { if (!arch.contains(e.relatedTarget)) highlight(null); });
    layout();
    if ('ResizeObserver' in window) new ResizeObserver(() => layout()).observe(arch);
    window.addEventListener('load', layout);
    doc.fonts?.ready.then(layout);
    arch.addEventListener('transitionend', (e) => { if (e.target === arch) layout(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setTimeout(layout, 900))).observe(arch);
    }
  }

  /* Browser frames: scroll long screenshots on hover */
  const setScroll = (img) => {
    const vp = img.closest('.viewport');
    if (!vp) return;
    const dist = img.offsetHeight - vp.clientHeight;
    img.style.setProperty('--scroll', `${dist > 0 ? -dist : 0}px`);
    img.style.transitionDuration = `${Math.min(Math.max(dist / 220, 2), 9)}s`;
  };
  $$('.device-browser .viewport img').forEach((img) => {
    if (img.complete) setScroll(img); else img.addEventListener('load', () => setScroll(img));
  });
  window.addEventListener('resize', () => $$('.device-browser .viewport img').forEach(setScroll));

  /* Work filter */
  const work = $('[data-work]');
  if (work) {
    const grid = $('.work-grid', work);
    const cards = $$('.case-card', grid);
    const buttons = $$('.filter-btn', work);
    const moreBtn = $('.work-more button', work);
    const empty = $('.work-empty', work);
    const limit = parseInt(work.dataset.limit || '9', 10);
    let filter = 'all';
    let expanded = false;
    const apply = () => {
      let shown = 0;
      let matching = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
        if (match) matching++;
        const show = match && (expanded || matching <= limit);
        card.hidden = !show;
        if (show) shown++;
        card.classList.toggle('is-feature', show && filter === 'all' && card.dataset.feature === 'true');
      });
      if (moreBtn) {
        moreBtn.parentElement.hidden = expanded || matching <= limit;
        $('.n', moreBtn).textContent = matching;
      }
      if (empty) empty.hidden = shown > 0;
    };
    const update = (fn) => {
      if (doc.startViewTransition && !reduced()) doc.startViewTransition(() => { fn(); apply(); });
      else { fn(); apply(); }
    };
    buttons.forEach((b) => b.addEventListener('click', () => {
      update(() => {
        filter = b.dataset.filter;
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      });
      const live = $('.work-live', work);
      if (live) live.textContent = `Showing ${b.textContent.replace(/\d+$/, '').trim()} projects`;
    }));
    moreBtn?.addEventListener('click', () => update(() => { expanded = true; }));
    apply();
  }

  /* Review spotlight */
  const spot = $('[data-spotlight]');
  if (spot) {
    const items = $$('.spotlight-item', spot);
    const prev = $('[data-prev]', spot);
    const next = $('[data-next]', spot);
    const pause = $('[data-pause]', spot);
    const count = $('.spotlight-count', spot);
    const bar = $('.spotlight-progress i', spot);
    const track = $('.spotlight-track', spot);
    let i = 0, timer = 0, t0 = 0, playing = !reduced(), hovering = false;
    const DUR = 8000;
    const show = (n, user) => {
      items[i].hidden = true;
      i = (n + items.length) % items.length;
      items[i].hidden = false;
      items[i].classList.remove('is-entering'); void items[i].offsetWidth; items[i].classList.add('is-entering');
      count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      track.setAttribute('aria-live', user ? 'polite' : 'off');
      t0 = performance.now();
    };
    const loop = (t) => {
      if (playing && !hovering && !doc.hidden) {
        const p = (t - t0) / DUR;
        if (bar) bar.style.width = `${Math.min(p, 1) * 100}%`;
        if (p >= 1) show(i + 1, false);
      } else t0 = t - (parseFloat(bar?.style.width || '0') / 100) * DUR;
      timer = requestAnimationFrame(loop);
    };
    const setPlaying = (v) => {
      playing = v;
      pause.setAttribute('aria-pressed', String(!v));
      pause.setAttribute('aria-label', v ? 'Pause reviews' : 'Play reviews');
      $('.ico-pause', pause).hidden = !v; $('.ico-play', pause).hidden = v;
      if (!v && bar) bar.style.width = '0%';
    };
    prev.addEventListener('click', () => { show(i - 1, true); if (bar) bar.style.width = '0%'; });
    next.addEventListener('click', () => { show(i + 1, true); if (bar) bar.style.width = '0%'; });
    pause.addEventListener('click', () => setPlaying(!playing));
    spot.addEventListener('mouseenter', () => { hovering = true; });
    spot.addEventListener('mouseleave', () => { hovering = false; });
    spot.addEventListener('focusin', () => { hovering = true; });
    spot.addEventListener('focusout', (e) => { if (!spot.contains(e.relatedTarget)) hovering = false; });
    spot.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1, true); }
    });
    setPlaying(playing);
    show(0, false);
    timer = requestAnimationFrame(loop);
  }

  /* Review wall: show all */
  $$('[data-wall-more]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.review-card[hidden]').forEach((c) => { c.hidden = false; c.classList.add('is-in'); });
      btn.parentElement.hidden = true;
    });
  });

  /* Contact form */
  const form = $('[data-contact-form]');
  if (form) {
    const status = $('.form-status', form);
    const submit = $('button[type="submit"]', form);
    const fields = $$('input[required], textarea[required]', form);
    const check = (f) => {
      const err = $(`#${f.id}-err`, form);
      let msg = '';
      if (f.validity.valueMissing) msg = 'Please fill this in.';
      else if (f.validity.typeMismatch) msg = 'Please enter a valid email address.';
      f.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    };
    fields.forEach((f) => f.addEventListener('blur', () => check(f)));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ok = fields.map(check).every(Boolean);
      if (!ok) { fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus(); return; }
      if ($('input[name="_gotcha"]', form)?.value) return;
      submit.disabled = true;
      const label = submit.innerHTML;
      submit.textContent = 'Sending...';
      status.className = 'form-status'; status.textContent = '';
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.classList.add('ok');
        status.textContent = 'Thanks, your message is on its way. We reply within one business day.';
      } catch {
        status.classList.add('bad');
        status.innerHTML = 'Something went wrong. Please email us at <a href="mailto:info@o9tech.com">info@o9tech.com</a>.';
      } finally {
        submit.disabled = false;
        submit.innerHTML = label;
      }
    });
  }

  /* Footer year */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
