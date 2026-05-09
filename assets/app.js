const pages = [
  {
    group: "Storia",
    title: "Il Fascismo italiano",
    path: "Sto-Ita/storia/01-fascismo-italiano.md",
  },
  {
    group: "Storia",
    title: "Nazismo",
    path: "Sto-Ita/storia/02-nazismo.md",
  },
  {
    group: "Storia",
    title: "Rivoluzione russa e stalinismo",
    path: "Sto-Ita/storia/03-rivoluzione-russa-stalinismo.md",
  },
  {
    group: "Storia",
    title: "La crisi del 1929",
    path: "Sto-Ita/storia/04-crisi-1929.md",
  },
  {
    group: "Storia",
    title: "Verso la Seconda guerra mondiale",
    path: "Sto-Ita/storia/05-verso-wwii-e-guerra.md",
  },
  {
    group: "Storia",
    title: "Resistenza e liberazione",
    path: "Sto-Ita/storia/06-resistenza-e-liberazione.md",
  },
  {
    group: "Storia",
    title: "Europa unita",
    path: "Sto-Ita/storia/07-europa-unita.md",
  },
  {
    group: "Storia",
    title: "Le donne nella Grande Guerra",
    path: "Sto-Ita/storia/08-donne-grande-guerra.md",
  },
  {
    group: "Italiano - autori",
    title: "Giovanni Verga",
    path: "Sto-Ita/italiano/autori/00-giovanni-verga.md",
  },
  {
    group: "Italiano - autori",
    title: "Giovanni Pascoli",
    path: "Sto-Ita/italiano/autori/00-giovanni-pascoli.md",
  },
  {
    group: "Italiano - autori",
    title: "Gabriele D'Annunzio",
    path: "Sto-Ita/italiano/autori/00-gabriele-dannunzio.md",
  },
  {
    group: "Italiano - autori",
    title: "Italo Svevo",
    path: "Sto-Ita/italiano/autori/01-italo-svevo.md",
  },
  {
    group: "Italiano - autori",
    title: "Luigi Pirandello",
    path: "Sto-Ita/italiano/autori/02-luigi-pirandello.md",
  },
  {
    group: "Italiano - autori",
    title: "Giuseppe Ungaretti",
    path: "Sto-Ita/italiano/autori/03-giuseppe-ungaretti.md",
  },
  {
    group: "Italiano - autori",
    title: "Eugenio Montale",
    path: "Sto-Ita/italiano/autori/04-eugenio-montale.md",
  },
  {
    group: "Italiano - autori",
    title: "Umberto Saba",
    path: "Sto-Ita/italiano/autori/05-umberto-saba.md",
  },
  {
    group: "Italiano - autori",
    title: "Italo Calvino",
    path: "Sto-Ita/italiano/autori/06-italo-calvino.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Positivismo, Naturalismo e Verismo",
    path: "Sto-Ita/italiano/movimenti/00-positivismo-naturalismo-verismo.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Decadentismo, Simbolismo ed Estetismo",
    path: "Sto-Ita/italiano/movimenti/00-decadentismo-simbolismo-estetismo.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Avanguardie, Futurismo e Crepuscolarismo",
    path: "Sto-Ita/italiano/movimenti/05-avanguardie-futurismo-crepuscolarismo.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Romanzo della crisi",
    path: "Sto-Ita/italiano/movimenti/01-romanzo-della-crisi.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Ermetismo",
    path: "Sto-Ita/italiano/movimenti/02-ermetismo.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Neorealismo",
    path: "Sto-Ita/italiano/movimenti/03-neorealismo.md",
  },
  {
    group: "Italiano - movimenti",
    title: "Linea antinovecentista",
    path: "Sto-Ita/italiano/movimenti/04-linea-antinovecentista.md",
  },
  {
    group: "Italiano",
    title: "Checklist italiano",
    path: "Sto-Ita/italiano/Checklist-Ita.md",
  },
  {
    group: "Educazione civica",
    title: "Europa",
    path: "Educazione civica/Europa.md",
  },
];

