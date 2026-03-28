import { Request, Response } from "express";
import { buildApplicationStats } from "../models/applicationStats";
import { StatsView } from "../views/statsView";

export class StructureStatsController {
  public getStats(_req: Request, res: Response): void {
    StatsView.render(res, buildApplicationStats());
  }
}
