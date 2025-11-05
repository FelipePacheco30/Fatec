// Função para gerar um palpite da Mega-Sena
// Retorna 6 números únicos entre 1 e 60, ordenados em ordem crescente
export function gerarPalpite(): number[] {
  const numeros: number[] = [];

  // Gera números únicos até ter 6
  while (numeros.length < 6) {
    const numero = Math.floor(Math.random() * 60) + 1;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }

  // Ordena em ordem crescente
  return numeros.sort((a, b) => a - b);
}
