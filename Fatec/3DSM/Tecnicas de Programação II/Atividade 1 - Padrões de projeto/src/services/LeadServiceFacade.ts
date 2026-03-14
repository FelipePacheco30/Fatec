import type { Estagio, Status } from '../config/constants';
import type { CreateLeadInput, LeadDto, EvoluirNegociacaoInput } from '../domain/entities/Lead';
import type { ILeadFactory } from '../domain/factory/LeadFactory';
import { EstagioState } from '../domain/state/EstagioState';
import { StatusState } from '../domain/state/StatusState';
import type { ILeadRepository } from '../repositories/LeadRepository';
import { LeadSubject } from '../domain/observer/LeadSubject';

/**
 * Padrão Facade (estrutural): simplifica o fluxo de criação e evolução da negociação,
 * ocultando Factory, State e Observer. A validação (Chain of Responsibility) é feita na camada de rota.
 */
export interface ILeadServiceFacade {
  cadastrarLead(input: CreateLeadInput): { sucesso: true; lead: LeadDto } | { sucesso: false; erro: string };
  listarLeads(): LeadDto[];
  obterLead(id: string): LeadDto | null;
  evoluirNegociacao(id: string, input: EvoluirNegociacaoInput): { sucesso: true; lead: LeadDto } | { sucesso: false; erro: string };
}

export class LeadServiceFacade implements ILeadServiceFacade {
  constructor(
    private readonly leadFactory: ILeadFactory,
    private readonly repository: ILeadRepository,
    private readonly subject: LeadSubject,
    private readonly gerarId: () => string
  ) {}

  cadastrarLead(
    input: CreateLeadInput
  ): { sucesso: true; lead: LeadDto } | { sucesso: false; erro: string } {
    const id = this.gerarId();
    const lead = this.leadFactory.criar(input, id);
    this.repository.salvar(lead);
    return { sucesso: true, lead };
  }

  listarLeads(): LeadDto[] {
    return this.repository.listar();
  }

  obterLead(id: string): LeadDto | null {
    return this.repository.buscarPorId(id);
  }

  evoluirNegociacao(
    id: string,
    input: EvoluirNegociacaoInput
  ): { sucesso: true; lead: LeadDto } | { sucesso: false; erro: string } {
    const lead = this.repository.buscarPorId(id);
    if (!lead) return { sucesso: false, erro: 'Lead não encontrada.' };

    const statusState = new StatusState(lead.status);
    if (statusState.isFinalizado()) {
      return { sucesso: false, erro: 'Lead finalizada não pode evoluir na negociação.' };
    }

    const alteracoes: { estagio?: Estagio; status?: Status } = {};
    let estagioAtual = lead.estagio;
    let statusAtual = lead.status;

    try {
      if (input.estagio) {
        const estagioState = new EstagioState(lead.estagio);
        const novoState = estagioState.transicionar(input.estagio);
        estagioAtual = novoState.getEstagio();
        alteracoes.estagio = estagioAtual;
      }
      if (input.status) {
        const statusStateAtual = new StatusState(lead.status);
        const novoStatusState = statusStateAtual.transicionar(input.status);
        statusAtual = novoStatusState.getStatus();
        alteracoes.status = statusAtual;
      }
    } catch (e) {
      return {
        sucesso: false,
        erro: e instanceof Error ? e.message : 'Transição inválida.',
      };
    }

    if (!alteracoes.estagio && !alteracoes.status) {
      return { sucesso: false, erro: 'Informe pelo menos estágio ou status para evoluir.' };
    }

    const atualizada: LeadDto = {
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
