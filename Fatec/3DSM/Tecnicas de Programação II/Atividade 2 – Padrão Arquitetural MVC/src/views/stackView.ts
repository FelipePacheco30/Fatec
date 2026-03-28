import { Response } from "express";
import { Stack } from "../models/Stack";
import { sendJson, sendOkJson } from "./jsonView";

export class StackView {
  public static addValidationError(res: Response, erro: string): void {
    sendJson(res, 400, { erro });
  }

  public static itemAdded(res: Response): void {
    sendJson(res, 201, { mensagem: "Item adicionado na pilha." });
  }

  public static emptyStructure(res: Response): void {
    sendJson(res, 404, { erro: "A pilha está vazia." });
  }

  public static removed(res: Response, removido: unknown): void {
    sendOkJson(res, { removido });
  }

  public static peek(res: Response, topo: unknown): void {
    sendOkJson(res, { topo });
  }

  public static listAll(res: Response, stack: Stack<unknown>): void {
    sendOkJson(res, {
      estrutura: {
        id: stack.getId(),
        name: stack.name,
      },
      tamanho: stack.getSize(),
      itens: stack.getItems(),
    });
  }

  public static cleared(res: Response): void {
    sendOkJson(res, { mensagem: "Pilha limpa com sucesso." });
  }
}
