# Schema JSON quiz cards

Formato consumato da `quiz/index.html`. File per materia: `quiz/data/{subject}.json`.

## Struttura

```json
{
  "subject": "italiano",
  "version": "2026-05-19",
  "questions": [ /* array di domande */ ]
}
```

- `subject` (string): identificatore della materia. Deve combaciare col nome file (`italiano` → `italiano.json`).
- `version` (string, ISO date): data di rigenerazione del pool. La pagina la mostra in footer.
- `questions` (array): domande nei tre tipi sotto.

## Tipi di domanda

Tutte hanno questi campi comuni:
- `id` (string, univoco): formato `{subject_abbrev}-{type}-{NNN}` es. `ita-mc-001`.
- `type` (enum): `"multiple-choice" | "open" | "cloze"`.
- `topic` (string): macro-argomento (es. "Verismo", "Ermetismo").
- `author` (string, opzionale): se la domanda è su un autore specifico.
- `difficulty` (enum): `"facile" | "media" | "alta"`.
- `question` (string): il testo della domanda.

### multiple-choice
```json
{
  "id": "ita-mc-001",
  "type": "multiple-choice",
  "topic": "Verismo",
  "author": "Verga",
  "difficulty": "media",
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correct": 2,
  "explanation": "Spiegazione mostrata dopo la risposta."
}
```
- `options`: array di 4 stringhe.
- `correct`: indice 0-3 dell'opzione giusta.
- `explanation`: shown after answer.

### open
```json
{
  "id": "ita-open-001",
  "type": "open",
  "topic": "Decadentismo",
  "difficulty": "alta",
  "question": "Spiega ...",
  "model_answer": "Risposta modello in 3-5 righe.",
  "keywords": ["k1", "k2", "k3"]
}
```
- `model_answer`: risposta modello da confrontare.
- `keywords`: usate per evidenziare cosa cercare nella propria risposta.
- Self-rating: dopo "Mostra risposta" l'utente clicca "L'ho indovinata" / "No".

### cloze
```json
{
  "id": "ita-cloze-001",
  "type": "cloze",
  "topic": "Pascoli",
  "difficulty": "facile",
  "question": "Pascoli teorizza la poetica del _____.",
  "answer": "fanciullino",
  "alt_answers": ["il fanciullino"],
  "explanation": "Saggio omonimo del 1897."
}
```
- `answer`: risposta canonica (case-insensitive).
- `alt_answers` (opzionale): varianti accettate.
- Il blank è marcato con `_____` (cinque underscore) nella `question`.

## LocalStorage

La pagina usa queste chiavi (una per materia):
- `appunti-quiz-seen-{subject}` — array di ID già viste.
- `appunti-quiz-correct-{subject}` — array di ID giuste.
- `appunti-quiz-wrong-{subject}` — array di ID sbagliate.

Reset: bottone in pagina che cancella le tre chiavi per la materia attiva.
