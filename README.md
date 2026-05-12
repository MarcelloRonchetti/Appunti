# Appunti 5F — A.S. 2025/26

Sito statico di appunti per la maturità di 5F ITT. Cinque materie raccolte in un unico quaderno digitale, con due "ali" stilistiche.

## Materie

| Materia | Punto d'ingresso | Stile |
|---|---|---|
| Storia | [Appunti.html](Appunti.html) | Quaderno serif crema |
| Italiano (autori, libri, movimenti) | [Appunti.html](Appunti.html) | Quaderno serif crema |
| Educazione civica | [Appunti.html](Appunti.html) | Quaderno serif crema |
| Telecomunicazioni | [telecomunicazioni.html](telecomunicazioni.html) | Tech editoriale (teal) |
| TPSIT | [tpsit.html](tpsit.html) | Tech editoriale (blu/viola) |
| Sistemi · Crittografia | [Sistemi/sistemi.html](Sistemi/sistemi.html) | Dark cyberpunk |

La landing [index.html](index.html) raccoglie tutte le materie.

## Struttura

```
index.html              # Landing (6 destinazioni)
Appunti.html            # SPA Markdown per storia / italiano / civica
telecomunicazioni.html  # Indice materia + 8 sottopagine in telecomunicazioni/
tpsit.html              # Indice materia + 9 sottopagine in tpsit/
Sistemi/sistemi.html    # Pagina singola: crittografia
shared/                 # CSS condiviso ala tecnica
assets/                 # CSS + JS della SPA Sto-Ita
Sto-Ita/                # Contenuto MD (storia, italiano)
Educazione civica/      # Contenuto MD (civica)
```

## Pubblicazione su GitHub Pages

1. Carica la cartella in un repository.
2. `Settings > Pages` → `Deploy from a branch` → branch principale, cartella `/root`.
3. Le cartelle `Fonti` e i PDF di programma sono esclusi via `.gitignore`.

## Sviluppo locale

`index.html` carica risorse relative; aprirlo direttamente come `file://` può bloccare la SPA Markdown. Avvia un server:

```sh
python3 -m http.server 8000
```

Poi apri `http://localhost:8000`.

## Tema chiaro/scuro

Toggle in alto a destra su ogni pagina dell'ala umanistica e tecnica; la preferenza è persistita in `localStorage` (`appunti-theme`). La pagina Sistemi è dark-only by design.
