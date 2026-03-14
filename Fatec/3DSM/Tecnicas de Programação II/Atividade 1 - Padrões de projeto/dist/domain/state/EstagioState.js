"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstagioState = void 0;
const constants_1 = require("../../config/constants");
class EstagioState {
    constructor(estagio) {
        this.estagio = estagio;
    }
    getEstagio() {
        return this.estagio;
    }
    podeTransicionarPara(proximo) {
        const permitidos = constants_1.TRANSICOES_ESTAGIO[this.estagio];
        return permitidos.includes(proximo);
    }
    transicionar(proximo) {
        if (!this.podeTransicionarPara(proximo)) {
            throw new Error(`Transição de estágio inválida: ${this.estagio} -> ${proximo}`);
        }
        return new EstagioState(proximo);
    }
}
exports.EstagioState = EstagioState;
