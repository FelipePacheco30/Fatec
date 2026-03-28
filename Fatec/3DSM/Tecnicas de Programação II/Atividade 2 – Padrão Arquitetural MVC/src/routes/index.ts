import { Router } from "express";
import { listRoutes } from "./listRoutes";
import { queueRoutes } from "./queueRoutes";
import { stackRoutes } from "./stackRoutes";
import { statsRoutes } from "./statsRoutes";

const routes = Router();

routes.use("/pilha", stackRoutes);
routes.use("/fila", queueRoutes);
routes.use("/lista", listRoutes);
routes.use("/estatisticas", statsRoutes);

export { routes };
