"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadServiceFacade = void 0;
const EstagioState_1 = require("../domain/state/EstagioState");
const StatusState_1 = require("../domain/state/StatusState");
class LeadServiceFacade {
    constructor(leadFactory, repository, subject, gerarId) {
        this.leadFactory = leadFactory;
        this.repository = repository;
        this.subject = subject;
        this.gerarId = gerarId;
    }
    cadastrarLead(input) {
        const id = this.gerarId();
        const lead = this.leadFactory.criar(input, id);
        this.repository.salvar(lead);
        return { sucesso: true, lead };
    }
    listarLeads() {
        return this.repository.listar();
    }
    obterLead(id) {
        return this.repository.buscarPorId(id);
    }
    evoluirNegociacao(id, input) {
        const lead = this.repository.buscarPorId(id);
        if (!lead)
            return { sucesso: false, erro: 'Lead não encontrada.' };
        const statusState = new StatusState_1.StatusState(lead.status);
        if (statusState.isFinalizado()) {
            return { sucesso: false, erro: 'Lead finalizada não pode evoluir na negociação.' };
        }
        const alteracoes = {};
        let estagioAtual = lead.estagio;
        let statusAtual = lead.status;
        try {
            if (input.estagio) {
                const estagioState = new EstagioState_1.EstagioState(lead.estagio);
                const novoState = estagioState.transicionar(input.estagio);
                estagioAtual = novoState.getEstagio();
                alteracoes.estagio = estagioAtual;
            }
            if (input.status) {
                const statusStateAtual = new StatusState_1.StatusState(lead.status);
                const novoStatusState = statusStateAtual.transicionar(input.status);
                statusAtual = novoStatusState.getStatus();
                alteracoes.status = statusAtual;
            }
        }
        catch (e) {
            return {
                sucesso: false,
                erro: e instanceof Error ? e.message : 'Transição inválida.',
            };
        }
        if (!alteracoes.estagio && !alteracoes.status) {
            return { sucesso: false, erro: 'Informe pelo menos estágio ou status para evoluir.' };
        }
        const atualizada = {
            ...lead,
            estagio: estagioAtual,
            status: statusAtual,
            updatedAt: new Date().toISOString(),
        };
        this.repository.atualizar(id, atualizada);
        this.subject.notificar(atualizada, alteracoes);
        return { sucesso: true, lead: atualizada };
    }
}
exports.LeadServiceFacade = LeadServiceFacade;
