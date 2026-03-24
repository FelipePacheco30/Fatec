import type { CreateLeadRequest } from '../entities/Lead';
import {
  CamposObrigatoriosValidator,
  CanalOrigemValidator,
  DadosLeadFormatoValidator,
} from './CreateLeadValidators';
import type { IValidationHandler, ValidationResult } from './ValidationHandler';

export function createLeadValidationChain(): IValidationHandler<CreateLeadRequest> {
  // [Chain of Responsibility] Montagem fixa da cadeia para cadastro:
  // Campos obrigatorios -> canal de origem -> formato (nome, telefone, veículo)
  const obrigatorios = new CamposObrigatoriosValidator();
  const canal = new CanalOrigemValidator();
  const formato = new DadosLeadFormatoValidator();
  obrigatorios.setProximo(canal);
  canal.setProximo(formato);
  return obrigatorios;
}

export type { ValidationResult, IValidationHandler } from './ValidationHandler';
