import type { CreateLeadRequest } from '../entities/Lead';
import { CamposObrigatoriosValidator, CanalOrigemValidator } from './CreateLeadValidators';
import type { IValidationHandler, ValidationResult } from './ValidationHandler';

export function createLeadValidationChain(): IValidationHandler<CreateLeadRequest> {
  // [Chain of Responsibility] Montagem fixa da cadeia para cadastro:
  // Campos obrigatorios -> canal de origem
  const obrigatorios = new CamposObrigatoriosValidator();
  const canal = new CanalOrigemValidator();
  obrigatorios.setProximo(canal);
  return obrigatorios;
}

export type { ValidationResult, IValidationHandler } from './ValidationHandler';
