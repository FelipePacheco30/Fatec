"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterItem = exports.deletarItem = exports.atualizarItem = exports.criarItem = exports.listarItens = void 0;
const ShoppingItem_1 = require("../models/ShoppingItem");
const listarItens = async (_req, res) => {
    try {
        const itens = await ShoppingItem_1.ShoppingItem.find().sort({ createdAt: -1 });
        res.json(itens);
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao listar itens' });
    }
};
exports.listarItens = listarItens;
const criarItem = async (req, res) => {
    try {
        const { nome, quantidade, valor } = req.body;
        const item = new ShoppingItem_1.ShoppingItem({
            nome: nome || 'Item',
            quantidade: quantidade ?? 1,
            valor: valor ?? 0,
            comprado: false,
        });
        await item.save();
        res.status(201).json(item);
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao criar item' });
    }
};
exports.criarItem = criarItem;
const atualizarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, quantidade, valor, comprado } = req.body;
        const atualizacao = {};
        if (nome !== undefined)
            atualizacao.nome = nome;
        if (quantidade !== undefined)
            atualizacao.quantidade = quantidade;
        if (valor !== undefined)
            atualizacao.valor = valor;
        if (comprado !== undefined)
            atualizacao.comprado = comprado;
        const item = await ShoppingItem_1.ShoppingItem.findByIdAndUpdate(id, atualizacao, { new: true });
        if (!item) {
            res.status(404).json({ erro: 'Item não encontrado' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar item' });
    }
};
exports.atualizarItem = atualizarItem;
const deletarItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ShoppingItem_1.ShoppingItem.findByIdAndDelete(id);
        if (!item) {
            res.status(404).json({ erro: 'Item não encontrado' });
            return;
        }
        res.json({ mensagem: 'Item removido com sucesso' });
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar item' });
    }
};
exports.deletarItem = deletarItem;
const obterItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ShoppingItem_1.ShoppingItem.findById(id);
        if (!item) {
            res.status(404).json({ erro: 'Item não encontrado' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar item' });
    }
};
exports.obterItem = obterItem;
