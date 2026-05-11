const pages = [
  { group: "Storia", title: "Il Fascismo italiano", meta: "1919 — 1939", path: "Sto-Ita/storia/01-fascismo-italiano.md" },
  { group: "Storia", title: "Nazismo", meta: "1919 — 1945", path: "Sto-Ita/storia/02-nazismo.md" },
  { group: "Storia", title: "Rivoluzione russa e stalinismo", path: "Sto-Ita/storia/03-rivoluzione-russa-stalinismo.md" },
  { group: "Storia", title: "La crisi del 1929", path: "Sto-Ita/storia/04-crisi-1929.md" },
  { group: "Storia", title: "Verso la Seconda guerra mondiale", path: "Sto-Ita/storia/05-verso-wwii-e-guerra.md" },
  { group: "Storia", title: "Resistenza e liberazione", path: "Sto-Ita/storia/06-resistenza-e-liberazione.md" },
  { group: "Storia", title: "Europa unita", path: "Sto-Ita/storia/07-europa-unita.md" },
  { group: "Storia", title: "Le donne nella Grande Guerra", path: "Sto-Ita/storia/08-donne-grande-guerra.md" },
  { group: "Italiano · Autori", title: "Giovanni Verga", path: "Sto-Ita/italiano/autori/01-giovanni-verga.md" },
  { group: "Italiano · Autori", title: "Giovanni Pascoli", path: "Sto-Ita/italiano/autori/02-giovanni-pascoli.md" },
  { group: "Italiano · Autori", title: "Gabriele D'Annunzio", path: "Sto-Ita/italiano/autori/03-gabriele-dannunzio.md" },
  { group: "Italiano · Autori", title: "Italo Svevo", path: "Sto-Ita/italiano/autori/04-italo-svevo.md" },
  { group: "Italiano · Autori", title: "Luigi Pirandello", path: "Sto-Ita/italiano/autori/05-luigi-pirandello.md" },
  { group: "Italiano · Autori", title: "Giuseppe Ungaretti", path: "Sto-Ita/italiano/autori/06-giuseppe-ungaretti.md" },
  { group: "Italiano · Autori", title: "Eugenio Montale", path: "Sto-Ita/italiano/autori/07-eugenio-montale.md" },
  { group: "Italiano · Autori", title: "Italo Calvino", path: "Sto-Ita/italiano/autori/08-italo-calvino.md" },
  { group: "Italiano · Autori", title: "Beppe Fenoglio", path: "Sto-Ita/italiano/autori/09-beppe-fenoglio.md" },
  { group: "Italiano · Autori", title: "Primo Levi", path: "Sto-Ita/italiano/autori/10-primo-levi.md" },
  { group: "Italiano · Libri", title: "Il Gattopardo", sub: "Tomasi di Lampedusa", path: "Sto-Ita/italiano/libri/01-il-gattopardo.md" },
  { group: "Italiano · Libri", title: "Il ritratto di Dorian Gray", sub: "Wilde", path: "Sto-Ita/italiano/libri/02-il-ritratto-di-dorian-gray.md" },
  { group: "Italiano · Libri", title: "A rebours", sub: "Huysmans", path: "Sto-Ita/italiano/libri/03-a-rebours.md" },
  { group: "Italiano · Libri", title: "Madame Bovary", sub: "Flaubert", path: "Sto-Ita/italiano/libri/04-madame-bovary.md" },
  { group: "Italiano · Libri", title: "L'Ammazzatoio", sub: "Zola", path: "Sto-Ita/italiano/libri/05-l-ammazzatoio.md" },
  { group: "Italiano · Libri", title: "Germinie Lacerteux", sub: "Goncourt", path: "Sto-Ita/italiano/libri/06-germinie-lacerteux.md" },
  { group: "Italiano · Libri", title: "Il Marchese di Roccaverdina", sub: "Capuana", path: "Sto-Ita/italiano/libri/07-il-marchese-di-roccaverdina.md" },
  { group: "Italiano · Libri", title: "Niente di nuovo sul fronte occidentale", sub: "Remarque", path: "Sto-Ita/italiano/libri/08-niente-di-nuovo-sul-fronte-occidentale.md" },
  { group: "Italiano · Libri", title: "Come il vento cucito alla terra", sub: "Tuti", path: "Sto-Ita/italiano/libri/09-come-il-vento-cucito-alla-terra.md" },
  { group: "Italiano · Libri", title: "La banda di via Panisperna", sub: "Colangelo/Temporelli", path: "Sto-Ita/italiano/libri/10-la-banda-di-via-panisperna.md" },
  { group: "Italiano · Movimenti", title: "Positivismo, Naturalismo e Verismo", path: "Sto-Ita/italiano/movimenti/01-positivismo-naturalismo-verismo.md" },
  { group: "Italiano · Movimenti", title: "Decadentismo, Simbolismo ed Estetismo", path: "Sto-Ita/italiano/movimenti/02-decadentismo-simbolismo-estetismo.md" },
  { group: "Italiano · Movimenti", title: "Avanguardie, Futurismo e Crepuscolarismo", path: "Sto-Ita/italiano/movimenti/03-avanguardie-futurismo-crepuscolarismo.md" },
  { group: "Italiano · Movimenti", title: "Romanzo della crisi", path: "Sto-Ita/italiano/movimenti/04-romanzo-della-crisi.md" },
  { group: "Italiano · Movimenti", title: "Ermetismo", path: "Sto-Ita/italiano/movimenti/05-ermetismo.md" },
  { group: "Italiano · Movimenti", title: "Neorealismo", path: "Sto-Ita/italiano/movimenti/06-neorealismo.md" },
  { group: "Italiano · Movimenti", title: "Linea antinovecentista", path: "Sto-Ita/italiano/movimenti/07-linea-antinovecentista.md" },
  { group: "Italiano", title: "Checklist italiano", path: "Sto-Ita/italiano/Checklist-Ita.md" },
  { group: "Educazione civica", title: "L'Unione Europea", path: "Educazione civica/Europa.md" },
  { group: "Educazione civica", title: "Il Manifesto di Ventotene", sub: "Spinelli, Rossi", path: "Educazione civica/Manifesto-di-Ventotene.md" },
  { group: "Educazione civica", title: "Mika — Cento giorni in Europa", path: "Educazione civica/Mika-Cento-giorni-Europa.md" },
];

