import type { LeadDto } from '../entities/Lead';
import type { Estagio, Status } from '../../config/constants';

/**
 * Padrão Observer (comportamental): observador de mudanças em leads.
 * Notificado quando uma lead muda de estágio ou status.
 */
export interface ILeadObserver {
  onLeadAtualizada(lead: LeadDto, alteracoes: { estagio?: Estagio; status?: Status }): void;
}

/** Observador que apenas loga eventos (ex.: para auditoria ou integrações futuras). */
export class LoggingLeadObserver implements ILeadObserver {
  // [Observer] Trata o evento de mudanca de uma lead (estagio/status) e registra em log.
  onLeadAtualizada(
    lead: LeadDto,
    alteracoes: { estagio?: Estagio; status?: Status }
  ): void {
    const partes: string[] = [`Lead ${lead.id} (${lead.nomeCliente})`];
    if (alteracoes.estagio) partes.push(`estágio -> ${alteracoes.estagio}`);
    if (alteracoes.status) partes.push(`status -> ${alteracoes.status}`);
    console.log('[LeadObserver]', partes.join(', '));
  }
}
