import { Router, Request, Response } from "express";
import Cliente from "../models/Cliente.js";

const router = Router();

// Rota POST -> Criar novo cliente
router.post("/", async (req: Request, res: Response) => {
  try {
    const novoCliente = new Cliente(req.body);
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      res.status(400).json({ erro: erro.message });
    } else {
      res.status(400).json({ erro: String(erro) });
    }
  }
});

// Rota GET -> Listar todos os clientes cadastrados
router.get("/", async (_req: Request, res: Response) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      res.status(500).json({ erro: erro.message });
    } else {
      res.status(500).json({ erro: String(erro) });
    }
  }
});

export default router;
