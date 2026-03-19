"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadSubject = void 0;
/**
 * Sujeito do padrão Observer: mantém lista de observadores e notifica
 * quando a lead é atualizada (mudança de estágio/status).
 */
class LeadSubject {
    constructor() {
        // [Observer] lista de observadores inscritos.
        // Cada observador reage quando a lead e atualizada (mudanca de estagio/status).
        this.observers = [];
    }
    // [Observer] Adiciona um novo observador.
    adicionarObserver(observer) {
        this.observers.push(observer);
    }
    // [Observer] Remove um observador (caso precise desligar algum listener).
    removerObserver(observer) {
        const idx = this.observers.indexOf(observer);
        if (idx >= 0)
            this.observers.splice(idx, 1);
    }
    // [Observer] Notifica todos os observadores sobre o que mudou.
    notificar(lead, alteracoes) {
        for (const obs of this.observers) {
            obs.onLeadAtualizada(lead, alteracoes);
        }
    }
}
exports.LeadSubject = LeadSubject;
