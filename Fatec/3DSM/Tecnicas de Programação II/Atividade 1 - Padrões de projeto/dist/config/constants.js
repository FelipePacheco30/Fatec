"use strict";
/**
 * Constantes do domínio: canais, estágios e status válidos.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSICOES_STATUS = exports.TRANSICOES_ESTAGIO = exports.STATUS = exports.ESTAGIOS = exports.CANAIS_ORIGEM = void 0;
exports.normalizarCanal = normalizarCanal;
exports.CANAIS_ORIGEM = [
    'visita presencial',
    'telefone',
    'WhatsApp',
    'Instagram',
];
/** Normaliza string do cliente para um CanalOrigem válido (case-insensitive). */
function normalizarCanal(value) {
    const v = value?.trim().toLowerCase();
    const found = exports.CANAIS_ORIGEM.find((c) => c.toLowerCase() === v);
    return found ?? null;
}
exports.ESTAGIOS = [
    'Contato inicial',
    'Enviou proposta',
    'Aguardando resposta do cliente',
    'Aguardando pagamento',
];
exports.STATUS = [
    'Aberto',
    'Em negociação',
    'Finalizado com venda',
    'Finalizado sem venda',
];
/** Transições de estágio permitidas (de -> para). */
exports.TRANSICOES_ESTAGIO = {
    'Contato inicial': ['Enviou proposta'],
    'Enviou proposta': ['Aguardando resposta do cliente'],
    'Aguardando resposta do cliente': ['Aguardando pagamento', 'Enviou proposta'],
    'Aguardando pagamento': [],
};
/** Transições de status permitidas (de -> para). */
exports.TRANSICOES_STATUS = {
    'Aberto': ['Em negociação'],
    'Em negociação': ['Finalizado com venda', 'Finalizado sem venda'],
    'Finalizado com venda': [],
    'Finalizado sem venda': [],
};
