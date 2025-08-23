const express = require("express");
const db      = require("../config/database");
const router  = express.Router();

function mapearParaFront(row) {
  return {
    concurso:              row.concurso,
    data:                  row.data_do_sorteio,
    dezenas: [
      row.bola1,
      row.bola2,
      row.bola3,
      row.bola4,
      row.bola5,
      row.bola6
    ].map(n => String(n).padStart(2, "0")),
    local:                 row.observacao || row.cidade_uf || "",
    estimativaPremio:      row.estimativa_premio,
    acumuladoProxConcurso: row.acumulado_6_acertos,
    acumuladoMegaVirada:   row.acumulado_sorteio_especial_mega_da_virada,
    ganhadores_6:          row.ganhadores_6_acertos,
    valor_6:               row.rateio_6_acertos,
    ganhadores_5:          row.ganhadores_5_acertos,
    valor_5:               row.rateio_5_acertos,
    ganhadores_4:          row.ganhadores_4_acertos,
    valor_4:               row.rateio_4_acertos,
    cidade_uf:             row.cidade_uf,
    arrecadacao_total:     row.arrecadacao_total
  };
}

const CAMPOS_OBRIGATORIOS = [
  "concurso",
  "data_do_sorteio",
  "bola1",
  "bola2",
  "bola3",
  "bola4",
  "bola5",
  "bola6",
  "ganhadores_6_acertos",
  "rateio_6_acertos",
  "ganhadores_5_acertos",
  "rateio_5_acertos",
  "ganhadores_4_acertos",
  "rateio_4_acertos",
  "acumulado_6_acertos",
  "arrecadacao_total",
  "estimativa_premio",
  "acumulado_sorteio_especial_mega_da_virada"
];

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM megasena
      ORDER BY concurso DESC
      LIMIT 1
    `;
    const result = await db.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Nenhum concurso encontrado" });
    }
    const dadoMapeado = mapearParaFront(result.rows[0]);
    return res.json(dadoMapeado);
  } catch (error) {
    console.error("Erro GET /:", error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

router.get("/:concurso", async (req, res) => {
  const num = parseInt(req.params.concurso, 10);
  if (isNaN(num)) {
    return res.status(400).json({ erro: "Número de concurso inválido" });
  }
  try {
    const query = `
      SELECT *
      FROM megasena
      WHERE concurso = $1
    `;
    const result = await db.query(query, [num]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: `Concurso ${num} não encontrado` });
    }
    const dadoMapeado = mapearParaFront(result.rows[0]);
    return res.json(dadoMapeado);
  } catch (error) {
    console.error(`Erro GET /${num}:`, error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  for (const campo of CAMPOS_OBRIGATORIOS) {
    if (data[campo] === undefined || data[campo] === null) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }
  }
  try {
    const insertQuery = `
      INSERT INTO megasena (
        concurso,
        data_do_sorteio,
        bola1, bola2, bola3, bola4, bola5, bola6,
        ganhadores_6_acertos,
        cidade_uf,
        rateio_6_acertos,
        ganhadores_5_acertos,
        rateio_5_acertos,
        ganhadores_4_acertos,
        rateio_4_acertos,
        acumulado_6_acertos,
        arrecadacao_total,
        estimativa_premio,
        acumulado_sorteio_especial_mega_da_virada,
        observacao
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      )
      RETURNING *;
    `;
    const values = [
      data.concurso,
      data.data_do_sorteio,
      data.bola1, data.bola2, data.bola3,
      data.bola4, data.bola5, data.bola6,
      data.ganhadores_6_acertos,
      data.cidade_uf || null,
      data.rateio_6_acertos,
      data.ganhadores_5_acertos,
      data.rateio_5_acertos,
      data.ganhadores_4_acertos,
      data.rateio_4_acertos,
      data.acumulado_6_acertos,
      data.arrecadacao_total,
      data.estimativa_premio,
      data.acumulado_sorteio_especial_mega_da_virada,
      data.observacao || null
    ];
    const result = await db.query(insertQuery, values);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro POST /:", error);
    if (error.code === "23505") {
      return res.status(409).json({ erro: `Concurso ${data.concurso} já existe` });
    }
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

router.put("/:concurso", async (req, res) => {
  const num = parseInt(req.params.concurso, 10);
  const data = req.body;
  if (isNaN(num)) {
    return res.status(400).json({ erro: "Número de concurso inválido" });
  }
  const camposParaAtualizar = {};
  for (const key of Object.keys(data)) {
    if (CAMPOS_OBRIGATORIOS.includes(key) || key === "cidade_uf" || key === "observacao") {
      camposParaAtualizar[key] = data[key];
    }
  }
  if (Object.keys(camposParaAtualizar).length === 0) {
    return res.status(400).json({ erro: "Nenhum campo válido para atualizar" });
  }
  const setClause = [];
  const values    = [];
  let idx = 1;
  for (const [col, val] of Object.entries(camposParaAtualizar)) {
    setClause.push(`${col} = $${idx}`);
    values.push(val);
    idx++;
  }
  values.push(num);
  const updateQuery = `
    UPDATE megasena
    SET ${setClause.join(", ")}
    WHERE concurso = $${idx}
    RETURNING *;
  `;
  try {
    const result = await db.query(updateQuery, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: `Concurso ${num} não encontrado` });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(`Erro PUT /${num}:`, error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

router.delete("/:concurso", async (req, res) => {
  const num = parseInt(req.params.concurso, 10);
  if (isNaN(num)) {
    return res.status(400).json({ erro: "Número de concurso inválido" });
  }
  try {
    const deleteQuery = `
      DELETE FROM megasena
      WHERE concurso = $1
      RETURNING *;
    `;
    const result = await db.query(deleteQuery, [num]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: `Concurso ${num} não encontrado` });
    }
    return res.json({ mensagem: `Concurso ${num} excluído com sucesso` });
  } catch (error) {
    console.error(`Erro DELETE /${num}:`, error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

module.exports = router;
