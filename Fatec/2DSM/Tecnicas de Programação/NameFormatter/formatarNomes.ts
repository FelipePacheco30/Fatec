//rode ts-node .\formatarNomes.ts para executar o codigo
import fs from "fs";
import path from "path";

const PREPOSICOES = ["de", "da", "das", "do", "dos", "e"];

function formatarNome(nome: string): string {
  return nome
    .trim()
    .toLowerCase()
    .split(" ")
    .map((parte) => {
      if (PREPOSICOES.includes(parte)) {
        return parte;
      }
      return parte.charAt(0).toUpperCase() + parte.slice(1);
    })
    .join(" ");
}

function main() {
  const inputPath = path.resolve("nomes.csv");
  const outputPath = path.resolve("nomes_formatados.csv");

  if (!fs.existsSync(inputPath)) {
    console.error("Arquivo nomes.csv não encontrado!");
    return;
  }

  const conteudo = fs.readFileSync(inputPath, "utf8");
  const linhas = conteudo.split(/\r?\n/).filter((l) => l.trim().length > 0);

  const nomesFormatados = linhas.map(formatarNome);

  fs.writeFileSync(outputPath, nomesFormatados.join("\n"), "utf8");

  console.log("Conversão concluída! Arquivo gerado: nomes_formatados.csv");
}

main();
