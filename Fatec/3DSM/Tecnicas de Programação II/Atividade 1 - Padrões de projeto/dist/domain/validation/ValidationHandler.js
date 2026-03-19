"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidationHandler = void 0;
class BaseValidationHandler {
    constructor() {
        this.proximo = null;
    }
    // [Chain of Responsibility] Encadeia o handler atual com o proximo.
    setProximo(handler) {
        this.proximo = handler;
        return handler;
    }
    // [Chain of Responsibility] Executa validacao local e decide se continua a cadeia.
    validar(dados) {
        const resultado = this.executarValidacao(dados);
        if (!resultado.valido)
            return resultado;
        if (this.proximo)
            return this.proximo.validar(dados);
        return { valido: true };
    }
}
exports.BaseValidationHandler = BaseValidationHandler;
