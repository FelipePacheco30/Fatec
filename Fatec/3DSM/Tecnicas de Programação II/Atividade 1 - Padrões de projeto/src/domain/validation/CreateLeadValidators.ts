import { CANAIS_ORIGEM } from '../../config/constants';
import type { CreateLeadRequest } from '../entities/Lead';
import { BaseValidationHandler } from './ValidationHandler';

export class CamposObrigatoriosValidator extends BaseValidationHandler<CreateLeadRequest> {
  // [Chain] Regra: garante que os campos minimos existem.
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
  // [Chain] Regra: garante que canalOrigem esta na lista permitida.
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

const ONZE_DIGITOS = 11;

function digitosTelefone(raw: string): string {
  return (raw ?? '').replace(/\D/g, '').slice(0, ONZE_DIGITOS);
}

/** [Chain] Formato de nome, telefone (11 dígitos) e veículo (letras+números, sem especiais). */
export class DadosLeadFormatoValidator extends BaseValidationHandler<CreateLeadRequest> {
  protected executarValidacao(dados: CreateLeadRequest) {
    const nome = dados.nomeCliente?.trim() ?? '';
    if (!/^[\p{L}\s]+$/u.test(nome) || !/[\p{L}]/u.test(nome)) {
      return {
        valido: false,
        mensagem: 'Nome deve conter apenas letras (e espaços entre palavras).',
      };
    }

    const tel = digitosTelefone(dados.telefone ?? '');
    if (tel.length !== ONZE_DIGITOS) {
      return {
        valido: false,
        mensagem:
          'Telefone deve ter 11 dígitos (DDD + número celular), no formato XX XXXXX-XXXX.',
      };
    }

    const veiculo = dados.veiculoInteresse?.trim() ?? '';
    if (!/^(?=.*\p{L})(?=.*\p{N})[\p{L}\p{N}\s]+$/u.test(veiculo)) {
      return {
        valido: false,
        mensagem:
          'Veículo de interesse deve combinar letras e números, sem caracteres especiais.',
      };
    }

    return { valido: true };
  }
}
