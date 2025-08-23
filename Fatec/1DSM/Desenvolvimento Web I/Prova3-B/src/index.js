const express = require("express");
const path    = require("path");
const dotenv  = require("dotenv");

dotenv.config();

const app            = express();
const PORT           = process.env.PORT || 3002;

app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
