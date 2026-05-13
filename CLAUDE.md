# CLAUDE.md

Guida per Claude Code quando lavora in questo repository.

## Progetto

Sito statico di appunti per la maturità di 5F ITT (A.S. 2025/26). Cinque materie sotto lo stesso tetto, **quattro estetiche distinte**:

- **Ala umanistica** (Storia, Italiano, Educazione civica): SPA Markdown a sidebar — stile *quaderno di studio antico*, fondo crema, serif.
- **Telecomunicazioni**: pagine HTML statiche — stile *oscilloscopio / banco di misura*, fondo "test bench" warm beige con griglia, traccia ambra, mono + display tech. **Toggle light/dark**.
- **TPSIT**: pagine HTML statiche — stile *tech editoriale*, fondo carta tan + dark header + sidebar, accenti blu/viola.
- **Sistemi** (Crittografia): pagina singola — stile *dark cyberpunk*, gradiente blu→viola su nero, glow.

## Struttura cartelle

```
/
├── index.html                  # Landing multi-materia (6 destinazioni)
├── Appunti.html                # SPA Sto-Ita (carica i .md dalle cartelle umanistiche)
├── telecomunicazioni.html      # Indice materia (sidebar 10 canali + scope grid)
├── telecomunicazioni/          # 10 pagine: onde-antenne, modulazioni-digitali, tcp-ip,
│                                 switch-vlan, acl, nat, routing, wireless-80211,
│                                 fibra-gpon, laboratorio. PDF sorgenti in Fonti-tele/
├── tpsit.html                  # Indice materia (sidebar + topic grid)
├── tpsit/                      # 9 pagine: esp32, wifi, antenne, bluetooth, ble,
│                                 lorawan, nbiot, 5g, confronto
├── Sistemi/sistemi.html        # Pagina singola Crittografia (CryptoGuide)
├── shared/                     # CSS condiviso ala tecnica
│   ├── tele-style.css          # Telecomunicazioni — oscilloscopio (light + dark toggle)
│   ├── tech-style.css          # legacy (non più referenziato dalle pagine attuali)
│   └── tpsit-style.css         # TPSIT (palette blu/viola)
├── assets/                     # JS/CSS della SPA Sto-Ita
│   ├── app.js                  # Loader Markdown, ricerca, TOC, tema
│   └── styles.css
├── Sto-Ita/                    # Contenuto MD storia + italiano (vedi CLAUDE.md interno)
├── Educazione civica/          # Contenuto MD educazione civica
└── Telecomunicazioni-TPSIT/    # Sorgente storico monolitico + PDF programma
```

## Convenzioni di stile

**Ala umanistica (`index.html` + `Appunti.html`):**
- Font: Cormorant Garamond (titoli serif), Newsreader (corpo), Inter (UI).
- Palette: `--paper #f1e7cf`, `--ink #2a2114`, `--accent #8a2820` (rosso mattone), `--gold #a87f2f`.
- Capolettera sul primo paragrafo, fleuron `❦ ✦ ❦` come separatore, cornici a squadra.
- Tema chiaro/scuro tramite attributo `data-theme` su `<html>`, persistito in `localStorage` chiave `appunti-theme`.

**Telecomunicazioni (`telecomunicazioni.html` + sottopagine in `telecomunicazioni/`):**
- CSS: `shared/tele-style.css`. Estetica oscilloscopio/banco di misura.
- Font: Inter (sans), JetBrains Mono (mono), Space Grotesk (display).
- Palette light (default): `--bg #f3efe4` warm bench paper, `--ink #1a2433`, traccia `--trace-1 #b8530f` (ambra), `--trace-2 #0c8f7a` (lab teal). Griglia 16/80 px sul body.
- Palette dark: `--bg #161c25` (deep slate, NON pitch black per distinguersi da Sistemi), traccia `--trace-1 #f5b65e`. Switch via `html[data-theme="dark"]`, persistito in `localStorage` chiave `tele-theme`.
- Top bar sticky `.scope-bar` con LED pulsante + tag mono + bottone `.theme-toggle`. Sidebar 10 canali sticky.
- Alias CSS legacy (`.explain-box`, `.sec-head`, `.callout c-*`, `.code-block`, `.box`, `.sidenav`, `.layout-shell`…) preservano la markup originale delle 8 pagine pre-redesign.

**TPSIT (`tpsit.html` + sottopagine):**
- CSS: `shared/tpsit-style.css`. Estetica tech editoriale carta+dark.
- Font: Syne (sans), IBM Plex Mono (mono), Crimson Pro (serif).
- Palette `--paper #f5f0e8`, `--ink #0a0a0f`, accent blu `#2563eb` + viola `#7c3aed`.
- Header scuro a tutta larghezza con eyebrow-tag mono, sidebar `.sidenav` 260px sticky a sinistra.

**Sistemi (`Sistemi/sistemi.html`):**
- Font: Inter, JetBrains Mono.
- Palette: nero `#0a0a0f`, accent blu `#4f8cff` + viola `#a855f7`, gradienti animati.
- Stile inverso vs il resto del sito: tipografia heavy (800-900), card scure con glow.

## Navigazione

Ogni pagina deve poter tornare alla home:
- **Sto-Ita SPA (`Appunti.html`)**: il brand è un link a `index.html` + bottone casa nella toolbar.
- **Telecomunicazioni**: `.scope-tag` "← Home" e "← Telecom" nella scope-bar + `.sn-back` "← Indice materia" nella sidebar.
- **TPSIT**: `eyebrow-tag` "← Home" nell'header + `sn-back` "← Indice materia" nella sidebar.
- **Sistemi**: primo elemento di `.nav-links` è "← Home" verso `../index.html`.

## Come pubblicare

GitHub Pages serve la cartella così com'è. Sviluppo locale:

```sh
python3 -m http.server 8000
```

I PDF in `Telecomunicazioni-TPSIT/` e le cartelle `Fonti` sono escluse da `.gitignore`.

## Note per future sessioni

- Se si aggiungono nuove materie alla landing, aggiornare *anche* la stats strip (`<section class="stats">`) e il footer.
- Il design originale è esportato da Claude Design — il bundle non è in repo; le pagine HTML finali sono autosufficienti.
- La SPA Sto-Ita (`Appunti.html` + `assets/app.js`) carica Markdown dinamicamente da `Sto-Ita/` e `Educazione civica/`. Non rompere i percorsi relativi spostando file MD.
- Per scrivere nuovi appunti di Storia/Italiano vedi `Sto-Ita/CLAUDE.md`.

## Test e verifica

- **NON installare browser/dipendenze** (Chrome, Chromium, Playwright, ecc.) per "testare" le pagine, a meno che l'utente non lo chieda esplicitamente. Il sito è statico: la correttezza si verifica leggendo il file e confidando nella struttura. Lo user può aprire il browser da sé.
- Per il server di sviluppo locale basta `python3 -m http.server`. Non serve avviarlo per validare modifiche di codice/CSS — lo si fa solo se serve davvero (es. su richiesta o per debug specifico) e va chiuso a fine sessione.
