import { Response } from "express";

export function sendJson(res: Response, status: number, body: unknown): void {
  res.status(status).json(body);
}

export function sendOkJson(res: Response, body: unknown): void {
  res.json(body);
}
