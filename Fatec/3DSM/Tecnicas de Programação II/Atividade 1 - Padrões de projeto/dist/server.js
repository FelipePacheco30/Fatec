"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT ?? 3000;
const app = (0, app_1.createApp)();
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Endpoints: POST/GET /leads, GET /leads/:id, PATCH /leads/:id/evoluir');
});
