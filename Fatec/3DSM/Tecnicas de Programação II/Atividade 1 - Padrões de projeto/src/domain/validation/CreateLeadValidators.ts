import { CANAIS_ORIGEM } from '../../config/constants';
import type { CreateLeadRequest } from '../entities/Lead';
import { BaseValidationHandler } from './ValidationHandler';

export class CamposObrigatoriosValidator extends BaseValidationHandler<CreateLeadRequest> {
  protected executarValidacao(dados: CreateLeadRequest) {
    if (!dados.nomeCliente?.trim()) {
      return { valido: false, mensagem: 'Nome do cliente é obrigatório.' };
    }
    if (!dados.telefone?.trim()) {
      return { valido: false, mensagem: 'Telefone é obrigatório.' };
    }
    if (!dados.canalOrigem) {
      return { valido: false, mensagem: 'Canal de origem é obrigatório.' };
    }
    if (!dados.veiculoInteresse?.trim()) {
      return { valido: false, mensagem: 'Veículo de interesse é obrigatório.' };
    }
    return { valido: true };
  }
}

export class CanalOrigemValidator extends BaseValidationHandler<CreateLeadRequest> {
  protected executarValidacao(dados: CreateLeadRequest) {
    const canal = dados.canalOrigem?.trim().toLowerCase();
    const validos = CANAIS_ORIGEM.map((c) => c.toLowerCase());
    if (!canal || !validos.includes(canal)) {
      return {
        valido: false,
        mensagem: `Canal de origem inválido. Permitidos: ${CANAIS_ORIGEM.join(', ')}.`,
      };
    }
    return { valido: true };
  }
}
