import { Response } from "express";
import { sendJson } from "./jsonView";

export function notFoundRoute(res: Response): void {
  sendJson(res, 404, { erro: "Rota não encontrada." });
}
