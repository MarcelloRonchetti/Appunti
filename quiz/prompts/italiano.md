# Prompt ChatGPT — Pool quiz italiano (maturità 5F ITT)

Due prompt: **A) prima generazione** (50 domande bilanciate) e **B) espansione** (aggiungi N domande su un tema specifico). Copia tutto il blocco, incollalo in ChatGPT, salva l'output JSON in `quiz/data/italiano.json`.

---

## A) Prima generazione — copia da qui ↓

````
Sei un docente di italiano esperto della maturità per un Istituto Tecnico Tecnologico (5° anno). Devi generare un pool di quiz cards in formato JSON per il ripasso esami.

PROGRAMMA SVOLTO (sezioni e contenuti su cui basare le domande):

1. **Positivismo, Naturalismo, Verismo**: Comte, Darwin, evoluzione; Goncourt (Germinie Lacerteux), Zola (L'Ammazzatoio, romanzo sperimentale); differenze Naturalismo/Verismo; impersonalità, regressione, documento umano.

2. **Verga**: Nedda, Fantasticheria e ideale dell'ostrica, Vita dei campi (Rosso Malpelo, La lupa), Novelle rusticane (La roba, Libertà), I Malavoglia (casa del nespolo, Provvidenza, 'Ntoni, fiumana del progresso, Ciclo dei Vinti), Mastro-don Gesualdo.

3. **Decadentismo, Simbolismo, Estetismo**: crisi del Positivismo; Baudelaire (I fiori del male, Corrispondenze, L'albatro, Spleen); simbolo, analogia, musicalità; Wilde (Il ritratto di Dorian Gray); Huysmans (A rebours/A ritroso); culto della bellezza, arte per l'arte.

4. **Pascoli**: trauma del 10 agosto, nido; poetica del fanciullino; Myricae (Lavandare, X Agosto, Temporale, Il lampo, Il tuono, Novembre); Il gelsomino notturno, La mia sera; onomatopee, simboli, fonosimbolismo; La grande proletaria si è mossa.

5. **D'Annunzio**: vita inimitabile, Vittoriale; Il piacere (Andrea Sperelli, Elena, Maria); superuomo, Nietzsche; Le Laudi, Alcyone (La sera fiesolana, La pioggia nel pineto), panismo; interventismo, impresa di Fiume.

6. **Avanguardie, Futurismo, Crepuscolarismo**: Marinetti, Manifesto del Futurismo 1909, parole in libertà, Zang Tumb Tuuum; Palazzeschi (E lasciatemi divertire!); Crepuscolari, Gozzano (Totò Merumeni).

7. **Romanzo della crisi**: Nietzsche, Freud, Bergson; tempo soggettivo, narratore inattendibile, antieroe, inetto.

8. **Svevo**: Trieste, Joyce, Schopenhauer; Una vita (Alfonso Nitti), Senilità (Emilio Brentani), La coscienza di Zeno (Zeno Cosini, dr. S., struttura, fumo, padre, matrimonio, malattia, finale apocalittico).

9. **Pirandello**: vita e forma, maschera, umorismo (avvertimento vs. sentimento del contrario); L'esclusa; novelle (Il treno ha fischiato, La carriola, La patente); Il fu Mattia Pascal (strappo del cielo di carta); Uno nessuno e centomila; I vecchi e i giovani; Quaderni di Serafino Gubbio operatore; teatro (Così è se vi pare, Sei personaggi in cerca d'autore, Enrico IV, metateatro).

10. **Ungaretti**: Alessandria d'Egitto, Parigi, guerra; L'Allegria (Veglia, Fratelli, Soldati, San Martino del Carso, Sono una creatura, I fiumi, Il porto sepolto, Pellegrinaggio); Sentimento del tempo; Il dolore.

11. **Ermetismo**: poesia pura, parola essenziale; Ungaretti precursore; Quasimodo, Luzi, Gatto; oscurità simbolica; vs. linea antinovecentista.

