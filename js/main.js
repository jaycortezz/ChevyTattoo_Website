/* =========================================================
   Cortez's Tattoos — interactions
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Preloader ---------- */
  const preloader = $("#preloader");
  const bar = $(".preloader__bar span");
  let progress = 0;
  const tick = setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 22);
    if (bar) bar.style.width = progress + "%";
    if (progress >= 100) clearInterval(tick);
  }, 130);

  window.addEventListener("load", () => {
    if (bar) bar.style.width = "100%";
    setTimeout(() => {
      preloader && preloader.classList.add("is-done");
      document.body.classList.add("is-loaded");
      playHeroIntro();
    }, 550);
  });
  // Fallback if load fires slowly
  setTimeout(() => {
    if (preloader && !preloader.classList.contains("is-done")) {
      preloader.classList.add("is-done");
      playHeroIntro();
    }
  }, 3500);

  /* ---------- Hero intro ---------- */
  function playHeroIntro() {
    $$(".hero__title .reveal-up").forEach((el, i) => {
      setTimeout(() => { el.style.transition = "transform 1s cubic-bezier(0.16,1,0.3,1)"; el.style.transform = "translateY(0)"; }, i * 130);
    });
  }

  /* ---------- Custom cursor ---------- */
  if (hasFinePointer) {
    const cursor = $(".cursor");
    const dot = $(".cursor-dot");
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("[data-cursor]");
      cursor.classList.remove("is-hover", "is-text");
      if (t) {
        const mode = t.getAttribute("data-cursor");
        if (mode === "hover") cursor.classList.add("is-hover");
        if (mode === "text") cursor.classList.add("is-text");
      }
    });
    document.addEventListener("mouseleave", () => { cursor.style.opacity = 0; dot.style.opacity = 0; });
    document.addEventListener("mouseenter", () => { cursor.style.opacity = 1; dot.style.opacity = 1; });
  }

  /* ---------- Nav scroll state + progress ---------- */
  const nav = $("#nav");
  const progressBar = $("#scrollProgress");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 60);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const toggle = $("#navToggle");
  const navLinks = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.06 + "s";
    io.observe(el);
  });

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      const dur = 1600; const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => cio.observe(c));

  /* ---------- Parallax ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (!reduceMotion && parallaxEls.length) {
    window.addEventListener("scroll", () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.getAttribute("data-parallax"));
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }, { passive: true });
  }

  /* =========================================================
     WORK GALLERY — generated SVG artworks (no external assets)
     ========================================================= */
  const palettes = {
    portrait:  ["#1b1817", "#4a423b", "#c9a24b"],
    lettering: ["#15110f", "#2a211d", "#e7c878"],
    religious: ["#181311", "#3a2420", "#b8302c"],
    fineline:  ["#13110f", "#33302b", "#cfc7b8"],
  };

  const pieces = [
    { title: "La Madre",        cat: "portrait",  size: "tall", motif: "portrait" },
    { title: "Solo Dios",       cat: "lettering", size: "",     motif: "script"   },
    { title: "Sagrado",         cat: "religious", size: "big",  motif: "heart"    },
    { title: "Smoke & Roses",   cat: "fineline",  size: "",     motif: "rose"     },
    { title: "El Pachuco",      cat: "portrait",  size: "",     motif: "portrait" },
    { title: "Mi Vida Loca",    cat: "lettering", size: "wide", motif: "script"   },
    { title: "Manos que Rezan", cat: "religious", size: "tall", motif: "hands"    },
    { title: "Fina Linea",      cat: "fineline",  size: "big",  motif: "rose"     },
    { title: "La Catrina",      cat: "portrait",  size: "",     motif: "skull"    },
    { title: "Recuerdos",       cat: "lettering", size: "",     motif: "script"   },
    { title: "Guadalupe",       cat: "religious", size: "",     motif: "heart"    },
    { title: "Pétalos",         cat: "fineline",  size: "tall", motif: "rose"     },
  ];

  const catLabel = { portrait: "Portrait", lettering: "Lettering", religious: "Religious", fineline: "Fine Line" };

  // Procedural SVG art so the gallery is rich without binary image assets.
  function artSVG(motif, cat, i) {
    const [c1, c2, accent] = palettes[cat];
    const grad = `g${i}`;
    let inner = "";
    if (motif === "rose") {
      inner = `
        <g transform="translate(200,230)" stroke="${accent}" stroke-width="2" fill="none" opacity="0.92">
          <circle r="14" fill="${accent}" opacity="0.25"/>
          ${[20,40,62,86,112].map((r,k)=>`<path d="M0,-${r} C ${r*0.7},-${r} ${r},-${r*0.4} ${r},0 C ${r},${r*0.5} ${r*0.5},${r} 0,${r} C -${r*0.5},${r} -${r},${r*0.5} -${r},0 C -${r},-${r*0.4} -${r*0.7},-${r} 0,-${r} Z" opacity="${0.85-k*0.13}" transform="rotate(${k*18})"/>`).join("")}
          <path d="M0,110 C -12,170 -30,210 -8,260" />
          <path d="M-6,180 C -50,170 -64,140 -78,150 C -60,182 -28,196 -6,196" fill="${accent}" opacity="0.15"/>
        </g>`;
    } else if (motif === "script") {
      inner = `
        <text x="200" y="250" text-anchor="middle" font-family="'Mr Dafoe',cursive" font-size="92" fill="${accent}" opacity="0.96">Cortez</text>
        <text x="200" y="305" text-anchor="middle" font-family="'Anton',sans-serif" letter-spacing="10" font-size="26" fill="${c2}" opacity="0.9">TATTOOS</text>
        <line x1="80" y1="330" x2="320" y2="330" stroke="${accent}" stroke-width="1" opacity="0.5"/>`;
    } else if (motif === "heart") {
      inner = `
        <g transform="translate(200,210)" stroke="${accent}" stroke-width="2.5" fill="none">
          <path d="M0,60 C -70,-10 -60,-90 0,-50 C 60,-90 70,-10 0,60 Z" fill="${accent}" opacity="0.16"/>
          <path d="M0,60 C -70,-10 -60,-90 0,-50 C 60,-90 70,-10 0,60 Z"/>
          ${[...Array(12)].map((_,k)=>`<line x1="0" y1="-95" x2="${Math.cos((k/12)*6.28)*120}" y2="${-95+Math.sin((k/12)*6.28)*120}" opacity="0.35"/>`).join("")}
          <path d="M-50,-20 Q0,-60 50,-20" />
        </g>`;
    } else if (motif === "hands") {
      inner = `
        <g transform="translate(200,250)" stroke="${accent}" stroke-width="2.5" fill="none" opacity="0.9">
          <path d="M-40,120 C -55,40 -40,-60 -18,-110 C -10,-130 -2,-130 0,-100 L 0,30" />
          <path d="M40,120 C 55,40 40,-60 18,-110 C 10,-130 2,-130 0,-100 L 0,30" />
          <path d="M-30,-90 L -30,20 M-12,-110 L -12,20 M12,-110 L 12,20 M30,-90 L 30,20" opacity="0.55"/>
          <ellipse cx="0" cy="-150" rx="34" ry="22" opacity="0.4"/>
        </g>`;
    } else if (motif === "skull") {
      inner = `
        <g transform="translate(200,220)" stroke="${accent}" stroke-width="2.5" fill="none">
          <path d="M0,-90 C 70,-90 90,-30 80,20 C 76,42 60,46 56,70 C 52,92 -52,92 -56,70 C -60,46 -76,42 -80,20 C -90,-30 -70,-90 0,-90 Z" fill="${accent}" opacity="0.1"/>
          <path d="M0,-90 C 70,-90 90,-30 80,20 C 76,42 60,46 56,70 C 52,92 -52,92 -56,70 C -60,46 -76,42 -80,20 C -90,-30 -70,-90 0,-90 Z"/>
          <circle cx="-32" cy="-10" r="20" fill="${accent}" opacity="0.8"/>
          <circle cx="32" cy="-10" r="20" fill="${accent}" opacity="0.8"/>
          <path d="M0,18 l -14,26 l 14,8 l 14,-8 Z" fill="${accent}" opacity="0.6"/>
          <path d="M-40,64 l 8,18 M-20,70 l 5,16 M0,72 l0,16 M20,70 l -5,16 M40,64 l -8,18" />
        </g>`;
    } else { // portrait
      inner = `
        <g transform="translate(200,210)" stroke="${accent}" stroke-width="2" fill="none" opacity="0.9">
          <path d="M-60,80 C -90,-20 -50,-120 0,-120 C 50,-120 90,-20 60,80" fill="${c2}" opacity="0.35"/>
          <path d="M-60,80 C -90,-20 -50,-120 0,-120 C 50,-120 90,-20 60,80"/>
          <circle cx="-26" cy="-20" r="6" fill="${accent}"/>
          <circle cx="26" cy="-20" r="6" fill="${accent}"/>
          <path d="M-30,20 Q0,40 30,20" />
          <path d="M-70,40 C -110,60 -100,160 -40,150 M70,40 C 110,60 100,160 40,150" opacity="0.5"/>
        </g>`;
    }
    return `data:image/svg+xml,` + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 460' preserveAspectRatio='xMidYMid slice'>
        <defs>
          <radialGradient id='${grad}' cx='50%' cy='35%' r='80%'>
            <stop offset='0%' stop-color='${c2}'/>
            <stop offset='100%' stop-color='${c1}'/>
          </radialGradient>
        </defs>
        <rect width='400' height='460' fill='url(#${grad})'/>
        <rect width='400' height='460' fill='none' stroke='${accent}' stroke-opacity='0.15' stroke-width='2'/>
        ${inner}
      </svg>`);
  }

  const grid = $("#workGrid");
  const built = [];
  pieces.forEach((p, i) => {
    const art = artSVG(p.motif, p.cat, i);
    const item = document.createElement("article");
    item.className = "work-item reveal " + (p.size || "");
    item.setAttribute("data-cat", p.cat);
    item.setAttribute("data-cursor", "hover");
    item.setAttribute("data-index", i);
    item.innerHTML = `
      <div class="work-item__art" style="background:url('${art}') center/cover no-repeat"></div>
      <span class="work-item__view">View</span>
      <div class="work-item__overlay">
        <h3 class="work-item__title">${p.title}</h3>
        <span class="work-item__tag">${catLabel[p.cat]}</span>
      </div>`;
    grid.appendChild(item);
    io.observe(item);
    built.push({ ...p, art });
  });

  /* ---------- Filters ---------- */
  const filtersWrap = $("#workFilters");
  filtersWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filtersWrap).forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.getAttribute("data-filter");
    $$(".work-item", grid).forEach((item) => {
      const show = f === "all" || item.getAttribute("data-cat") === f;
      item.classList.toggle("is-hidden", !show);
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbStage = $("#lightboxStage");
  const lbCap = $("#lightboxCaption");
  let current = 0;

  function visibleItems() {
    return $$(".work-item", grid).filter((el) => !el.classList.contains("is-hidden"));
  }
  function openLightbox(index) {
    current = index;
    renderLightbox();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function renderLightbox() {
    const p = built[current];
    lbStage.innerHTML = `<div style="background:url('${p.art}') center/cover no-repeat"></div>`;
    lbCap.innerHTML = `<b>${p.title}</b>${catLabel[p.cat]}`;
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(dir) {
    const vis = visibleItems();
    const idxs = vis.map((el) => parseInt(el.getAttribute("data-index"), 10));
    let pos = idxs.indexOf(current);
    pos = (pos + dir + idxs.length) % idxs.length;
    current = idxs[pos];
    renderLightbox();
  }
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".work-item");
    if (!item) return;
    openLightbox(parseInt(item.getAttribute("data-index"), 10));
  });
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxNext").addEventListener("click", () => step(1));
  $("#lightboxPrev").addEventListener("click", () => step(-1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* =========================================================
     BOOKING FORM — validation + faux submit
     ========================================================= */
  const form = $("#bookingForm");
  const success = $("#bookingSuccess");

  const validators = {
    name:  (v) => v.trim().length >= 2 || "Tell us your name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email.",
    style: (v) => v !== "" || "Pick a style.",
    idea:  (v) => v.trim().length >= 10 || "A little more detail, please.",
  };

  function validateField(field) {
    const name = field.name;
    if (!validators[name]) return true;
    const res = validators[name](field.value);
    const wrap = field.closest(".field");
    const err = $(`.field__error[data-for="${name}"]`);
    if (res === true) {
      wrap && wrap.classList.remove("is-invalid");
      if (err) err.textContent = "";
      return true;
    }
    wrap && wrap.classList.add("is-invalid");
    if (err) err.textContent = res;
    return false;
  }

  ["name", "email", "style", "idea"].forEach((id) => {
    const el = $("#" + id);
    if (el) el.addEventListener("blur", () => validateField(el));
    if (el) el.addEventListener("input", () => {
      const wrap = el.closest(".field");
      if (wrap && wrap.classList.contains("is-invalid")) validateField(el);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    ["name", "email", "style", "idea"].forEach((id) => {
      if (!validateField($("#" + id))) ok = false;
    });
    if (!ok) {
      const firstErr = $(".field.is-invalid");
      firstErr && firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const btn = $("button[type=submit]", form);
    btn.querySelector("span").textContent = "Sending…";
    setTimeout(() => {
      form.querySelectorAll(".field, .btn").forEach((el) => el.style.display = "none");
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 900);
  });

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
