import { Router } from "express";
import { StructureStatsController } from "../controllers/StructureStatsController";

const statsRoutes = Router();
const controller = new StructureStatsController();

statsRoutes.get("/", (req, res) => controller.getStats(req, res));

export { statsRoutes };