12. **Montale**: Genova, Cinque Terre, Nobel; male di vivere, correlativo oggettivo; Ossi di seppia (Non chiederci la parola, I limoni, Meriggiare pallido e assorto, Spesso il male di vivere ho incontrato); Le occasioni, Clizia; La bufera e altro; Satura, Xenia (Ho sceso, dandoti il braccio).

13. **Neorealismo**: 1943-anni 50; antiretorica, lingua parlata, dialetti; cinema (Rossellini Roma città aperta/Paisà, De Sica Ladri di biciclette, Visconti, De Santis); letteratura (Vittorini, Pavese, Calvino, Fenoglio); clima non scuola.

14. **Calvino**: Resistenza nelle brigate Garibaldi, PCI fino al 1956; Einaudi; Il sentiero dei nidi di ragno (Pin, distaccamento del Dritto, Kim); prefazione 1964; I nostri antenati (trilogia fantastica); Oulipo; Se una notte d'inverno un viaggiatore, metanarrazione.

15. **Fenoglio**: Langhe, Hemingway/Faulkner, lingua mista (italiano+piemontese+calchi inglesi); I ventitré giorni della città di Alba, La malora, Primavera di bellezza, Il partigiano Johnny; Una questione privata (Milton, Fulvia, Giorgio, gelosia nella Resistenza, nebbia simbolo).

16. **Primo Levi**: Torino 1919, chimico ebreo, Auschwitz Monowitz (matricola 174.517), morte 1987; Se questo è un uomo (1947; capitolo I "Il viaggio", "Il canto di Ulisse" con Pikolo, Inferno XXVI "fatti non foste a viver come bruti"), La tregua, Il sistema periodico, La chiave a stella, I sommersi e i salvati (zona grigia, vergogna del sopravvissuto); stile sobrio, modello manzoniano.

Anche libri non legati a un autore principale: Il Gattopardo (Tomasi di Lampedusa), Madame Bovary (Flaubert), Niente di nuovo sul fronte occidentale (Remarque), Una questione privata (Fenoglio), Il Marchese di Roccaverdina (Capuana), Come il vento cucito alla terra (Tuti), La banda di via Panisperna (Colangelo/Temporelli), I giorni di vetro (Verna).

COMPITO

Genera 50 domande coprendo TUTTE le 16 sezioni (almeno 2 domande per sezione, max 5 per sezione). Mix obbligatorio:
- 25 domande **multiple-choice** (4 opzioni, una corretta)
- 15 domande **open** (risposta aperta breve, ~3-5 righe attese)
- 10 domande **cloze** (fill-in-the-blank, 1-3 parole da inserire)

Difficoltà mix: ~15 facili, ~25 medie, ~10 alte.