/* ========== DOM refs ========== */
const navigation = document.getElementById("navigation");
const content = document.getElementById("content");
const crumbs = document.getElementById("crumbs");
const titleEl = document.getElementById("title");
const metaEl = document.getElementById("meta");
const tocEl = document.getElementById("toc");
const searchInput = document.getElementById("q");
const searchClear = document.getElementById("q-clear");

/* ========== Utils ========== */
function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function groupKey(group) {
  return slugify(group);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCurrentSlug() {
  return window.location.hash.replace(/^#\/?/, "") || slugify(pages[0].title);
}

/* ========== Markdown renderer (extended from original) ========== */
function renderInline(value) {
  let html = escapeHtml(value);
  const codeStore = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const token = `@@CODE${codeStore.length}@@`;
    codeStore.push(`<code>${code}</code>`);
    return token;
  });
  html = html
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  codeStore.forEach((code, i) => {
    html = html.replace(`@@CODE${i}@@`, code);
  });
  return html;
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}
function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}
function renderTable(lines, start) {
  const headers = splitTableRow(lines[start]);
  let i = start + 2;
  const rows = [];
  while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
    rows.push(splitTableRow(lines[i]));
    i += 1;
  }
  const head = headers.map((c) => `<th>${renderInline(c)}</th>`).join("");
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`).join("");
  return { html: `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`, next: i };
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let paragraph = [];
  let list = null;
  let inCode = false;
  let codeLines = [];

  const closeP = () => {
    if (!paragraph.length) return;
    out.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const closeL = () => {
    if (!list) return;
    out.push(`</${list}>`);
    list = null;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        out.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        closeP();
        closeL();
        inCode = true;
      }
      i += 1;
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      i += 1;
      continue;
    }
    if (!trimmed) {
      closeP();
      closeL();
      i += 1;
      continue;
    }
    if (i + 1 < lines.length && line.includes("|") && isTableSeparator(lines[i + 1])) {
      closeP();
      closeL();
      const t = renderTable(lines, i);
      out.push(t.html);
      i = t.next;
      continue;
    }
    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeP();
      closeL();
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      closeP();
      closeL();
      out.push("<hr>");
      i += 1;
      continue;
    }
    const ul = trimmed.match(/^[-*]\s+(.*)$/);
    const ol = trimmed.match(/^\d+\.\s+(.*)$/);
    if (ul || ol) {
      closeP();
      const next = ul ? "ul" : "ol";
      if (list !== next) {
        closeL();
        list = next;
        out.push(`<${list}>`);
      }
      out.push(`<li>${renderInline((ul || ol)[1])}</li>`);
      i += 1;
      continue;
    }
    if (trimmed.startsWith(">")) {
      closeP();
      closeL();
      out.push(`<blockquote>${renderInline(trimmed.replace(/^>\s?/, ""))}</blockquote>`);
      i += 1;
      continue;
    }
    paragraph.push(trimmed);
    i += 1;
  }
  closeP();
  closeL();
  return out.join("\n");
}

/* ========== Navigation (sidebar) ========== */
function groupPages(items) {
  return items.reduce((map, p) => {
    if (!map.has(p.group)) map.set(p.group, []);
    map.get(p.group).push(p);
    return map;
  }, new Map());
}

function renderNavigation() {
  const current = getCurrentSlug();
  const groups = groupPages(pages);
  const collapsed = JSON.parse(localStorage.getItem("appunti-collapsed") || "{}");

  navigation.innerHTML = [...groups]
    .map(([group, items]) => {
      const key = groupKey(group);
      const isCollapsed = !!collapsed[key];
      const links = items
        .map((p) => {
          const slug = slugify(p.title);
          const active = slug === current ? " active" : "";
          const sub = p.sub ? `<small>${escapeHtml(p.sub)}</small>` : p.meta ? `<small>${escapeHtml(p.meta)}</small>` : "";
          return `<a href="#/${slug}" data-page="${slug}" data-title="${escapeHtml(p.title)}"${active ? ' class="active"' : ""}>${escapeHtml(p.title)}${sub}</a>`;
        })
        .join("");
      return `
        <div class="nav-section${isCollapsed ? " collapsed" : ""}" data-key="${key}">
          <button class="nav-label" type="button" aria-expanded="${!isCollapsed}">
            ${escapeHtml(group)}
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="nav-items">${links}</div>
        </div>`;
    })
    .join("");

  wireCollapsibles();
  applySearchFilter();
}

function wireCollapsibles() {
  const sections = navigation.querySelectorAll(".nav-section[data-key]");
  sections.forEach((sec) => {
    const label = sec.querySelector(".nav-label");
    label.addEventListener("click", () => {
      const isCollapsed = sec.classList.toggle("collapsed");
      label.setAttribute("aria-expanded", String(!isCollapsed));
      const stored = JSON.parse(localStorage.getItem("appunti-collapsed") || "{}");
      stored[sec.dataset.key] = isCollapsed;
      localStorage.setItem("appunti-collapsed", JSON.stringify(stored));
    });
  });
}

/* ========== Search filter (with highlight) ========== */
function applySearchFilter() {
  const q = (searchInput.value || "").trim().toLowerCase();
  const wrap = searchInput.parentElement;
  wrap.classList.toggle("has-text", q.length > 0);

  const links = navigation.querySelectorAll("a[data-page]");
  const sections = navigation.querySelectorAll(".nav-section[data-key]");

  if (!q) {
    links.forEach((a) => {
      a.classList.remove("hidden");
      if (a.dataset.original) {
        a.innerHTML = a.dataset.original;
        delete a.dataset.original;
      }
    });
    sections.forEach((s) => s.classList.remove("empty"));
    return;
  }

  const rx = new RegExp(escapeRegex(q), "gi");
  links.forEach((a) => {
    if (!a.dataset.original) a.dataset.original = a.innerHTML;
    const match = a.textContent.toLowerCase().includes(q);
    a.classList.toggle("hidden", !match);
    a.innerHTML = a.dataset.original;
    if (match) {
      const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null);
      const targets = [];
      let n;
      while ((n = walker.nextNode())) {
        rx.lastIndex = 0;
        if (rx.test(n.nodeValue)) targets.push(n);
      }
      targets.forEach((node) => {
        const frag = document.createDocumentFragment();
        const parts = node.nodeValue.split(rx);
        const matches = node.nodeValue.match(rx) || [];
        parts.forEach((p, idx) => {
          if (p) frag.appendChild(document.createTextNode(p));
          if (idx < matches.length) {
            const mk = document.createElement("mark");
            mk.className = "hl";
            mk.textContent = matches[idx];
            frag.appendChild(mk);
          }
        });
        node.parentNode.replaceChild(frag, node);
      });
    }
  });

  sections.forEach((s) => {
    const visible = s.querySelectorAll("a[data-page]:not(.hidden)").length;
    s.classList.toggle("empty", visible === 0);
  });
}

/* ========== Article + TOC ========== */
function buildToc() {
  const headings = content.querySelectorAll("h2, h3");
  if (!headings.length) {
    tocEl.innerHTML = '<div class="toc-empty">— senza sezioni —</div>';
    return;
  }
  const seen = new Set();
  let romanCounter = 0;
  const links = [];
  headings.forEach((h) => {
    let id = h.id;
    if (!id) {
      id = slugify(h.textContent) || "sezione";
      let unique = id;
      let n = 2;
      while (seen.has(unique)) {
        unique = `${id}-${n++}`;
      }
      id = unique;
      h.id = id;
    }
    seen.add(id);
    const isH2 = h.tagName === "H2";
    if (isH2) romanCounter += 1;
    const prefix = isH2 ? `<span style="color:var(--gold);font-weight:600;margin-right:6px">${toRoman(romanCounter)} ·</span>` : "";
    const cls = isH2 ? "lvl-2" : "lvl-3";
    links.push(`<a href="#${id}" class="${cls}" data-tid="${id}">${prefix}${escapeHtml(h.textContent)}</a>`);
  });
  tocEl.innerHTML = links.join("");

  tocEl.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const tgt = document.getElementById(a.dataset.tid);
      if (tgt) tgt.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function toRoman(num) {
  const m = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
  return m[num] || String(num);
}

function setCrumbs(page) {
  crumbs.innerHTML = `<span class="cat">${escapeHtml(page.group)}</span><span class="sep">/</span><span>${escapeHtml(page.title)}</span>`;
}

function setMeta(page) {
  const parts = [];
  if (page.meta) parts.push(escapeHtml(page.meta));
  if (page.sub) parts.push(escapeHtml(page.sub));
  // approximate reading time from rendered content
  const words = content.textContent.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  parts.push(`≈ ${mins} min di lettura`);
  metaEl.innerHTML = parts.map((p, i) => (i === 0 ? p : `<span class="dot"></span>${p}`)).join("");
}

async function loadPage() {
  const slug = getCurrentSlug();
  const page = pages.find((p) => slugify(p.title) === slug) || pages[0];
  if (slugify(page.title) !== slug) {
    window.location.hash = `/${slugify(page.title)}`;
    return;
  }

  document.title = `${page.title} | Appunti Sto-Ita`;
  titleEl.textContent = page.title;
  setCrumbs(page);
  metaEl.innerHTML = "";
  content.innerHTML = '<p class="loading">Carico gli appunti…</p>';
  tocEl.innerHTML = "";

  // Highlight active in nav
  navigation.querySelectorAll("a[data-page]").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === slug);
  });

  try {
    const response = await fetch(encodeURI(page.path));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const md = await response.text();
    content.innerHTML = renderMarkdown(md);
    buildToc();
    setMeta(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    content.innerHTML = `<p class="error">Non riesco a caricare <strong>${escapeHtml(
      page.title,
    )}</strong>. Se stai aprendo il file direttamente dal disco, avvia un piccolo server locale oppure pubblica il repository su GitHub Pages.</p>`;
    tocEl.innerHTML = '<div class="toc-empty">— senza sezioni —</div>';
  }
}

/* ========== Theme toggle ========== */
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("appunti-theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    root.setAttribute("data-theme", "dark");

  const btn = document.getElementById("btn-theme");
  function paintIcon() {
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';
  }
  paintIcon();
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("appunti-theme", next);
    paintIcon();
  });
})();

/* ========== Reading mode ========== */
(function () {
  const btn = document.getElementById("btn-reading");
  if (localStorage.getItem("appunti-reading") === "1") {
    document.body.classList.add("reading");
    btn.classList.add("active");
  }
  btn.addEventListener("click", () => {
    document.body.classList.toggle("reading");
    btn.classList.toggle("active");
    localStorage.setItem("appunti-reading", document.body.classList.contains("reading") ? "1" : "0");
  });
})();

/* ========== Progress bar ========== */
(function () {
  const bar = document.getElementById("progress");
  function update() {
    const h = document.documentElement;
    const sc = h.scrollTop || document.body.scrollTop;
    const total = h.scrollHeight - h.clientHeight;
    const p = total > 0 ? (sc / total) * 100 : 0;
    bar.style.setProperty("--p", p + "%");
  }
  document.addEventListener("scroll", update, { passive: true });
  update();
})();

/* ========== Back to top ========== */
(function () {
  const btn = document.getElementById("totop");
  function update() {
    if (window.scrollY > 600) btn.classList.add("show");
    else btn.classList.remove("show");
  }
  document.addEventListener("scroll", update, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  update();
})();

/* ========== TOC scroll-spy ========== */
(function () {
  function update() {
    const links = tocEl.querySelectorAll("a[data-tid]");
    if (!links.length) return;
    const y = window.scrollY + 140;
    let activeIdx = 0;
    links.forEach((l, i) => {
      const tgt = document.getElementById(l.dataset.tid);
      if (tgt && tgt.offsetTop <= y) activeIdx = i;
    });
    links.forEach((l) => l.classList.remove("active"));
    if (links[activeIdx]) links[activeIdx].classList.add("active");
  }
  document.addEventListener("scroll", update, { passive: true });
  // Update after each page load too (loadPage rebuilds TOC)
  const obs = new MutationObserver(update);
  obs.observe(tocEl, { childList: true });
})();

/* ========== Search wiring ========== */
searchInput.addEventListener("input", applySearchFilter);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchInput.value = "";
    applySearchFilter();
    searchInput.blur();
  }
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  applySearchFilter();
  searchInput.focus();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== searchInput) {
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (!/^(INPUT|TEXTAREA)$/.test(tag)) {
      e.preventDefault();
      searchInput.focus();
    }
  }
});

/* ========== Hash routing ========== */
window.addEventListener("hashchange", loadPage);

/* ========== Boot ========== */
renderNavigation();
loadPage();
