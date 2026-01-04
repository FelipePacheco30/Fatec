import express from 'express';
import cors from 'cors';
import usuarioRotas from './routes/usuarioRotas';
import dotenv from "dotenv";
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', usuarioRotas);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));