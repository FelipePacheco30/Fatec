import { Response } from "express";
import { ApplicationStatsPayload } from "../models/applicationStats";
import { sendOkJson } from "./jsonView";

export class StatsView {
  public static render(res: Response, payload: ApplicationStatsPayload): void {
    sendOkJson(res, payload);
  }
}
