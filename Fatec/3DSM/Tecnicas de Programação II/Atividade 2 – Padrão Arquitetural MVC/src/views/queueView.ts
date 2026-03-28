import { Response } from "express";
import { Queue } from "../models/Queue";
import { sendJson, sendOkJson } from "./jsonView";

export class QueueView {
  public static addValidationError(res: Response, erro: string): void {
    sendJson(res, 400, { erro });
  }

  public static itemAdded(res: Response): void {
    sendJson(res, 201, { mensagem: "Item adicionado na fila." });
  }

  public static emptyStructure(res: Response): void {
    sendJson(res, 404, { erro: "A fila está vazia." });
  }

  public static removed(res: Response, removido: unknown): void {
    sendOkJson(res, { removido });
  }

  public static peek(res: Response, frente: unknown): void {
    sendOkJson(res, { frente });
  }

  public static listAll(res: Response, queue: Queue<unknown>): void {
    sendOkJson(res, {
      estrutura: {
        id: queue.getId(),
        name: queue.name,
      },
      tamanho: queue.getSize(),
      itens: queue.getItems(),
    });
  }

  public static cleared(res: Response): void {
    sendOkJson(res, { mensagem: "Fila limpa com sucesso." });
  }
}
