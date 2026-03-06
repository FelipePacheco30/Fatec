// Importar o freamework Express
import express from "express";

import {
	getTasks,
	createTask,
	updateTask,
	deleteTask
} from "../controllers/taskController";

// Cria uma instância que permite modularizar as rotas
const router = express.Router();

router.get("/", getTasks); // responsável por listar as tarefas
router.post("/", createTask); // responsável por criar as tarefas
router.put("/:id", updateTask); // responsável por atualizar as tarefas
router.delete("/:id", deleteTask); // responsável por deletar as tarefas

// Exporta as rotas
export const taskRoutes = router;

