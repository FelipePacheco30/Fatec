"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingLeadObserver = void 0;
/** Observador que apenas loga eventos (ex.: para auditoria ou integrações futuras). */
class LoggingLeadObserver {
    onLeadAtualizada(lead, alteracoes) {
        const partes = [`Lead ${lead.id} (${lead.nomeCliente})`];
        if (alteracoes.estagio)
            partes.push(`estágio -> ${alteracoes.estagio}`);
        if (alteracoes.status)
            partes.push(`status -> ${alteracoes.status}`);
        console.log('[LeadObserver]', partes.join(', '));
    }
}
exports.LoggingLeadObserver = LoggingLeadObserver;