FORMATO OUTPUT (rispetta ESATTAMENTE questo schema, output SOLO il JSON, senza testo prima o dopo, senza ```json fences):

{
  "subject": "italiano",
  "version": "YYYY-MM-DD",
  "questions": [
    {
      "id": "ita-mc-001",
      "type": "multiple-choice",
      "topic": "Verismo",
      "author": "Verga",
      "difficulty": "media",
      "question": "Testo della domanda?",
      "options": ["Risposta A", "Risposta B", "Risposta C", "Risposta D"],
      "correct": 1,
      "explanation": "Perché la risposta corretta è quella, con 1-2 frasi di contesto."
    },
    {
      "id": "ita-open-001",
      "type": "open",
      "topic": "Decadentismo",
      "author": "Pascoli",
      "difficulty": "alta",
      "question": "Spiega la poetica del fanciullino e come si manifesta in X.",
      "model_answer": "Risposta modello in 3-5 righe, sintetica ma completa.",
      "keywords": ["fanciullino", "mistero", "piccole cose", "Myricae"]
    },
    {
      "id": "ita-cloze-001",
      "type": "cloze",
      "topic": "Verismo",
      "author": "Verga",
      "difficulty": "facile",
      "question": "Verga teorizza il principio dell'_____, secondo cui il narratore deve eclissarsi e lasciare parlare i fatti.",
      "answer": "impersonalità",
      "alt_answers": ["impersonalita"],
      "explanation": "L'impersonalità (regressione del narratore) è il pilastro tecnico del Verismo."
    }
  ]
}

REGOLE FERREE
- ID progressivi e univoci nel formato `ita-{tipo}-{NNN}` (mc/open/cloze, 3 cifre).
- `topic` deve essere una sezione del programma sopra (es. "Verismo", "Decadentismo", "Ermetismo", "Neorealismo", "Romanzo della crisi"…).
- `author` se la domanda è su un autore specifico, altrimenti ometti il campo.
- `difficulty` ∈ ["facile", "media", "alta"].
- Le opzioni multiple-choice devono essere PLAUSIBILI tutte e quattro (non distrattori ovvi); la risposta corretta non è sempre la più lunga.
- Le cloze devono avere UNA risposta canonica chiara, eventualmente con `alt_answers` per varianti grafiche/sinonimi accettabili.
- Le open devono essere domande con una risposta esprimibile in 3-5 righe (non "scrivi un saggio").
- Non inserire emoji.
- Non aggiungere testo, commenti o spiegazioni FUORI dal JSON.
- Il `version` mettilo alla data di oggi in formato YYYY-MM-DD.
- Output: SOLO l'oggetto JSON, da `{` a `}`. Niente altro.

Inizia ora.
````

---

## B) Espansione — copia da qui ↓ (sostituisci `<TEMA>` e `<N>`)

````
Sei un docente di italiano esperto della maturità per un Istituto Tecnico Tecnologico (5° anno). Devi generare <N> domande aggiuntive di quiz card su <TEMA> (es. "Pirandello", "Ermetismo", "Decadentismo francese").

Il pool esistente è già strutturato. Devi rispettare ESATTAMENTE lo schema seguente e produrre solo nuove domande NON ripetitive di quelle classiche. Punta a sfumature, dettagli testuali, citazioni, collegamenti meno ovvi.

Mix: 50% multiple-choice, 30% open, 20% cloze. Difficoltà bilanciata.

FORMATO (output SOLO JSON, da `{` a `}`, niente fences, niente testo extra):

{
  "subject": "italiano",
  "version": "YYYY-MM-DD",
  "expansion_topic": "<TEMA>",
  "questions": [
    { "id": "ita-mc-XXX", "type": "multiple-choice", "topic": "<TEMA>", "author": "...", "difficulty": "media", "question": "...", "options": ["...","...","...","..."], "correct": 2, "explanation": "..." },
    { "id": "ita-open-XXX", "type": "open", "topic": "<TEMA>", "author": "...", "difficulty": "alta", "question": "...", "model_answer": "...", "keywords": ["...","..."] },
    { "id": "ita-cloze-XXX", "type": "cloze", "topic": "<TEMA>", "author": "...", "difficulty": "facile", "question": "... _____ ...", "answer": "...", "alt_answers": ["..."], "explanation": "..." }
  ]
}

REGOLE
- ID progressivi (continua dalla numerazione del pool esistente — se non sai, parti da 100+).
- Tutte le domande hanno `topic` = "<TEMA>".
- Niente emoji, niente testo fuori dal JSON, niente fence markdown.

Inizia ora.
````

---

## Come usare

1. Apri ChatGPT, incolla il **prompt A** (sostituendo data se vuoi).
2. Copia tutto l'output JSON.
3. Salvalo in `quiz/data/italiano.json` (sovrascrivendo).
4. Apri `quiz/index.html` nel browser → seleziona Italiano → quiz parte.
5. Quando vuoi più domande, usa il **prompt B** specificando tema e N. Incolla le nuove domande dentro `"questions": [ ... ]` del file esistente (basta unire gli array).

Lo schema è documentato in `quiz/schema.md`.
