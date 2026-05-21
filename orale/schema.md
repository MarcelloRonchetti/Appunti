# Schema JSON banco d'orale

Formato consumato da `orale/index.html`. File per materia: `orale/data/{subject}.json`.

A differenza del pool quiz, qui non ci sono domande con risposte: ci sono **carte di esposizione** (autori e poesie) con aiuti cliccabili che l'utente apre solo se si blocca durante l'orale.

## Struttura top-level

```json
{
  "subject": "italiano",
  "version": "2026-05-21",
  "autori": [ /* array di carte autore */ ],
  "poesie": [ /* array di carte poesia */ ]
}
```

| Campo | Tipo | Descrizione |
|---|---|---|
| `subject` | string | Identificatore della materia. Deve combaciare col nome file (`italiano` → `italiano.json`). |
| `version` | string (ISO date) | Data dell'ultima rigenerazione. La pagina la mostra in footer. |
| `autori` | array | Carte autore. Vedi sezione sotto. |
| `poesie` | array | Carte poesia. Vedi sezione sotto. |

## Carta autore

```json
{
  "id": "pascoli",
  "nome": "Giovanni Pascoli",
  "contesto": "1855 — 1912 · simbolismo, fanciullino",
  "tag": ["simbolismo", "fanciullino", "nido"],
  "puntiChiave": ["...", "..."],
  "collegamenti": [{ "id": "...", "tipo": "autore", "motivo": "..." }],
  "citazioni": [{ "testo": "...", "fonte": "..." }],
  "dateFatti": [{ "anno": "1855", "evento": "..." }],
  "domandeProf": ["...", "..."],
  "paroleChiave": [{ "termine": "...", "definizione": "..." }]
}
```

| Campo | Tipo | Obblig. | Descrizione |
|---|---|---|---|
| `id` | string | sì | kebab-case stabile, univoco nel file (es. `pascoli`, `dannunzio`, `primo-levi`). Usato nei link e nell'hash routing. |
| `nome` | string | sì | Nome completo dell'autore (es. "Giovanni Pascoli"). |
| `contesto` | string | sì | Riga breve: date e tag chiave (es. `"1855 — 1912 · simbolismo, fanciullino"`). |
| `tag` | array di string | sì | 2-4 tag breve, mostrati come chip. |
| `puntiChiave` | array di string | sì | 5-8 bullet ordinati per esposizione (apertura → poetica → opere → stile → chiusura). 1 frase per bullet. Drawer 📌. |
| `collegamenti` | array di oggetti | sì | 3-5 collegamenti ad altre carte. Ogni voce: `id` target, `tipo` (`"autore"` o `"poesia"`), `motivo` breve. Drawer 🔗, navigabili. |
| `citazioni` | array di oggetti | opzionale | 2-3 citazioni famose. Ogni voce: `testo`, `fonte`. Drawer 📜. |
| `dateFatti` | array di oggetti | sì | 5-6 voci. Ogni voce: `anno` (string, "YYYY" o "1867"), `evento` (frase breve). Drawer 📅. |
| `domandeProf` | array di string | sì | 3-5 follow-up tipici della prof. Drawer ❓. |
| `paroleChiave` | array di oggetti | sì | 3-5 voci. Ogni voce: `termine`, `definizione` (1 frase). Drawer 🔤. |

## Carta poesia

```json
{
  "id": "x-agosto",
  "titolo": "X Agosto",
  "autoreId": "pascoli",
  "contesto": "Myricae, 1896 · simbolismo, lutto",
  "tag": ["myricae", "nido", "lutto"],
  "puntiChiave": ["...", "..."],
  "collegamenti": [{ "id": "...", "tipo": "autore", "motivo": "..." }],
  "testo": "verso1\nverso2\n\nverso3\nverso4",
  "dateFatti": [{ "anno": "1896", "evento": "..." }],
  "domandeProf": ["...", "..."],
  "paroleChiave": [{ "termine": "...", "definizione": "..." }]
}
```

| Campo | Tipo | Obblig. | Descrizione |
|---|---|---|---|
| `id` | string | sì | kebab-case stabile (es. `x-agosto`, `la-pioggia-nel-pineto`, `meriggiare-pallido-e-assorto`). Rimuovi apostrofi e accenti. |
| `titolo` | string | sì | Titolo completo, con maiuscole e apostrofi (es. "Ho sceso, dandoti il braccio"). |
| `autoreId` | string | sì | Riferimento all'`id` di un autore presente nell'array `autori`. La pagina usa questo campo per raggruppare le poesie sotto l'autore. |
| `contesto` | string | sì | Riga breve: raccolta, anno, tag (es. `"Ossi di seppia, 1925 · correlativo oggettivo"`). |
| `tag` | array di string | sì | 2-4 tag breve. |
| `puntiChiave` | array di string | sì | 5-8 bullet ordinati come scaletta. Drawer 📌. |
| `collegamenti` | array di oggetti | sì | 2-4 collegamenti. Almeno uno verso l'autore. Drawer 🔗. |
| `testo` | string | sì | Testo INTEGRALE filologicamente corretto. Versi separati da `\n`. Strofe separate da `\n\n` (riga vuota). Niente HTML, niente markdown. Drawer 📜, render come blockquote. |
| `dateFatti` | array di oggetti | sì | 1-3 voci. Composizione, pubblicazione, riferimenti biografici impliciti. Drawer 📅. |
| `domandeProf` | array di string | sì | 3-5 follow-up. Drawer ❓. |
| `paroleChiave` | array di oggetti | sì | 3-5 voci (termine + definizione). Drawer 🔤. |

## Convenzioni

- **Id kebab-case**: solo `a-z`, `0-9`, trattini. Rimuovi apostrofi e accenti (es. `dannunzio` non `d'annunzio`; `meriggiare-pallido-e-assorto` non `meriggiare-pallido-e-assortó`).
- **autoreId**: deve corrispondere a un `id` esistente in `autori`. Non lasciare poesie orfane.
- **Testo poesia**: `\n` per i versi, `\n\n` per le strofe. La pagina lo render in `<pre>` o blockquote preservando i ritorni a capo.
- **Campi vuoti / assenti**: se un campo opzionale (es. `citazioni`) manca o è un array vuoto, la pagina disabilita il bottone del drawer corrispondente o mostra lo stato "non disponibile". I campi obbligatori NON devono essere omessi: meglio un array con voci minime che un campo mancante.
- **Niente emoji** nei testi dei contenuti (le icone dei bottoni drawer sono nell'UI, non nei dati).
- **Ordine bullet**: i `puntiChiave` sono una scaletta — l'ordine conta. Apertura → poetica/struttura → opere/stile → chiusura/collegamento.

## Stato (iterazione 1)

La pagina non usa `localStorage`. Lo stato (carta corrente, breadcrumb, drawer aperto) vive solo in memoria + URL hash. Refresh perde la cronologia visitata ma non la posizione (l'hash `#/autori/pascoli` viene risolto al caricamento).

## Estensioni future (iterazione 2+)

- Campi `movimentoId` o array `movimenti` per carta autore.
- Carte tipo `libro` o `movimento` (oggi fuori scope).
- Campo `audio` con URL di una lettura registrata della poesia.
- Persistenza progresso ("marcata come esercitata") via localStorage.
