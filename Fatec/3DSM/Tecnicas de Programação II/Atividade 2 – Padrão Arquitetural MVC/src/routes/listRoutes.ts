import { Router } from "express";
import { ListController } from "../controllers/ListController";

const listRoutes = Router();
const controller = new ListController();

listRoutes.post("/", (req, res) => controller.add(req, res));
listRoutes.delete("/", (req, res) => controller.remove(req, res));
listRoutes.get("/ultimo", (req, res) => controller.peek(req, res));
listRoutes.get("/", (req, res) => controller.getAll(req, res));
listRoutes.delete("/limpar", (req, res) => controller.clear(req, res));
listRoutes.get("/:index", (req, res) => controller.getAt(req, res));
listRoutes.delete("/:index", (req, res) => controller.removeAt(req, res));

export { listRoutes };
