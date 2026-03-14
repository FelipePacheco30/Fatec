import { Router, Request, Response } from 'express';
import type { ILeadServiceFacade } from '../services/LeadServiceFacade';
import type { CreateLeadRequest } from '../domain/entities/Lead';
import { normalizarCanal } from '../config/constants';
import { ESTAGIOS, STATUS } from '../config/constants';
import type { Estagio, Status } from '../config/constants';
import { createLeadValidationChain } from '../domain/validation';

function createLeadsRouter(facade: ILeadServiceFacade, validationChain: ReturnType<typeof createLeadValidationChain>) {
  const router = Router();

  /** POST /leads - Cadastro de lead */
  router.post('/', (req: Request, res: Response) => {
    const body = req.body as CreateLeadRequest;
    const validacao = validationChain.validar(body);
    if (!validacao.valido) {
      return res.status(400).json({ erro: validacao.mensagem });
    }
    const canal = normalizarCanal(body.canalOrigem);
    if (!canal) {
      return res.status(400).json({ erro: 'Canal de origem inválido.' });
    }
    const resultado = facade.cadastrarLead({
      nomeCliente: body.nomeCliente.trim(),
      telefone: body.telefone.trim(),
      canalOrigem: canal,
      veiculoInteresse: body.veiculoInteresse.trim(),
    });
    if (!resultado.sucesso) {
      return res.status(400).json({ erro: resultado.erro });
    }
    return res.status(201).json(resultado.lead);
  });

  /** GET /leads - Listagem de leads */
  router.get('/', (_req: Request, res: Response) => {
    const leads = facade.listarLeads();
    const listagem = leads.map((l) => ({
      id: l.id,
      nomeCliente: l.nomeCliente,
      origem: l.canalOrigem,
      veiculoInteresse: l.veiculoInteresse,
      estagio: l.estagio,
      status: l.status,
    }));
    return res.json(listagem);
  });

  /** GET /leads/:id - Detalhes de uma lead */
  router.get('/:id', (req: Request, res: Response) => {
    const lead = facade.obterLead(req.params.id);
    if (!lead) {
      return res.status(404).json({ erro: 'Lead não encontrada.' });
    }
    return res.json(lead);
  });

  /** PATCH /leads/:id/evoluir - Evolução da negociação */
  router.patch('/:id/evoluir', (req: Request, res: Response) => {
    const { estagio, status } = req.body as { estagio?: string; status?: string };
    const input: { estagio?: Estagio; status?: Status } = {};
    if (estagio != null) {
      if (typeof estagio !== 'string' || !ESTAGIOS.includes(estagio as Estagio)) {
        return res.status(400).json({
          erro: `Estágio inválido. Permitidos: ${ESTAGIOS.join(', ')}.`,
        });
      }
      input.estagio = estagio as Estagio;
    }
    if (status != null) {
      if (typeof status !== 'string' || !STATUS.includes(status as Status)) {
        return res.status(400).json({
          erro: `Status inválido. Permitidos: ${STATUS.join(', ')}.`,
        });
      }
      input.status = status as Status;
    }
    if (!input.estagio && !input.status) {
      return res.status(400).json({
        erro: 'Informe estagio e/ou status para evoluir a negociação.',
      });
    }
    const resultado = facade.evoluirNegociacao(req.params.id, input);
    if (!resultado.sucesso) {
      return res.status(400).json({ erro: resultado.erro });
    }
    return res.json(resultado.lead);
  });

  return router;
}

export { createLeadsRouter };
