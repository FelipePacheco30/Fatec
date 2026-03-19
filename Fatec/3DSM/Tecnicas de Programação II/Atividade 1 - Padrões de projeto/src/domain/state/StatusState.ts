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

  // [State] Consulta a tabela de transicoes permitidas (de -> para).
  podeTransicionarPara(proximo: Status): boolean {
    const permitidos = TRANSICOES_STATUS[this.status];
    return permitidos.includes(proximo);
  }

  // [State] Se a transicao nao for permitida, lancamos erro.
  transicionar(proximo: Status): IStatusState {
    if (!this.podeTransicionarPara(proximo)) {
      throw new Error(
        `Transição de status inválida: ${this.status} -> ${proximo}`
      );
    }
    return new StatusState(proximo);
  }

  // [State] Regra: quando finalizado (com venda ou sem venda),
  // a lead nao pode mais evoluir.
  isFinalizado(): boolean {
    return (
      this.status === 'Finalizado com venda' ||
      this.status === 'Finalizado sem venda'
    );
  }
}
