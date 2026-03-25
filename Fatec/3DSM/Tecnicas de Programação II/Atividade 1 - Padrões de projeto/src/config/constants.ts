/**
 * Constantes do domínio: canais, estágios e status válidos.
 */

export const CANAIS_ORIGEM = [
  'visita presencial',
  'telefone',
  'WhatsApp',
  'Instagram',
] as const;

export type CanalOrigem = (typeof CANAIS_ORIGEM)[number];

/** Normaliza string do cliente para um CanalOrigem válido (case-insensitive). */
export function normalizarCanal(value: string): CanalOrigem | null {
  const v = value?.trim().toLowerCase();
  const found = CANAIS_ORIGEM.find((c) => c.toLowerCase() === v);
  return found ?? null;
}

export const ESTAGIOS = [
  'Contato inicial',
  'Enviou proposta',
  'Aguardando resposta do cliente',
  'Aguardando pagamento',
] as const;

export type Estagio = (typeof ESTAGIOS)[number];

export const STATUS = [
  'Aberto',
  'Em negociação',
  'Finalizado com venda',
  'Finalizado sem venda',
] as const;

export type Status = (typeof STATUS)[number];

/** Transições de estágio permitidas (de -> para). */
export const TRANSICOES_ESTAGIO: Record<Estagio, Estagio[]> = {
  'Contato inicial': ['Enviou proposta'],
  'Enviou proposta': ['Aguardando resposta do cliente'],
  'Aguardando resposta do cliente': ['Aguardando pagamento'],
  'Aguardando pagamento': [],
};

/** Transições de status permitidas (de -> para). */
export const TRANSICOES_STATUS: Record<Status, Status[]> = {
  'Aberto': ['Em negociação'],
  'Em negociação': ['Finalizado com venda', 'Finalizado sem venda'],
  'Finalizado com venda': [],
  'Finalizado sem venda': [],
};
