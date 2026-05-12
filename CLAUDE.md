# CLAUDE.md

Guida per Claude Code quando lavora in questo repository.

## Progetto

Sito statico di appunti per la maturità di 5F ITT (A.S. 2025/26). Cinque materie sotto lo stesso tetto, due "ali" stilistiche:

- **Ala umanistica** (Storia, Italiano, Educazione civica): SPA Markdown a sidebar — stile *quaderno di studio antico*, fondo crema, serif.
- **Ala tecnica** (Telecomunicazioni, TPSIT): pagine HTML statiche — stile *tech editoriale*, fondo carta, mono + sans, accenti blu/teal/viola.
- **Sistemi** (Crittografia): pagina singola — stile *dark cyberpunk*, gradiente blu→viola su nero, glow.

## Struttura cartelle

```
/
├── index.html                  # Landing multi-materia (6 destinazioni)
├── Appunti.html                # SPA Sto-Ita (carica i .md dalle cartelle umanistiche)
├── telecomunicazioni.html      # Indice materia (sidebar + topic grid)
├── telecomunicazioni/          # 8 pagine: onde-antenne, tcp-ip, switch-vlan, acl,
│                                 nat, wireless-80211, fibra-gpon, laboratorio
├── tpsit.html                  # Indice materia (sidebar + topic grid)
├── tpsit/                      # 9 pagine: esp32, wifi, antenne, bluetooth, ble,
│                                 lorawan, nbiot, 5g, confronto
├── Sistemi/sistemi.html        # Pagina singola Crittografia (CryptoGuide)
├── shared/                     # CSS condiviso per ala tecnica
│   ├── tech-style.css          # Telecomunicazioni (palette teal)
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

**Ala tecnica (`telecomunicazioni.html` + `tpsit.html` + sottopagine):**
- Font: Syne (sans), IBM Plex Mono (mono), Crimson Pro (serif).
- Palette base `--paper #f5f0e8`, `--ink #0a0a0f`, `--accent #1a1a2e`.
- Header scuro a tutta larghezza con eyebrow-tag mono, sidebar `.sidenav` 260px sticky a sinistra.
- Telecomunicazioni: accent teal `#059669`. TPSIT: accent blu `#2563eb` + viola `#7c3aed`.
- CSS condiviso in `shared/*.css`; sottopagine importano con `../shared/*.css`.

**Sistemi (`Sistemi/sistemi.html`):**
- Font: Inter, JetBrains Mono.
- Palette: nero `#0a0a0f`, accent blu `#4f8cff` + viola `#a855f7`, gradienti animati.
- Stile inverso vs il resto del sito: tipografia heavy (800-900), card scure con glow.

## Navigazione

Ogni pagina deve poter tornare alla home:
- **Sto-Ita SPA (`Appunti.html`)**: il brand è un link a `index.html` + bottone casa nella toolbar.
- **Ala tecnica**: `eyebrow-tag` "← Home" nell'header + `sn-back` "← Indice materia" nella sidebar.
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
