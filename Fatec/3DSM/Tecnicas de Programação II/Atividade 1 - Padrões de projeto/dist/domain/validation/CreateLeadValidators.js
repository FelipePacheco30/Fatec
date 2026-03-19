"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanalOrigemValidator = exports.CamposObrigatoriosValidator = void 0;
const constants_1 = require("../../config/constants");
const ValidationHandler_1 = require("./ValidationHandler");
class CamposObrigatoriosValidator extends ValidationHandler_1.BaseValidationHandler {
    // [Chain] Regra: garante que os campos minimos existem.
    executarValidacao(dados) {
        if (!dados.nomeCliente?.trim()) {
            return { valido: false, mensagem: 'Nome do cliente é obrigatório.' };
        }
        if (!dados.telefone?.trim()) {
            return { valido: false, mensagem: 'Telefone é obrigatório.' };
        }
        if (!dados.canalOrigem) {
            return { valido: false, mensagem: 'Canal de origem é obrigatório.' };
        }
        if (!dados.veiculoInteresse?.trim()) {
            return { valido: false, mensagem: 'Veículo de interesse é obrigatório.' };
        }
        return { valido: true };
    }
}
exports.CamposObrigatoriosValidator = CamposObrigatoriosValidator;
class CanalOrigemValidator extends ValidationHandler_1.BaseValidationHandler {
    // [Chain] Regra: garante que canalOrigem esta na lista permitida.
    executarValidacao(dados) {
        const canal = dados.canalOrigem?.trim().toLowerCase();
        const validos = constants_1.CANAIS_ORIGEM.map((c) => c.toLowerCase());
        if (!canal || !validos.includes(canal)) {
            return {
                valido: false,
                mensagem: `Canal de origem inválido. Permitidos: ${constants_1.CANAIS_ORIGEM.join(', ')}.`,
            };
        }
        return { valido: true };
    }
}
exports.CanalOrigemValidator = CanalOrigemValidator;
