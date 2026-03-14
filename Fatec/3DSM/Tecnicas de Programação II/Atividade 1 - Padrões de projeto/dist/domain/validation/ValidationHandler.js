"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidationHandler = void 0;
class BaseValidationHandler {
    constructor() {
        this.proximo = null;
    }
    setProximo(handler) {
        this.proximo = handler;
        return handler;
    }
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
