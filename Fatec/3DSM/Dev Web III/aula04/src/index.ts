import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import clienteRoutes from "./routes/clienteRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para JSON
app.use(express.json());

// Conexão MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cadastroDB")
  .then(() => console.log("Conectado ao MongoDB Compass"))
  .catch((erro) => console.error("Erro ao conectar:", erro));

// Rotas API
app.use("/clientes", clienteRoutes);

// Servir front-end da pasta public
app.use(express.static(path.join(__dirname, "../public")));

// Inicia servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
