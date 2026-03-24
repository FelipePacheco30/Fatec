"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeadsRouter = createLeadsRouter;
const express_1 = require("express");
const constants_1 = require("../config/constants");
const constants_2 = require("../config/constants");
function createLeadsRouter(facade, validationChain) {
    const router = (0, express_1.Router)();
    /** POST /leads - Cadastro de lead */
    router.post('/', (req, res) => {
        const body = req.body;
        // [Chain of Responsibility] Validacao em etapas:
        // 1) campos obrigatorios
        // 2) canal de origem valido
        const validacao = validationChain.validar(body);
        if (!validacao.valido) {
            return res.status(400).json({ erro: validacao.mensagem });
        }
        const canal = (0, constants_1.normalizarCanal)(body.canalOrigem);
        if (!canal) {
            return res.status(400).json({ erro: 'Canal de origem inválido.' });
        }
        const telefoneDigitos = (body.telefone ?? '').replace(/\D/g, '').slice(0, 11);
        const resultado = facade.cadastrarLead({
            nomeCliente: body.nomeCliente.trim(),
            telefone: telefoneDigitos,
            canalOrigem: canal,
            veiculoInteresse: body.veiculoInteresse.trim(),
        });
        if (!resultado.sucesso) {
            return res.status(400).json({ erro: resultado.erro });
        }
        return res.status(201).json(resultado.lead);
    });
    /** GET /leads - Listagem de leads */
    router.get('/', (_req, res) => {
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
    router.get('/:id', (req, res) => {
        const lead = facade.obterLead(req.params.id);
        if (!lead) {
            return res.status(404).json({ erro: 'Lead não encontrada.' });
        }
        return res.json(lead);
    });
    /** PATCH /leads/:id/evoluir - Evolução da negociação */
    router.patch('/:id/evoluir', (req, res) => {
        const { estagio, status } = req.body;
        const input = {};
        if (estagio != null) {
            if (typeof estagio !== 'string' || !constants_2.ESTAGIOS.includes(estagio)) {
                return res.status(400).json({
                    erro: `Estágio inválido. Permitidos: ${constants_2.ESTAGIOS.join(', ')}.`,
                });
            }
            input.estagio = estagio;
        }
        if (status != null) {
            if (typeof status !== 'string' || !constants_2.STATUS.includes(status)) {
                return res.status(400).json({
                    erro: `Status inválido. Permitidos: ${constants_2.STATUS.join(', ')}.`,
                });
            }
            input.status = status;
        }
        // Transições válidas (State) e continuidade estágio/status são validadas no facade.
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
