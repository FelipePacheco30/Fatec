"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const database_1 = require("./config/database");
const shoppingRoutes_1 = __importDefault(require("./routes/shoppingRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, database_1.connectDatabase)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', shoppingRoutes_1.default);
const clientDist = path_1.default.join(__dirname, '../client/dist');
const publicDir = path_1.default.join(__dirname, '../public');
const staticDir = fs_1.default.existsSync(clientDist) ? clientDist : publicDir;
app.use(express_1.default.static(staticDir));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(staticDir, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
