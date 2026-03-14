import { createApp } from './app';

const PORT = process.env.PORT ?? 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Endpoints: POST/GET /leads, GET /leads/:id, PATCH /leads/:id/evoluir');
});
