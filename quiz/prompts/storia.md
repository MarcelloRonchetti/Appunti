# Prompt ChatGPT - Pool quiz storia (ripasso verifica giovedì)

Genera quiz cards JSON per `quiz/data/storia.json` usando lo schema in `quiz/schema.md`.

Programma da coprire: Nazismo, Stalinismo, Crisi del 1929, Seconda guerra mondiale, Resistenza e liberazione.

Mix consigliato: 25 multiple-choice, 12-15 open, 10 cloze. ID nel formato `sto-mc-001`, `sto-open-001`, `sto-cloze-001`. `subject` deve essere `storia`; `version` in formato `YYYY-MM-DD`; output solo JSON.

Regole: domande brevi ma non banali, opzioni plausibili, risposte aperte da 3-5 righe, cloze con una risposta chiara e varianti in `alt_answers`.
