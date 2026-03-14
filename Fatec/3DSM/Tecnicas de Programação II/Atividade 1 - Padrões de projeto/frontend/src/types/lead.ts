export type CanalOrigem =
  | "visita presencial"
  | "telefone"
  | "WhatsApp"
  | "Instagram";

export type Estagio =
  | "Contato inicial"
  | "Enviou proposta"
  | "Aguardando resposta do cliente"
  | "Aguardando pagamento";

export type Status =
  | "Aberto"
  | "Em negociação"
  | "Finalizado com venda"
  | "Finalizado sem venda";

export interface Lead {
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

export interface LeadListItem {
  id: string;
  nomeCliente: string;
  origem: CanalOrigem;
  veiculoInteresse: string;
  estagio: Estagio;
  status: Status;
}

export interface CreateLeadRequest {
  nomeCliente: string;
  telefone: string;
  canalOrigem: string;
  veiculoInteresse: string;
}

export interface EvoluirNegociacaoRequest {
  estagio?: Estagio;
  status?: Status;
}

export const CANAIS_ORIGEM: CanalOrigem[] = [
  "visita presencial",
  "telefone",
  "WhatsApp",
  "Instagram",
];

export const ESTAGIOS: Estagio[] = [
  "Contato inicial",
  "Enviou proposta",
  "Aguardando resposta do cliente",
  "Aguardando pagamento",
];

export const STATUS: Status[] = [
  "Aberto",
  "Em negociação",
  "Finalizado com venda",
  "Finalizado sem venda",
];
