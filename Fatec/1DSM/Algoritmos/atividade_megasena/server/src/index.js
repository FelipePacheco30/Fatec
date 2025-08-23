const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1'
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nenhum concurso encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar último concurso.' });
  }
});

app.get('/:numero', async (req, res) => {
  const numero = parseInt(req.params.numero, 10);
  if (isNaN(numero)) {
    return res.status(400).json({ error: 'Número de concurso inválido.' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM megasena WHERE concurso = $1',
      [numero]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Concurso não encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar concurso.' });
  }
});

app.get('/concursos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM megasena ORDER BY concurso');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar concursos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});