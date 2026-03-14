import type { CanalOrigem, Estagio, Status } from '../../config/constants';

export interface LeadDto {
  id: string;
  nomeCliente: string;
  telefone: string;
  canalOrigem: CanalOrigem;
  veiculoInteresse: string;
  estagio: Estagio;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

/** Dados para criação (uso interno, canal já normalizado). */
export interface CreateLeadInput {
  nomeCliente: string;
  telefone: string;
  canalOrigem: CanalOrigem;
  veiculoInteresse: string;
}

/** Request da API (canal como string para normalização). */
export interface CreateLeadRequest {
  nomeCliente: string;
  telefone: string;
  canalOrigem: string;
  veiculoInteresse: string;
}

export interface EvoluirNegociacaoInput {
  estagio?: Estagio;
  status?: Status;
}
