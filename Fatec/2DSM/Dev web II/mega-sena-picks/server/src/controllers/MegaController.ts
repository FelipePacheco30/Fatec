import { Request, Response } from "express";
import db from "./db";

// Retornar o concurso mais recente
export async function last(_: Request, res: Response) {
  try {
    const result = await db.query(
      "SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error: any) {
    res.json({ message: "Erro interno do servidor" });
  }
}

// Retornar os dados de um determinado concurso.
export async function getConcurso(req: Request, res: Response) {
  const { concurso } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM megasena WHERE concurso = $1",
      [concurso]
    );
    if( result.rowCount === 0 ){
        res.json({ message: `Não existem dados do concurso ${concurso}` });
    }else {
        res.json(result.rows[0]);
    }
  } catch (error: any) {
    res.json({ message: "Erro interno do servidor" });
  }
}
