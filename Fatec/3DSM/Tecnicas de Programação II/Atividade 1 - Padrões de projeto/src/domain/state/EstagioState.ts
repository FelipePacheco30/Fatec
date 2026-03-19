import type { Estagio } from '../../config/constants';
import { TRANSICOES_ESTAGIO } from '../../config/constants';

/**
 * Padrão State (comportamental): representa o estado do estágio da negociação.
 * Encapsula as transições permitidas e valida a mudança de estágio.
 */
export interface IEstagioState {
  getEstagio(): Estagio;
  podeTransicionarPara(proximo: Estagio): boolean;
  transicionar(proximo: Estagio): IEstagioState;
}

export class EstagioState implements IEstagioState {
  constructor(private readonly estagio: Estagio) {}

  getEstagio(): Estagio {
    return this.estagio;
  }

  // [State] Consulta a tabela de transicoes permitidas e verifica se existe o "de -> para".
  podeTransicionarPara(proximo: Estagio): boolean {
    const permitidos = TRANSICOES_ESTAGIO[this.estagio];
    return permitidos.includes(proximo);
  }

  // [State] Se a transicao nao for permitida, lancamos erro (bloqueia evolucao incoerente).
  transicionar(proximo: Estagio): IEstagioState {
    if (!this.podeTransicionarPara(proximo)) {
      throw new Error(
        `Transição de estágio inválida: ${this.estagio} -> ${proximo}`
      );
    }
    return new EstagioState(proximo);
  }
}
