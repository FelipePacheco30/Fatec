import type { CanalOrigem } from '../../config/constants';
import { ESTAGIOS, STATUS } from '../../config/constants';
import type { CreateLeadInput, LeadDto } from '../entities/Lead';

/**
 * Padrão Factory (criacional): cria uma lead com configuração inicial
 * conforme o canal de origem (estágio e status iniciais são padronizados,
 * mas a factory centraliza a criação e pode evoluir para lógica por canal).
 */
export interface ILeadFactory {
  criar(input: CreateLeadInput, id: string): LeadDto;
}

export class LeadFactory implements ILeadFactory {
  private static readonly ESTAGIO_INICIAL = ESTAGIOS[0]; // Contato inicial
  private static readonly STATUS_INICIAL = STATUS[0]; // Aberto

  // [Factory] Cria um LeadDto com configuracao inicial padrao (estagio/status).
  criar(input: CreateLeadInput, id: string): LeadDto {
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
