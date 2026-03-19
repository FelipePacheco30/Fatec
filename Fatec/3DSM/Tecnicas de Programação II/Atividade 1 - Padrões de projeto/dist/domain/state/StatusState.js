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
    // [State] Consulta a tabela de transicoes permitidas (de -> para).
    podeTransicionarPara(proximo) {
        const permitidos = constants_1.TRANSICOES_STATUS[this.status];
        return permitidos.includes(proximo);
    }
    // [State] Se a transicao nao for permitida, lancamos erro.
    transicionar(proximo) {
        if (!this.podeTransicionarPara(proximo)) {
            throw new Error(`Transição de status inválida: ${this.status} -> ${proximo}`);
        }
        return new StatusState(proximo);
    }
    // [State] Regra: quando finalizado (com venda ou sem venda),
    // a lead nao pode mais evoluir.
    isFinalizado() {
        return (this.status === 'Finalizado com venda' ||
            this.status === 'Finalizado sem venda');
    }
}
exports.StatusState = StatusState;
