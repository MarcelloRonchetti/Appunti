# Prompt ChatGPT — Banco d'orale italiano (maturità 5F ITT)

Due prompt: **A) prima generazione** (dataset completo: 10 autori + ~26 poesie principali) e **B) espansione mirata** (aggiungi o aggiorna UN autore o UNA poesia). Copia il blocco, incollalo in ChatGPT, salva l'output JSON in `orale/data/italiano.json`.

Il banco d'orale è diverso dal pool quiz: qui non si testano domande, ma si **aiuta l'utente a esporre ad alta voce**. I contenuti sono "punti per orale di maturità", 1 frase per bullet, italiano fluido ma corto — niente discorso modello lungo.

---

## A) Prima generazione — copia da qui ↓

````
Sei un docente di italiano esperto della maturità per un Istituto Tecnico Tecnologico (5° anno). Devi generare il dataset completo per un "banco d'orale" in formato JSON: una raccolta di carte autore e carte poesia che l'utente userà per esercitarsi a esporre ad alta voce davanti alla commissione. Ogni carta è una scaletta di aiuti: punti chiave per l'esposizione, collegamenti, citazioni, date, possibili domande del prof, parole chiave.

PROGRAMMA SVOLTO (sezioni e contenuti, sintesi):

1. Positivismo, Naturalismo, Verismo — Comte, Darwin; Zola (romanzo sperimentale); impersonalità, regressione del narratore.
2. Verga — Vita dei campi (Rosso Malpelo, La lupa), Novelle rusticane (La roba, Libertà), I Malavoglia, Mastro-don Gesualdo; ideale dell'ostrica, ciclo dei Vinti.
3. Decadentismo, Simbolismo, Estetismo — Baudelaire (I fiori del male: Corrispondenze, L'albatro, Spleen); Wilde (Dorian Gray); Huysmans (A rebours).
4. Pascoli — 10 agosto, nido; il fanciullino; Myricae (Lavandare, X Agosto, Temporale, Il lampo, Il tuono, Novembre); Canti di Castelvecchio (Il gelsomino notturno, La mia sera); fonosimbolismo.
5. D'Annunzio — Il piacere, superuomo, Le Laudi, Alcyone (La sera fiesolana, La pioggia nel pineto); panismo; impresa di Fiume.
6. Avanguardie, Futurismo, Crepuscolarismo — Marinetti (Manifesto 1909, Zang Tumb Tuuum); Palazzeschi (E lasciatemi divertire!); Gozzano (Totò Merumeni).
7. Romanzo della crisi — Nietzsche, Freud, Bergson; tempo soggettivo, narratore inattendibile, antieroe, inetto.
8. Svevo — Una vita, Senilità, La coscienza di Zeno (Zeno Cosini, dr. S., struttura, fumo, padre, matrimonio, finale apocalittico).
9. Pirandello — maschera, umorismo (avvertimento vs. sentimento del contrario); novelle (Il treno ha fischiato, La carriola, La patente); Il fu Mattia Pascal, Uno nessuno e centomila; teatro (Così è se vi pare, Sei personaggi in cerca d'autore, Enrico IV).
10. Ungaretti — L'Allegria (Veglia, Fratelli, Soldati, San Martino del Carso, Sono una creatura, I fiumi, Il porto sepolto, Pellegrinaggio); Sentimento del tempo; Il dolore.
11. Ermetismo — poesia pura, parola essenziale; Quasimodo, Luzi, Gatto.
12. Montale — male di vivere, correlativo oggettivo; Ossi di seppia (Non chiederci la parola, I limoni, Meriggiare pallido e assorto, Spesso il male di vivere ho incontrato); Le occasioni; Satura, Xenia (Ho sceso, dandoti il braccio).
13. Neorealismo — 1943-anni 50; antiretorica, lingua parlata; Vittorini, Pavese, Calvino, Fenoglio; cinema (Rossellini, De Sica, Visconti).
14. Calvino — Sentiero dei nidi di ragno; I nostri antenati; Se una notte d'inverno un viaggiatore; metanarrazione.
15. Fenoglio — Una questione privata; Il partigiano Johnny; lingua mista italiano+piemontese+calchi inglesi.
16. Primo Levi — Se questo è un uomo (Il viaggio, Il canto di Ulisse), La tregua, Il sistema periodico, I sommersi e i salvati (zona grigia, vergogna del sopravvissuto).

COMPITO

Genera un oggetto JSON con DUE array:

- `autori`: 10 carte autore — Verga, Pascoli, D'Annunzio, Svevo, Pirandello, Ungaretti, Montale, Calvino, Fenoglio, Primo Levi.
- `poesie`: ~26 carte poesia. Lista vincolata da rispettare:
  - Pascoli: X Agosto, Lavandare, Temporale, Il lampo, Il tuono, Novembre, Il gelsomino notturno, La mia sera (8).
  - D'Annunzio: La sera fiesolana, La pioggia nel pineto (2).
  - Ungaretti: Veglia, Fratelli, Soldati, San Martino del Carso, Sono una creatura, I fiumi, Il porto sepolto, Pellegrinaggio (8).
  - Montale: Non chiederci la parola, I limoni, Meriggiare pallido e assorto, Spesso il male di vivere ho incontrato, Ho sceso, dandoti il braccio (5).
  - Opzionale (max 3 totali, scegli tu): Baudelaire (Corrispondenze, L'albatro, Spleen) tradotti, Palazzeschi (E lasciatemi divertire!), Gozzano (Totò Merumeni), Marinetti (estratto Zang Tumb Tuuum) — includili solo se utili per collegamenti significativi.

Verga, Svevo, Pirandello, Calvino, Fenoglio, Primo Levi sono autori di PROSA: solo carta autore, niente carta poesia. Se per Baudelaire/Palazzeschi/Gozzano/Marinetti includi una poesia, NON creare la carta autore (il programma chiede 10 autori italiani prefissati).

TONO E LIMITI PER CARTA

- Italiano fluido ma corto: 1 frase per bullet, no paragrafoni.
- Pensato per "cosa dico all'orale di maturità", non per pagina enciclopedica.
- 5-8 puntiChiave per carta, ordinati come una scaletta di esposizione (apertura → poetica/contesto → opere → stile → chiusura/collegamento).
- 3-5 collegamenti per carta (ad altri autori o poesie). Ogni collegamento ha `id`, `tipo`, `motivo` breve (max 1 riga).
- Per le carte autore: 2-3 citazioni famose con fonte; per le carte poesia: campo `testo` con il testo INTEGRALE filologicamente corretto, versi separati da `\n`, strofe separate da `\n\n`.
- 5-6 dateFatti per autore (anno → evento sintetico); 1-3 dateFatti per poesia (composizione, pubblicazione, riferimenti biografici impliciti).
- 3-5 domandeProf per carta: i follow-up tipici che una prof fa all'orale (sfumature, confronti, dettagli testuali).
- 3-5 paroleChiave per carta: termine + definizione in 1 frase (fanciullino, panismo, correlativo oggettivo, inetto, ungarettiano "fiume"…).

FORMATO OUTPUT (rispetta ESATTAMENTE questo schema, output SOLO JSON, da `{` a `}`, senza testo prima o dopo, senza fence markdown):

{
  "subject": "italiano",
  "version": "YYYY-MM-DD",
  "autori": [
    {
      "id": "pascoli",
      "nome": "Giovanni Pascoli",
      "contesto": "1855 — 1912 · simbolismo, fanciullino, nido",
      "tag": ["simbolismo", "fanciullino", "nido"],
      "puntiChiave": [
        "Apertura biografica: il 10 agosto 1867 il padre viene ucciso — trauma fondante.",
        "Poetica del fanciullino (1897): il poeta è il bambino interiore che vede mistero nelle piccole cose.",
        "Simbolo del nido: famiglia ricostruita a Castelvecchio, rifugio fragile.",
        "Opere chiave: Myricae (1891), Canti di Castelvecchio (1903).",
        "Stile: fonosimbolismo, onomatopee, lessico misto — un italiano nuovo.",
        "Posizione storica: Decadentismo italiano dimesso, opposto al superuomo dannunziano."
      ],
      "collegamenti": [
        { "id": "dannunzio", "tipo": "autore", "motivo": "i due volti del Decadentismo italiano" },
        { "id": "montale", "tipo": "autore", "motivo": "natura come schermo dell'interiorità" },
        { "id": "x-agosto", "tipo": "poesia", "motivo": "testo-manifesto del nido violato" }
      ],
      "citazioni": [
        { "testo": "È dentro di noi un fanciullino…", "fonte": "Il fanciullino, 1897" }
      ],
      "dateFatti": [
        { "anno": "1855", "evento": "Nasce a San Mauro di Romagna." },
        { "anno": "1867", "evento": "10 agosto: il padre viene ucciso." },
        { "anno": "1891", "evento": "Pubblica Myricae." },
        { "anno": "1897", "evento": "Saggio Il fanciullino." },
        { "anno": "1903", "evento": "Canti di Castelvecchio." },
        { "anno": "1912", "evento": "Muore a Bologna." }
      ],
      "domandeProf": [
        "Cosa intende Pascoli per nido?",
        "Differenza tra fanciullino e superuomo dannunziano?",
        "Cos'è il fonosimbolismo? Fai un esempio."
      ],
      "paroleChiave": [
        { "termine": "fanciullino", "definizione": "Bambino interiore che vede stupore e analogie nelle piccole cose." },
        { "termine": "nido", "definizione": "Nucleo familiare protettivo e ossessivo; centro emotivo dell'opera." }
      ]
    }
  ],
  "poesie": [
    {
      "id": "x-agosto",
      "titolo": "X Agosto",
      "autoreId": "pascoli",
      "contesto": "Myricae, 1896 · simbolismo, lutto",
      "tag": ["myricae", "nido", "lutto"],
      "puntiChiave": [
        "Apertura: notte di San Lorenzo, stelle cadenti = lacrime cosmiche.",
        "Struttura: due morti parallele — rondine e padre — spezzate prima del nido.",
        "Riferimento biografico implicito: il padre Ruggero ucciso il 10 agosto 1867.",
        "Stile: paratassi, ripetizioni, ossimori (cielo sereno/pianto).",
        "Chiusura: 'atomo opaco del Male' — la Terra come punto oscuro nel cosmo."
      ],
      "collegamenti": [
        { "id": "pascoli", "tipo": "autore", "motivo": "torna all'autore per il quadro generale" },
        { "id": "lavandare", "tipo": "poesia", "motivo": "altra Myricae sul simbolismo dell'assenza" }
      ],
      "testo": "San Lorenzo, io lo so perché tanto\ndi stelle per l'aria tranquilla\narde e cade...\n\n[testo INTEGRALE qui, versi separati da \\n, strofe da \\n\\n]",
      "dateFatti": [
        { "anno": "1867", "evento": "10 agosto: data biografica del padre, evocata implicitamente." },
        { "anno": "1896", "evento": "Composta e inserita nella terza edizione di Myricae." }
      ],
      "domandeProf": [
        "Perché la notte di San Lorenzo?",
        "Cosa simboleggiano rondine e uomo nel parallelismo?",
        "Come funziona l'ossimoro 'atomo opaco del Male'?"
      ],
      "paroleChiave": [
        { "termine": "atomo opaco del Male", "definizione": "Immagine cosmica della Terra come punto malvagio nel cielo sereno." },
        { "termine": "nido", "definizione": "Famiglia protettiva spezzata dalla violenza esterna." }
      ]
    }
  ]
}

REGOLE FERREE

- Tutti gli `id` sono in kebab-case stabili, basati sul nome canonico: `pascoli`, `dannunzio`, `svevo`, `pirandello`, `ungaretti`, `montale`, `calvino`, `fenoglio`, `verga`, `primo-levi`. Per le poesie: `x-agosto`, `la-pioggia-nel-pineto`, `meriggiare-pallido-e-assorto`, `san-martino-del-carso`, `ho-sceso-dandoti-il-braccio`, ecc. (rimuovi apostrofi e accenti, usa solo a-z, 0-9, trattini).
- `autoreId` nelle poesie DEVE corrispondere a un `id` presente in `autori`. Non creare poesie orfane.
- I testi delle poesie devono essere filologicamente corretti. Versi separati da `\n` (singolo a capo), strofe separate da `\n\n` (doppio a capo). Niente HTML, niente markdown.
- Niente emoji.
- Non aggiungere testo, commenti o spiegazioni FUORI dal JSON.
- Il `version` mettilo alla data di oggi in formato YYYY-MM-DD.
- Output: SOLO l'oggetto JSON, da `{` a `}`. Niente altro.

Inizia ora.
````

---

## B) Espansione mirata — copia da qui ↓ (sostituisci `<TIPO>`, `<ID>`, `<CONTESTO>`)

Usa questo prompt quando vuoi aggiungere o aggiornare UNA SINGOLA carta (un autore o una poesia). L'output è un oggetto JSON singolo, da inserire manualmente nell'array `autori` o `poesie` del file esistente.

````
Sei un docente di italiano esperto della maturità per un Istituto Tecnico Tecnologico (5° anno). Devi generare UNA SOLA carta del banco d'orale italiano.

PARAMETRI:
- Tipo carta: <TIPO>  (valori: "autore" oppure "poesia")
- Id: <ID>  (kebab-case stabile, es. "ungaretti" oppure "veglia")
- Contesto/note: <CONTESTO>  (opzionale: indicazioni su sfumature, raccolta, anno, collegamenti specifici da curare)

La carta serve all'utente per esercitarsi a esporre ad alta voce all'orale di maturità. NON è una pagina enciclopedica: è una scaletta di aiuti.

VINCOLI

Per carta autore:
- 5-8 puntiChiave, 1 frase per bullet, ordinati come scaletta di esposizione (apertura → poetica → opere → stile → chiusura).
- 3-5 collegamenti ad altri autori o poesie (ognuno con `id`, `tipo`, `motivo`).
- 2-3 citazioni famose con fonte.
- 5-6 dateFatti (anno → evento sintetico).
- 3-5 domandeProf (follow-up tipici).
- 3-5 paroleChiave (termine + definizione in 1 frase).

Per carta poesia:
- 5-8 puntiChiave.
- 2-4 collegamenti (almeno uno verso l'autore con id corretto).
- Campo `testo` con il testo INTEGRALE filologicamente corretto, versi separati da `\n`, strofe da `\n\n`.
- 1-3 dateFatti (composizione, pubblicazione, riferimento biografico implicito).
- 3-5 domandeProf.
- 3-5 paroleChiave.

FORMATO OUTPUT (output SOLO l'oggetto JSON della singola carta, da `{` a `}`, niente fence, niente testo extra):

Per autore:
{
  "id": "<ID>",
  "nome": "Nome Cognome",
  "contesto": "anni · tag breve",
  "tag": ["...", "..."],
  "puntiChiave": ["...", "..."],
  "collegamenti": [{ "id": "...", "tipo": "autore|poesia", "motivo": "..." }],
  "citazioni": [{ "testo": "...", "fonte": "..." }],
  "dateFatti": [{ "anno": "YYYY", "evento": "..." }],
  "domandeProf": ["...", "..."],
  "paroleChiave": [{ "termine": "...", "definizione": "..." }]
}

Per poesia:
{
  "id": "<ID>",
  "titolo": "Titolo",
  "autoreId": "id-autore",
  "contesto": "raccolta, anno · tag",
  "tag": ["...", "..."],
  "puntiChiave": ["...", "..."],
  "collegamenti": [{ "id": "...", "tipo": "autore|poesia", "motivo": "..." }],
  "testo": "verso1\nverso2\n\nverso3\nverso4",
  "dateFatti": [{ "anno": "YYYY", "evento": "..." }],
  "domandeProf": ["...", "..."],
  "paroleChiave": [{ "termine": "...", "definizione": "..." }]
}

REGOLE

- Tono: punti per orale di maturità, italiano fluido, 1 frase per bullet.
- Niente emoji, niente testo fuori dal JSON, niente fence markdown.
- Id kebab-case, autoreId riferimento valido.
- Testo poesia filologicamente corretto.

Inizia ora.
````

---

## Lista poesie target (riferimento sintetico)

- **Pascoli (8)**: X Agosto, Lavandare, Temporale, Il lampo, Il tuono, Novembre, Il gelsomino notturno, La mia sera.
- **D'Annunzio (2)**: La sera fiesolana, La pioggia nel pineto.
- **Ungaretti (8)**: Veglia, Fratelli, Soldati, San Martino del Carso, Sono una creatura, I fiumi, Il porto sepolto, Pellegrinaggio.
- **Montale (5)**: Non chiederci la parola, I limoni, Meriggiare pallido e assorto, Spesso il male di vivere ho incontrato, Ho sceso, dandoti il braccio.
- **Opzionali (max 3)**: Baudelaire (Corrispondenze / L'albatro / Spleen), Palazzeschi (E lasciatemi divertire!), Gozzano (Totò Merumeni), Marinetti (estratto Zang Tumb Tuuum).

Autori senza carta poesia (solo carta autore, prosa): Verga, Svevo, Pirandello, Calvino, Fenoglio, Primo Levi.

---

## Come usare

1. Apri ChatGPT, incolla il **prompt A** (lascia la data di oggi).
2. Copia tutto l'output JSON.
3. Salvalo in `orale/data/italiano.json` (sovrascrivi il seed).
4. Apri `orale/index.html` nel browser → la pagina carica autori + poesie.
5. Per aggiungere o rifinire una sola carta, usa il **prompt B** specificando tipo, id e contesto. Incolla l'oggetto risultante nell'array `autori` o `poesie` del file esistente.

Lo schema è documentato in `orale/schema.md`.
