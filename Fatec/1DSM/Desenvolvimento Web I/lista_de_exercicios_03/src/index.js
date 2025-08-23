const express = require('express')
const app = express();
const path = require("path");

const PORT = 3001

app.use(express.static(path.join(__dirname, "..")));

app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
