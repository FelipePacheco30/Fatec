"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DadosLeadFormatoValidator = exports.CanalOrigemValidator = exports.CamposObrigatoriosValidator = void 0;
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
const ONZE_DIGITOS = 11;
function digitosTelefone(raw) {
    return (raw ?? '').replace(/\D/g, '').slice(0, ONZE_DIGITOS);
}
/** [Chain] Formato de nome, telefone (11 dígitos) e veículo (letras+números, sem especiais). */
class DadosLeadFormatoValidator extends ValidationHandler_1.BaseValidationHandler {
    executarValidacao(dados) {
        const nome = dados.nomeCliente?.trim() ?? '';
        if (!/^[\p{L}\s]+$/u.test(nome) || !/[\p{L}]/u.test(nome)) {
            return {
                valido: false,
                mensagem: 'Nome deve conter apenas letras (e espaços entre palavras).',
            };
        }
        const tel = digitosTelefone(dados.telefone ?? '');
        if (tel.length !== ONZE_DIGITOS) {
            return {
                valido: false,
                mensagem: 'Telefone deve ter 11 dígitos (DDD + número celular), no formato XX XXXXX-XXXX.',
            };
        }
        const veiculo = dados.veiculoInteresse?.trim() ?? '';
        if (!/^(?=.*\p{L})(?=.*\p{N})[\p{L}\p{N}\s]+$/u.test(veiculo)) {
            return {
                valido: false,
                mensagem: 'Veículo de interesse deve combinar letras e números, sem caracteres especiais.',
            };
        }
        return { valido: true };
    }
}
exports.DadosLeadFormatoValidator = DadosLeadFormatoValidator;
