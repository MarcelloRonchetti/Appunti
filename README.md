# Appunti Sto-Ita

Sito statico per consultare gli appunti di storia, italiano ed educazione civica.

## Pubblicazione su GitHub Pages

1. Crea un repository GitHub e carica questa cartella.
2. Verifica che le cartelle `Fonti` non vengano aggiunte al commit: sono escluse da `.gitignore`.
3. Su GitHub vai in `Settings > Pages`.
4. In `Build and deployment`, scegli `Deploy from a branch`.
5. Seleziona il branch principale e la cartella `/root`.

Il sito non richiede installazioni: `index.html` carica gli appunti Markdown e li mostra come pagine navigabili.

## Sviluppo locale

Aprire direttamente `index.html` può bloccare il caricamento dei Markdown in alcuni browser. Per provarlo in locale, avvia un piccolo server dalla cartella del progetto:

```sh
python3 -m http.server 8000
```

Poi apri `http://localhost:8000`.
