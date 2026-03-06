import express from "express";
import dotenv from "dotenv";
import { taskRoutes } from "./routes/taskRoutes";

//Carrega variáveis de ambiente
dotenv.config();

// Cria a instância
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send(" API List está rodando! Acesse /task para usar.");
});

app. use("/tasks", taskRoutes);

app.listen(3000, () => {
	console.log("Servidor rodando em http://localhost:3000");
});