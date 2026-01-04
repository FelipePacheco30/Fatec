import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mega from "./routes/mega";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Instancia a aplicação Express
const app = express();

// Define a porta que será usada pelo servidor
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Rotas da aplicação
app.use(mega);

// Middleware para rotas desconhecidas
app.use((_, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Inicia o servidor e escuta na porta definida
app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
