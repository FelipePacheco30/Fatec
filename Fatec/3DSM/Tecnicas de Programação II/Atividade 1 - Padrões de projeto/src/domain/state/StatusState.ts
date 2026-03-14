import type { Status } from '../../config/constants';
import { TRANSICOES_STATUS } from '../../config/constants';

/**
 * Padrão State (comportamental): representa o estado do status da negociação.
 * Encapsula as transições permitidas; lead finalizada não pode mais evoluir.
 */
export interface IStatusState {
  getStatus(): Status;
  podeTransicionarPara(proximo: Status): boolean;
  transicionar(proximo: Status): IStatusState;
  isFinalizado(): boolean;
}

export class StatusState implements IStatusState {
  constructor(private readonly status: Status) {}

  getStatus(): Status {
    return this.status;
  }

  podeTransicionarPara(proximo: Status): boolean {
    const permitidos = TRANSICOES_STATUS[this.status];
    return permitidos.includes(proximo);
  }

  transicionar(proximo: Status): IStatusState {
    if (!this.podeTransicionarPara(proximo)) {
      throw new Error(
        `Transição de status inválida: ${this.status} -> ${proximo}`
      );
    }
    return new StatusState(proximo);
  }

  isFinalizado(): boolean {
    return (
      this.status === 'Finalizado com venda' ||
      this.status === 'Finalizado sem venda'
    );
  }
}
