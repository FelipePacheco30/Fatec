import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { connectDatabase } from './config/database';
import shoppingRoutes from './routes/shoppingRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', shoppingRoutes);

const clientDist = path.join(__dirname, '../client/dist');
const publicDir = path.join(__dirname, '../public');
const staticDir = fs.existsSync(clientDist) ? clientDist : publicDir;

app.use(express.static(staticDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
