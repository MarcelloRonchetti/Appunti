const pages = Array.isArray(window.APPUNTI_PAGES) ? window.APPUNTI_PAGES : [];

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

const searchIndex = new Map();
let searchIndexReady = false;
let searchIndexPromise = null;

function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function markdownToSearchText(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/:::html|:::/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeSnippet(text, q) {
  const normalized = normalizeSearch(text);
  const pos = normalized.indexOf(q);
  if (pos === -1) return "";
  let start = Math.max(0, pos - 72);
  let end = Math.min(text.length, pos + q.length + 110);
  while (start > 0 && !/\s/.test(text[start])) start -= 1;
  while (end < text.length && !/\s/.test(text[end])) end += 1;
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

function highlightInside(el, query) {
  if (!query) return;
  const rx = new RegExp(escapeRegex(query), "gi");
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
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
    parts.forEach((part, idx) => {
      if (part) frag.appendChild(document.createTextNode(part));
      if (idx < matches.length) {
        const mark = document.createElement("mark");
        mark.className = "hl";
        mark.textContent = matches[idx];
        frag.appendChild(mark);
      }
    });
    node.parentNode.replaceChild(frag, node);
  });
}

function ensureSearchIndex() {
  if (searchIndexReady) return Promise.resolve();
  if (searchIndexPromise) return searchIndexPromise;
  searchInput.parentElement.classList.add("is-indexing");
  searchIndexPromise = Promise.allSettled(
    pages.map(async (page) => {
      const response = await fetch(encodeURI(page.path));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      const text = markdownToSearchText(markdown);
      const slug = slugify(page.title);
      searchIndex.set(slug, {
        raw: text,
        text: normalizeSearch(`${page.group} ${page.title} ${page.sub || ""} ${page.meta || ""} ${text}`),
      });
    }),
  ).finally(() => {
    searchIndexReady = true;
    searchInput.parentElement.classList.remove("is-indexing");
    applySearchFilter();
  });
  return searchIndexPromise;
}

function getCurrentSlug() {
  return window.location.hash.replace(/^#\/?/, "") || (pages[0] ? slugify(pages[0].title) : "");
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
  let lines = markdown.replace(/\r\n/g, "\n").split("\n");

  // Strip YAML frontmatter (---\n...\n---)
  if (lines[0]?.trim() === "---") {
    let end = lines.slice(1).findIndex(l => l.trim() === "---");
    if (end !== -1) {
      lines = lines.slice(end + 2);
    }
  }

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

    if (trimmed === ":::html") {
      closeP();
      closeL();
      const htmlLines = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ":::") {
        htmlLines.push(lines[i]);
        i += 1;
      }
      out.push(htmlLines.join("\n"));
      if (i < lines.length && lines[i].trim() === ":::") i += 1;
      continue;
    }

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

/* ========== Search filter (with highlight + full text) ========== */
function applySearchFilter() {
  const raw = (searchInput.value || "").trim();
  const q = normalizeSearch(raw);
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

  if (q.length >= 2 && !searchIndexReady) ensureSearchIndex();

  links.forEach((a) => {
    if (!a.dataset.original) a.dataset.original = a.innerHTML;
    a.innerHTML = a.dataset.original;

    const slug = a.dataset.page;
    const indexed = searchIndex.get(slug);
    const visibleText = normalizeSearch(a.textContent);
    const titleMatch = visibleText.includes(q);
    const fullTextMatch = indexed ? indexed.text.includes(q) : false;
    const match = titleMatch || fullTextMatch;

    a.classList.toggle("hidden", !match);
    if (!match) return;

    if (!titleMatch && indexed) {
      const snippet = makeSnippet(indexed.raw, q);
      if (snippet) {
        const hit = document.createElement("small");
        hit.className = "search-hit";
        hit.textContent = snippet;
        a.appendChild(hit);
      }
    }

    highlightInside(a, raw);
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
  document.body.classList.toggle("is-italian", (page.group || "").startsWith("Italiano"));
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

/* ========== Timeline overlay ========== */
(function () {
  const openBtn = document.getElementById("btn-timeline");
  const overlay = document.getElementById("timeline-overlay");
  const closeBtn = document.getElementById("timeline-overlay-close");
  const body = document.getElementById("timeline-overlay-body");
  if (!openBtn || !overlay || !closeBtn || !body) return;

  const TIMELINE_SRC = "Sto-Ita/italiano/Mappe-visive.md";
  let loaded = false;

  async function ensureLoaded() {
    if (loaded) return;
    try {
      const res = await fetch(encodeURI(TIMELINE_SRC));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const md = await res.text();
      const match = md.match(/:::html\s*([\s\S]*?)\s*:::/);
      if (!match) throw new Error("Mappa temporale non trovata");
      const tmp = document.createElement("div");
      tmp.innerHTML = match[1];
      const section = tmp.querySelector("#timeline-source") || tmp.querySelector(".visual-map");
      if (!section) throw new Error("Section .visual-map mancante");
      section.classList.add("in-overlay");
      body.innerHTML = "";
      body.appendChild(section);
      loaded = true;
    } catch (err) {
      body.innerHTML = `<p class="loading">Non riesco a caricare la mappa: ${err.message}</p>`;
    }
  }

  function open() {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("timeline-open");
    ensureLoaded();
  }

  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("timeline-open");
    setTimeout(() => {
      if (!overlay.classList.contains("is-open")) overlay.hidden = true;
    }, 200);
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
    const link = e.target.closest && e.target.closest('a[href^="#/"]');
    if (link) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
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
searchInput.addEventListener("focus", ensureSearchIndex);
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
