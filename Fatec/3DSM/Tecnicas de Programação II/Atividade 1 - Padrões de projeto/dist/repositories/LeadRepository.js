"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepositoryEmMemoria = void 0;
class LeadRepositoryEmMemoria {
    constructor() {
        this.leads = new Map();
    }
    salvar(lead) {
        this.leads.set(lead.id, lead);
        return lead;
    }
    listar() {
        return Array.from(this.leads.values());
    }
    buscarPorId(id) {
        return this.leads.get(id) ?? null;
    }
    atualizar(id, lead) {
        if (!this.leads.has(id))
            return null;
        this.leads.set(id, lead);
        return lead;
    }
}
exports.LeadRepositoryEmMemoria = LeadRepositoryEmMemoria;