const content = document.querySelector("#content");
const navigation = document.querySelector("#navigation");
const readerMeta = document.querySelector("#reader-meta");
const search = document.querySelector("#search");

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCurrentSlug() {
  return window.location.hash.replace(/^#\/?/, "") || slugify(pages[0].title);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

  codeStore.forEach((code, index) => {
    html = html.replace(`@@CODE${index}@@`, code);
  });

  return html;
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines, start) {
  const headers = splitTableRow(lines[start]);
  let index = start + 2;
  const rows = [];

  while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
    rows.push(splitTableRow(lines[index]));
    index += 1;
  }

  const head = headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("");
  const body = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
    .join("");

  return {
    html: `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`,
    next: index,
  };
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let index = 0;
  let paragraph = [];
  let list = null;
  let inCode = false;
  let codeLines = [];

  function closeParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!list) return;
    html.push(`</${list}>`);
    list = null;
  }

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        closeParagraph();
        closeList();
        inCode = true;
      }
      index += 1;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      index += 1;
      continue;
    }

    if (!trimmed) {
      closeParagraph();
      closeList();
      index += 1;
      continue;
    }

    if (index + 1 < lines.length && line.includes("|") && isTableSeparator(lines[index + 1])) {
      closeParagraph();
      closeList();
      const table = renderTable(lines, index);
      html.push(table.html);
      index = table.next;
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeParagraph();
      closeList();
      html.push("<hr>");
      index += 1;
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.*)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.*)$/);
    if (unordered || ordered) {
      closeParagraph();
      const nextList = unordered ? "ul" : "ol";
      if (list !== nextList) {
        closeList();
        list = nextList;
        html.push(`<${list}>`);
      }
      html.push(`<li>${renderInline((unordered || ordered)[1])}</li>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      closeParagraph();
      closeList();
      html.push(`<blockquote>${renderInline(trimmed.replace(/^>\s?/, ""))}</blockquote>`);
      index += 1;
      continue;
    }

    paragraph.push(trimmed);
    index += 1;
  }

  closeParagraph();
  closeList();

  return html.join("\n");
}

function groupPages(items) {
  return items.reduce((groups, page) => {
    if (!groups.has(page.group)) groups.set(page.group, []);
    groups.get(page.group).push(page);
    return groups;
  }, new Map());
}

function renderNavigation(filter = "") {
  const query = filter.trim().toLowerCase();
  const current = getCurrentSlug();
  const visiblePages = pages.filter((page) => {
    const haystack = `${page.group} ${page.title}`.toLowerCase();
    return haystack.includes(query);
  });

  if (!visiblePages.length) {
    navigation.innerHTML = '<p class="empty-state">Nessun argomento trovato.</p>';
    return;
  }

  navigation.innerHTML = [...groupPages(visiblePages)]
    .map(([group, items]) => {
      const links = items
        .map((page) => {
          const slug = slugify(page.title);
          const active = slug === current ? " active" : "";
          return `<a class="nav-link${active}" href="#/${slug}">${page.title}</a>`;
        })
        .join("");

      return `<section class="nav-group"><h2>${group}</h2><div class="nav-list">${links}</div></section>`;
    })
    .join("");
}

async function loadPage() {
  const slug = getCurrentSlug();
  const page = pages.find((item) => slugify(item.title) === slug) || pages[0];

  if (slugify(page.title) !== slug) {
    window.location.hash = `/${slugify(page.title)}`;
    return;
  }

  document.title = `${page.title} | Appunti Sto-Ita`;
  content.innerHTML = '<p class="loading">Carico gli appunti...</p>';
  readerMeta.innerHTML = `<span class="pill">${page.group}</span><span class="pill">${page.path}</span>`;
  renderNavigation(search.value);

  try {
    const response = await fetch(encodeURI(page.path));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    content.innerHTML = renderMarkdown(markdown);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    content.innerHTML = `
      <p class="error">
        Non riesco a caricare <strong>${page.title}</strong>. Se stai aprendo
        il file direttamente dal computer, avvia un piccolo server locale oppure
        pubblica il repository su GitHub Pages.
      </p>
    `;
  }
}

search.addEventListener("input", () => renderNavigation(search.value));
window.addEventListener("hashchange", loadPage);

renderNavigation();
loadPage();
