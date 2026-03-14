/**
 * Padrão Chain of Responsibility (comportamental): encadeia validadores
 * para os dados de cadastro da lead. Cada handler pode repassar ou rejeitar.
 */
export interface ValidationResult {
  valido: boolean;
  mensagem?: string;
}

export interface IValidationHandler<T> {
  setProximo(handler: IValidationHandler<T>): IValidationHandler<T>;
  validar(dados: T): ValidationResult;
}

export abstract class BaseValidationHandler<T> implements IValidationHandler<T> {
  protected proximo: IValidationHandler<T> | null = null;

  setProximo(handler: IValidationHandler<T>): IValidationHandler<T> {
    this.proximo = handler;
    return handler;
  }

  validar(dados: T): ValidationResult {
    const resultado = this.executarValidacao(dados);
    if (!resultado.valido) return resultado;
    if (this.proximo) return this.proximo.validar(dados);
    return { valido: true };
  }

  protected abstract executarValidacao(dados: T): ValidationResult;
}
