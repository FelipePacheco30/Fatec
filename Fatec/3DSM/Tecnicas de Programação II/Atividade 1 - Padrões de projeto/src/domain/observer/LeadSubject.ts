import type { LeadDto } from '../entities/Lead';
import type { Estagio, Status } from '../../config/constants';
import type { ILeadObserver } from './LeadObserver';

/**
 * Sujeito do padrão Observer: mantém lista de observadores e notifica
 * quando a lead é atualizada (mudança de estágio/status).
 */
export class LeadSubject {
  private readonly observers: ILeadObserver[] = [];

  adicionarObserver(observer: ILeadObserver): void {
    this.observers.push(observer);
  }

  removerObserver(observer: ILeadObserver): void {
    const idx = this.observers.indexOf(observer);
    if (idx >= 0) this.observers.splice(idx, 1);
  }

  notificar(lead: LeadDto, alteracoes: { estagio?: Estagio; status?: Status }): void {
    for (const obs of this.observers) {
      obs.onLeadAtualizada(lead, alteracoes);
    }
  }
}
