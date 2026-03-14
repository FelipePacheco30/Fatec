"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadSubject = void 0;
/**
 * Sujeito do padrão Observer: mantém lista de observadores e notifica
 * quando a lead é atualizada (mudança de estágio/status).
 */
class LeadSubject {
    constructor() {
        this.observers = [];
    }
    adicionarObserver(observer) {
        this.observers.push(observer);
    }
    removerObserver(observer) {
        const idx = this.observers.indexOf(observer);
        if (idx >= 0)
            this.observers.splice(idx, 1);
    }
    notificar(lead, alteracoes) {
        for (const obs of this.observers) {
            obs.onLeadAtualizada(lead, alteracoes);
        }
    }
}
exports.LeadSubject = LeadSubject;
