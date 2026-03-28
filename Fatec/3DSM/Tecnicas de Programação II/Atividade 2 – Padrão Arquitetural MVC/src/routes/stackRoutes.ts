import { Router } from "express";
import { StackController } from "../controllers/StackController";

const stackRoutes = Router();
const controller = new StackController();

stackRoutes.post("/", (req, res) => controller.add(req, res));
stackRoutes.delete("/", (req, res) => controller.remove(req, res));
stackRoutes.get("/topo", (req, res) => controller.peek(req, res));
stackRoutes.get("/", (req, res) => controller.getAll(req, res));
stackRoutes.delete("/limpar", (req, res) => controller.clear(req, res));

export { stackRoutes };
