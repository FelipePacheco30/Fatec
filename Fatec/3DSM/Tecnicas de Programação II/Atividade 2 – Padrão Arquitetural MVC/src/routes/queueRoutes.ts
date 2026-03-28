import { Router } from "express";
import { QueueController } from "../controllers/QueueController";

const queueRoutes = Router();
const controller = new QueueController();

queueRoutes.post("/", (req, res) => controller.add(req, res));
queueRoutes.delete("/", (req, res) => controller.remove(req, res));
queueRoutes.get("/frente", (req, res) => controller.peek(req, res));
queueRoutes.get("/", (req, res) => controller.getAll(req, res));
queueRoutes.delete("/limpar", (req, res) => controller.clear(req, res));

export { queueRoutes };
