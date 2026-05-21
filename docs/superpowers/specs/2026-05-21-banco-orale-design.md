# Banco d'orale — design

Pagina standalone in `/orale/` per esercitarsi a esporre autori e poesie del programma di italiano (maturità 5F ITT) come se fossi all'orale. **L'utente parla**, la pagina è cornice + aiuti minimal a richiesta.

## Concetto

- Niente discorso modello da leggere. L'utente sceglie un punto di partenza (autore, poesia, oppure "random"), prova a esporre ad alta voce, e usa "aiuti" cliccabili solo se si blocca.
- I "collegamenti" sono navigabili: cliccando si va alla carta target, con breadcrumb che ricostruisce il percorso (mima la traccia di un'esposizione orale).

## Collocazione

- Cartella `/orale/` sorella di `/quiz/`:
  - `orale/index.html` — pagina standalone autosufficiente (HTML+CSS+JS inline, come `quiz/index.html`).
  - `orale/data/italiano.json` — dataset (autori + poesie).
  - `orale/prompts/italiano.md` — prompt ChatGPT per generare/espandere il dataset.
  - `orale/schema.md` — documentazione dello schema JSON.
- Bottone tile "🎙️ Banco d'orale" aggiunto alla landing `index.html` tra le destinazioni esistenti (verifica HTML attuale prima di modificare — non rompere stat strip / footer).

## Scope contenuti

- **Autori (10)**: Verga, Pascoli, D'Annunzio, Svevo, Pirandello, Ungaretti, Montale, Calvino, Fenoglio, Levi.
- **Poesie/testi principali (~30)**: estratte dal programma in `quiz/prompts/italiano.md` (X Agosto, La pioggia nel pineto, Veglia, Meriggiare pallido e assorto, ecc.).
- **Fuori scope iterazione 1**: movimenti, libri, dark mode, salvataggio progresso.

## Esperienza

### Home `/orale/index.html` (vista "Indice")

- Top-bar sticky con: brand "Banco d'orale · Italiano", piccolo eyebrow `🎙️ MATURITÀ 5F ITT`, link "← Home".
- Hero compatto: titolo grande, una frase didascalica ("Scegli da dove iniziare. O lascia che decida il caso.").
- Bottone CTA grande: **"↻ Carta random"**.
- Sotto, due tab/sezioni: **Autori** (10 tile) · **Poesie** (~30 tile raggruppate per autore).
- Tile = nome + tag breve. Click → vista "Carta".

### Carta (vista "Esposizione")

- Titolo grande del tema (es. "Giovanni Pascoli" o "X Agosto").
- Riga di contesto (date/raccolta, tag tipo "simbolismo, fanciullino").
- Frase guida: *"Prova a esporre ad alta voce. Usa gli aiuti solo se ti blocchi."*
- **Griglia 6 bottoni aiuto** (sempre 6, anche se un campo è vuoto mostro stato "non disponibile"):
  - 📌 Punti chiave
  - 🔗 Collegamenti
  - 📜 Testo / citazione
  - 📅 Date / fatti
  - ❓ Possibili domande prof
  - 🔤 Parole-chiave
- Click su un bottone → si apre un **drawer/pannello laterale** (sliding da destra, overlay scuro semi-trasparente). La carta resta dietro. Chiudi → torni alla carta nuda.
- In fondo alla carta: bottoni `↻ Altra carta random`, `← Indice`.
- **Breadcrumb in alto** sotto la top-bar: traccia delle carte visitate via collegamenti (es. `Pascoli → X Agosto → Montale`). Ogni voce cliccabile per tornare indietro nella catena. Reset quando si torna all'indice.

### Drawer aiuti — contenuto

Tutti i drawer hanno lo stesso scheletro: titolo, lista, bottone "chiudi" (X o tap sull'overlay).

1. **📌 Punti chiave** — `puntiChiave[]`, 5-8 bullet ordinati per esposizione (apertura → poetica → opere → chiusura).
2. **🔗 Collegamenti** — `collegamenti[]`, ogni voce: `→ [Nome] (motivo breve)`, link cliccabile che cambia carta (push nel breadcrumb).
3. **📜 Testo / citazione** — `testo` (per poesie: testo integrale formattato come blockquote) o `citazioni[]` (per autori: 2-3 citazioni famose con fonte).
4. **📅 Date / fatti** — `dateFatti[]`, mini-timeline (anno → evento), 5-6 voci max.
5. **❓ Possibili domande prof** — `domandeProf[]`, 3-5 follow-up tipici della prof all'orale.
6. **🔤 Parole-chiave** — `paroleChiave[]`, ogni voce: termine + definizione in 1 frase (fanciullino, panismo, correlativo oggettivo, inetto…).

## Schema JSON

File: `orale/data/italiano.json`.

```json
{
  "subject": "italiano",
  "version": "2026-05-21",
  "autori": [
    {
      "id": "pascoli",
      "nome": "Giovanni Pascoli",
      "contesto": "1855 — 1912 · simbolismo, fanciullino",
      "tag": ["simbolismo", "fanciullino", "nido"],
      "puntiChiave": [
        "Apertura: 10 agosto 1867, il padre ucciso — il trauma del nido violato.",
        "Poetica: il fanciullino (saggio 1897) — il poeta vede ciò che l'adulto razionale ignora.",
        "Opere chiave: Myricae (1891), Canti di Castelvecchio.",
        "Stile: fonosimbolismo, analogie, lessico tecnico-naturalistico.",
        "Posizione storica: voce del Decadentismo italiano, alternativa al superuomo dannunziano.",
        "Chiusura: poeta-vate dell'Italia umbertina ma con interiorità inquieta."
      ],
      "collegamenti": [
        { "id": "dannunzio", "tipo": "autore", "motivo": "altro volto del Decadentismo: superuomo vs. fanciullino" },
        { "id": "montale", "tipo": "autore", "motivo": "natura come schermo dell'interiorità, fonosimbolismo" },
        { "id": "x-agosto", "tipo": "poesia", "motivo": "testo-manifesto del nido violato" }
      ],
      "citazioni": [
        { "testo": "È dentro di noi un fanciullino…", "fonte": "Il fanciullino, 1897" },
        { "testo": "San Lorenzo, io lo so perché tanto / di stelle per l'aria tranquilla / arde e cade…", "fonte": "X Agosto" }
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
        "Cos'è il fonosimbolismo? Esempio da Myricae.",
        "Perché Pascoli è considerato un decadente?"
      ],
      "paroleChiave": [
        { "termine": "fanciullino", "definizione": "Bambino interiore che vede stupore e analogie nelle piccole cose; voce del poeta." },
        { "termine": "nido", "definizione": "Nucleo familiare protettivo e ossessivo; centro emotivo dell'opera." },
        { "termine": "fonosimbolismo", "definizione": "Uso di suoni e onomatopee per evocare significato oltre il senso letterale." }
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
        "Apertura: il 10 agosto, notte di San Lorenzo, stelle cadenti = lacrime cosmiche.",
        "Struttura: due morti parallele — la rondine e il padre — entrambe spezzate prima di tornare al nido.",
        "Simbolismo del nido: la coperta, i piccoli che attendono → il dolore privato diventa universale.",
        "Stile: paratassi, ripetizioni, ossimori (cielo lontano/atomi di pianto).",
        "Tema: il male inspiegabile del mondo, il cielo come testimone muto.",
        "Chiusura: dichiarare la centralità del 10 agosto come data fondante della poetica pascoliana."
      ],
      "collegamenti": [
        { "id": "pascoli", "tipo": "autore", "motivo": "torna all'autore per il quadro generale" },
        { "id": "lavandare", "tipo": "poesia", "motivo": "altra Myricae con simbolismo di assenza e solitudine" }
      ],
      "testo": "San Lorenzo, io lo so perché tanto\ndi stelle per l'aria tranquilla\narde e cade, perché sì gran pianto\nnella concava volta sfavilla.\n\nRitornava una rondine al tetto:\nl'uccisero: cadde tra spini:\nella aveva nel becco un insetto:\nla cena dei suoi rondinini.\n\nOra è là, come in croce, che tende\nquel verme a quel cielo lontano;\ne il suo nido è nell'ombra, che attende,\nche pigola sempre più piano.\n\nAnche un uomo tornava al suo nido:\nl'uccisero: disse: Perdono;\ne restò negli aperti occhi un grido:\nportava due bambole in dono…\n\nOra là, nella casa romita,\nlo aspettano, aspettano in vano:\negli immobile, attonito, addita\nle bambole al cielo lontano.\n\nE tu, Cielo, dall'alto dei mondi\nsereni, infinito, immortale,\noh! d'un pianto di stelle lo inondi\nquest'atomo opaco del Male!",
      "dateFatti": [
        { "anno": "1896", "evento": "Composta e inserita nella terza edizione di Myricae." },
        { "anno": "1867", "evento": "10 agosto: data biografica dell'assassinio del padre, riferimento implicito." }
      ],
      "domandeProf": [
        "Perché Pascoli sceglie la notte di San Lorenzo?",
        "Cosa simboleggiano la rondine e l'uomo nella poesia?",
        "Come funziona l'ossimoro 'atomo opaco del Male'?"
      ],
      "paroleChiave": [
        { "termine": "atomo opaco del Male", "definizione": "Immagine cosmica della Terra come minuscolo punto malvagio nel cielo." },
        { "termine": "nido", "definizione": "Famiglia protettiva spezzata dalla violenza esterna." }
      ]
    }
  ]
}
```

Schema completo documentato in `orale/schema.md` (analogo a `quiz/schema.md`).

## Stile grafico

- Coerente con ala umanistica:
  - Variabili CSS: `--paper #f1e7cf`, `--ink #2a2114`, `--accent #8a2820`, `--gold #a87f2f`.
  - Font: Cormorant Garamond (display), Newsreader (corpo serif), Inter (UI), JetBrains Mono (eyebrow/tag).
  - Sfondo paper crema con radial-gradient sottili (come `quiz/index.html`).
- Twist "banco d'esame":
  - Eyebrow tag mono `🎙️ banco d'orale`.
  - Bottoni aiuto come "schede di consultazione": etichetta + icona + bordo a squadra, hover = sollevamento + accento rosso mattone.
  - Carta = riquadro con bordo doppio e ombra morbida.
  - Drawer = pannello laterale destro, sfondo `--card-bg`, ombra forte sul lato.
  - Breadcrumb in mono piccolo, separatore `→`.
- **No dark mode in iterazione 1** (semplifica).
- Layout responsive: mobile = drawer full-screen, tile a colonna singola.

## Comportamento JS

- **Stato in memoria** (no localStorage in iterazione 1):
  - `currentCard`: `{ tipo: "autore" | "poesia", id: string } | null`
  - `breadcrumb`: array di carte visitate via collegamenti
  - `openDrawer`: id del drawer aperto o null
- **Routing semplice** via hash: `#/autori/pascoli`, `#/poesie/x-agosto`, vuoto = indice. Permette refresh + condivisione URL.
- **Random**: pesca un id casuale dall'unione `autori[] + poesie[]`.
- **Cambio carta da collegamento**: push nel breadcrumb, aggiorna hash, scroll top, chiudi drawer.
- **Click su voce breadcrumb**: tronca array fino a quella voce.

## Navigazione

- Landing `index.html`: aggiungi tile "🎙️ Banco d'orale" tra le destinazioni esistenti (verifica se ci sono 6 tile e dove sta la stats strip / footer prima di toccare).
- Dentro `/orale/`: top-bar sempre con "← Home" (a `../index.html`), brand link a `index.html` (orale).

## Generazione contenuti

- `orale/prompts/italiano.md` — prompt ChatGPT modellato su `quiz/prompts/italiano.md`:
  - Sezione A) prima generazione: produce JSON completo con tutti i 10 autori e ~30 poesie principali, rispettando lo schema.
  - Sezione B) espansione mirata: aggiungi/aggiorna un singolo autore o una singola poesia.
  - Stile testuale: punti chiave in italiano fluido ma corto (max 1 frase per bullet), tono "per orale di maturità".
- Seed iniziale nel JSON: **Pascoli + X Agosto** già scritti come esempio testabile (vedi snippet sopra). Altri autori/poesie con stub vuoti o assenti — la pagina deve gestire graciously (mostra "non disponibile" o nasconde tile vuoti).

## Fuori scope (iterazione 2+)

- Movimenti e libri.
- Dark mode.
- Salvataggio progresso (es. "marcata come esercitata") in localStorage.
- Timer di esposizione.
- Modalità "esame casuale" che dopo N minuti cambia automaticamente carta.
