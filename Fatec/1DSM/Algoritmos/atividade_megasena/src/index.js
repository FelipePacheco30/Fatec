const express = require("express");
const path    = require("path");
const cors    = require("cors");
const dotenv  = require("dotenv");

dotenv.config();

const app            = express();
const PORT           = process.env.PORT || 3002;
const megasenaRoutes = require("./routes/megasena");

app.use(express.json());

app.use(cors());

app.get("/", (req, res, next) => {
  const accept = req.headers.accept || "";
  if (!accept.includes("application/json")) {
    return next();
  }

  return megasenaRoutes.handle(req, res);
});

app.get("/:concurso", (req, res, next) => {
  const accept = req.headers.accept || "";
  if (!accept.includes("application/json")) {
    return next();
  }
  return megasenaRoutes.handle(req, res);
});

app.post("/", (req, res) => megasenaRoutes.handle(req, res));
app.put("/:concurso", (req, res) => megasenaRoutes.handle(req, res));
app.delete("/:concurso", (req, res) => megasenaRoutes.handle(req, res));

app.all("/*", (req, res, next) => {

  const method = req.method.toLowerCase();
  const path   = req.path; 

  if (method === "get" && req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.status(404).json({ erro: "Rota de API não encontrada" });
  }

  if (["post", "put", "delete"].includes(method)) {
    return res.status(404).json({ erro: "Rota de API não encontrada" });
  }
  return next();
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
