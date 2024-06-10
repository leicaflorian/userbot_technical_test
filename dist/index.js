"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Crea un'applicazione Node.js che:
- legga un file da un path inserito in input dall’utente (può essere un path locale o un
indirizzo web)
- il numero totale di parole nel file
- il numero di lettere nel file
- il numero di spazi nel file
- le parole che si ripetono più di 10 volte e indicare il numero di volte in cui si ripete.
Bonus
- Scrivere l’applicazione in Typescript
- Scrivere Unit Tests
* */
const FileParser_1 = require("./FileParser");
const fileParser = FileParser_1.FileParser.instance;
const fileToRead = process.argv[2];
(async function () {
    await fileParser.parseFile(fileToRead);
    console.log('Words count:', fileParser.wordsCount);
    console.log('Letters count (no space or symbol):', fileParser.getLettersCount());
    console.log('Letters count (no space):', fileParser.getLettersCount(false, true));
    console.log('Letters count (no symbol):', fileParser.getLettersCount(true, false));
    console.log('Letters count (with spaces and symbol):', fileParser.getLettersCount(true, true));
    console.log('Spaces count:', fileParser.spacesCount);
    console.log('Symbols count:', fileParser.symbolsCount);
    console.log('Repeated words:', fileParser.repeatedWords);
})();
//# sourceMappingURL=index.js.map