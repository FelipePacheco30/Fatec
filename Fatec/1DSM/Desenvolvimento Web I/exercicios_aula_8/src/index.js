const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/texto/:nome/:indice", (req, res) => {
    const { nome, indice } = req.params;
    const i = parseInt(indice);
    
    if (i < 0 || i >= nome.length || isNaN(i)) {
        return res.status(400).json({ erro: "Índice inválido" });
    }
    
    res.json({ letra: nome[i] });
});

app.get("/texto", (req, res) => {
    const { nome, indice } = req.query;
    
    if (!nome || indice === undefined) {
        return res.status(400).json({ erro: "Parâmetros nome e indice são obrigatórios" });
    }
    
    const i = parseInt(indice);
    
    if (i < 0 || i >= nome.length || isNaN(i)) {
        return res.status(400).json({ erro: "Índice inválido" });
    }
    
    res.json({ letra: nome[i] });
});

app.post("/texto", (req, res) => {
    const { nome, indice } = req.body;
    
    if (!nome || indice === undefined) {
        return res.status(400).json({ erro: "Parâmetros nome e indice são obrigatórios" });
    }
    
    const i = parseInt(indice);
    
    if (i < 0 || i >= nome.length || isNaN(i)) {
        return res.status(400).json({ erro: "Índice inválido" });
    }
    
    res.json({ letra: nome[i] });
});

app.get("/soma", (req, res) => {
    const { x, y } = req.query;
    
    if (!x || !y) {
        return res.status(400).json({ erro: "Parâmetros x e y são obrigatórios" });
    }
    
    const num1 = parseFloat(x);
    const num2 = parseFloat(y);
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ erro: "Parâmetros devem ser números válidos" });
    }
    
    const resultado = num1 + num2;
    res.json({ resultado });
});

app.post("/potencia", (req, res) => {
    const { base, expoente } = req.body;
    
    if (base === undefined || expoente === undefined) {
        return res.status(400).json({ erro: "Parâmetros base e expoente são obrigatórios" });
    }
    
    const numBase = parseFloat(base);
    const numExpoente = parseFloat(expoente);
    
    if (isNaN(numBase) || isNaN(numExpoente)) {
        return res.status(400).json({ erro: "Parâmetros devem ser números válidos" });
    }
    
    const resultado = Math.pow(numBase, numExpoente);
    res.json({ resultado });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});