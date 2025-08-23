// Importa os módulos necessários
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

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

// Inicia o servidor e escuta na porta definida
app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


/*
Essa instrução garantirá que os arquivos da pasta public sejam acessíveis via navegador.
Por exemplo: http://localhost:3003/js/cursos.js
*/
app.use(express.static(path.join(__dirname, "..", "public")));


// Importa as rotas do controlador Mega
const operacoes = require("./routes/operacoes");

// Define a rota base para o controlador Mega
app.use("/operacoes", operacoes);
