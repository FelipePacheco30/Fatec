const disciplina = {
  nome: "Algoritmos",
  carga: 80,
  notas: [
    {
      peso: 0.25,
      nota: 8.2,
    },
    {
      peso: 0.35,
      nota: 7.5,
    },
    {
      peso: 0.4,
      nota: 9,
    },
  ],
};

const p1 = disciplina.notas[0].peso * disciplina.notas[0].nota;
const p2 = disciplina.notas[1].peso * disciplina.notas[1].nota;
const projeto = disciplina.notas[2].peso * disciplina.notas[2].nota;

console.log("Nota final:", p1 + p2 + projeto);
