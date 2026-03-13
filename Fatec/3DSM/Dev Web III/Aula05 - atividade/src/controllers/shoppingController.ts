import { Request, Response } from 'express';
import { ShoppingItem } from '../models/ShoppingItem';

export const listarItens = async (_req: Request, res: Response): Promise<void> => {
  try {
    const itens = await ShoppingItem.find().sort({ createdAt: -1 });
    res.json(itens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar itens' });
  }
};

export const criarItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, quantidade, valor } = req.body;
    const item = new ShoppingItem({
      nome: nome || 'Item',
      quantidade: quantidade ?? 1,
      valor: valor ?? 0,
      comprado: false,
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar item' });
  }
};

export const atualizarItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nome, quantidade, valor, comprado } = req.body;
    const atualizacao: Record<string, unknown> = {};
    if (nome !== undefined) atualizacao.nome = nome;
    if (quantidade !== undefined) atualizacao.quantidade = quantidade;
    if (valor !== undefined) atualizacao.valor = valor;
    if (comprado !== undefined) atualizacao.comprado = comprado;
    const item = await ShoppingItem.findByIdAndUpdate(
      id,
      atualizacao,
      { new: true }
    );
    if (!item) {
      res.status(404).json({ erro: 'Item não encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar item' });
  }
};

export const deletarItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await ShoppingItem.findByIdAndDelete(id);
    if (!item) {
      res.status(404).json({ erro: 'Item não encontrado' });
      return;
    }
    res.json({ mensagem: 'Item removido com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar item' });
  }
};

export const obterItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await ShoppingItem.findById(id);
    if (!item) {
      res.status(404).json({ erro: 'Item não encontrado' });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar item' });
  }
};
