import fs from "node:fs";
import csv from "csv-parser";

// Palavras que devem ser ignoradas
const ignoradas = ["da", "de", "do", "dos"];

// Função para capitalizar nomes compostos, ignorando certas palavras
const capitalize = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .filter(word => !ignoradas.includes(word)) // remove palavras ignoradas
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const linhas: string[] = [];

// Lê o CSV sem cabeçalho
fs.createReadStream("src/nomes.csv")
  .pipe(csv({ headers: ["nome"], skipLines: 0 }))
  .on("data", (row) => {
    const nome = String(row.nome ?? "").trim();
    if (nome) {
      linhas.push(capitalize(nome));
    }
  })
  .on("end", () => {
    // monta saída: cabeçalho + nomes
    const saida = ["nome", ...linhas].join("\n");
    fs.writeFileSync("nomes_convertidos.csv", saida, "utf8");
    console.log("✔ nomes_convertidos.csv gerado");
  });
