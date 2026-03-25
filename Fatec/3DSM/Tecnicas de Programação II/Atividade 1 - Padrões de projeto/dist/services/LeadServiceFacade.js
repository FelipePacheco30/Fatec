"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadServiceFacade = void 0;
const EstagioState_1 = require("../domain/state/EstagioState");
const StatusState_1 = require("../domain/state/StatusState");
class LeadServiceFacade {
    constructor(
    // [Composition/DI] O facade recebe suas dependencias prontas.
    // Isso deixa o fluxo de negocio centralizado e facilita trocar implementacoes (ex.: repository).
    leadFactory, repository, subject, gerarId) {
        this.leadFactory = leadFactory;
        this.repository = repository;
        this.subject = subject;
        this.gerarId = gerarId;
    }
    // [Facade] Orquestra o fluxo completo de cadastro:
    // Factory (estado inicial) -> Repository (persistencia em memoria) -> resposta da API.
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
    // [Facade] Orquestra a evolucao da negociacao:
    // 1) bloqueia se a lead ja esta finalizada
    // 2) valida/transiciona estagio e/ou status via State
    // 3) persiste atualizacao
    // 4) notifica observadores (Observer)
    evoluirNegociacao(id, input) {
        const lead = this.repository.buscarPorId(id);
        if (!lead)
            return { sucesso: false, erro: 'Lead não encontrada.' };
        // [State] Regra de negocio: status finalizado impede evolucao.
        const statusState = new StatusState_1.StatusState(lead.status);
        if (statusState.isFinalizado()) {
            return { sucesso: false, erro: 'Lead finalizada não pode evoluir na negociação.' };
        }
        const alteracoes = {};
        let estagioAtual = lead.estagio;
        let statusAtual = lead.status;
        try {
            // [State] Estágio primeiro (se houver): coerência do status usa o estágio já atualizado na mesma requisição.
            if (input.estagio) {
                const estagioState = new EstagioState_1.EstagioState(lead.estagio);
                const novoState = estagioState.transicionar(input.estagio);
                estagioAtual = novoState.getEstagio();
                alteracoes.estagio = estagioAtual;
            }
            // [State] Status depois (se houver), com transições permitidas a partir do status atual gravado.
            if (input.status) {
                const estagioParaCoerencia = estagioAtual;
                if (input.status === 'Em negociação' && estagioParaCoerencia === 'Contato inicial') {
                    throw new Error('Status "Em negociação" só é permitido após avançar o estágio além de "Contato inicial".');
                }
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
        // [Facade] Persistimos e entao emitimos o evento de mudanca.
        this.repository.atualizar(id, atualizada);
        this.subject.notificar(atualizada, alteracoes);
        return { sucesso: true, lead: atualizada };
    }
}
exports.LeadServiceFacade = LeadServiceFacade;
