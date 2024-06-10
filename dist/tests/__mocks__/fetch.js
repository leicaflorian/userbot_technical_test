"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
const fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        text: async function () {
            return 'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, di quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker,   di che includeva versioni del Lorem di   Ipsum.';
        }
    });
});
exports.fetch = fetch;
global.fetch = fetch;
//# sourceMappingURL=fetch.js.map