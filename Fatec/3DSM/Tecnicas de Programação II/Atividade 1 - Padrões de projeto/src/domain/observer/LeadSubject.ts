import type { LeadDto } from '../entities/Lead';
import type { Estagio, Status } from '../../config/constants';
import type { ILeadObserver } from './LeadObserver';

/**
 * Sujeito do padrão Observer: mantém lista de observadores e notifica
 * quando a lead é atualizada (mudança de estágio/status).
 */
export class LeadSubject {
  // [Observer] lista de observadores inscritos.
  // Cada observador reage quando a lead e atualizada (mudanca de estagio/status).
  private readonly observers: ILeadObserver[] = [];

  // [Observer] Adiciona um novo observador.
  adicionarObserver(observer: ILeadObserver): void {
    this.observers.push(observer);
  }

  // [Observer] Remove um observador (caso precise desligar algum listener).
  removerObserver(observer: ILeadObserver): void {
    const idx = this.observers.indexOf(observer);
    if (idx >= 0) this.observers.splice(idx, 1);
  }

  // [Observer] Notifica todos os observadores sobre o que mudou.
  notificar(lead: LeadDto, alteracoes: { estagio?: Estagio; status?: Status }): void {
    for (const obs of this.observers) {
      obs.onLeadAtualizada(lead, alteracoes);
    }
  }
}
