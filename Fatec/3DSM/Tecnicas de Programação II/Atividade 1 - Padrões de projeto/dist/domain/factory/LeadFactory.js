"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadFactory = void 0;
const constants_1 = require("../../config/constants");
class LeadFactory {
    // [Factory] Cria um LeadDto com configuracao inicial padrao (estagio/status).
    criar(input, id) {
        const now = new Date().toISOString();
        return {
            id,
            nomeCliente: input.nomeCliente,
            telefone: input.telefone,
            canalOrigem: input.canalOrigem,
            veiculoInteresse: input.veiculoInteresse,
            estagio: LeadFactory.ESTAGIO_INICIAL,
            status: LeadFactory.STATUS_INICIAL,
            createdAt: now,
            updatedAt: now,
        };
    }
}
exports.LeadFactory = LeadFactory;
LeadFactory.ESTAGIO_INICIAL = constants_1.ESTAGIOS[0]; // Contato inicial
LeadFactory.STATUS_INICIAL = constants_1.STATUS[0]; // Aberto
