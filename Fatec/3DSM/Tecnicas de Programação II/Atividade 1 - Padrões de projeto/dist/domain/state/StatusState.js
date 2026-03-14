"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusState = void 0;
const constants_1 = require("../../config/constants");
class StatusState {
    constructor(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    podeTransicionarPara(proximo) {
        const permitidos = constants_1.TRANSICOES_STATUS[this.status];
        return permitidos.includes(proximo);
    }
    transicionar(proximo) {
        if (!this.podeTransicionarPara(proximo)) {
            throw new Error(`Transição de status inválida: ${this.status} -> ${proximo}`);
        }
        return new StatusState(proximo);
    }
    isFinalizado() {
        return (this.status === 'Finalizado com venda' ||
            this.status === 'Finalizado sem venda');
    }
}
exports.StatusState = StatusState;
