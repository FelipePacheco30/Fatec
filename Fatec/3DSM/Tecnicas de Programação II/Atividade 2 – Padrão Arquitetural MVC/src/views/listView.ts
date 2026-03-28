import { Response } from "express";
import { ListStructure } from "../models/ListStructure";
import { sendJson, sendOkJson } from "./jsonView";

export class ListView {
  public static addValidationError(res: Response, erro: string): void {
    sendJson(res, 400, { erro });
  }

  public static itemAdded(res: Response): void {
    sendJson(res, 201, { mensagem: "Item adicionado na lista." });
  }

  public static emptyStructure(res: Response): void {
    sendJson(res, 404, { erro: "A lista está vazia." });
  }

  public static invalidIndexParam(res: Response): void {
    sendJson(res, 400, { erro: "O parâmetro index deve ser um número." });
  }

  public static invalidRemoveIndex(res: Response): void {
    sendJson(res, 404, { erro: "Índice inválido para remoção." });
  }

  public static invalidGetIndex(res: Response): void {
    sendJson(res, 404, { erro: "Índice inválido para consulta." });
  }

  public static removed(res: Response, removido: unknown): void {
    sendOkJson(res, { removido });
  }

  public static removedAt(res: Response, removido: unknown, indice: number): void {
    sendOkJson(res, { removido, indice });
  }

  public static itemAt(res: Response, indice: number, item: unknown): void {
    sendOkJson(res, { indice, item });
  }

  public static peek(res: Response, ultimo: unknown): void {
    sendOkJson(res, { ultimo });
  }

  public static listAll(res: Response, list: ListStructure<unknown>): void {
    sendOkJson(res, {
      estrutura: {
        id: list.getId(),
        name: list.name,
      },
      tamanho: list.getSize(),
      itens: list.getItems(),
    });
  }

  public static cleared(res: Response): void {
    sendOkJson(res, { mensagem: "Lista limpa com sucesso." });
  }
}
