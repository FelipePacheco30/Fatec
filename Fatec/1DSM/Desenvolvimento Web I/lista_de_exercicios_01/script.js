function mostrarResultado(id, texto) {
  document.getElementById('result-' + id).textContent = texto;
}

function exercicio1() {
  const nomeCompleto = 'Felipe Ferreira Pacheco';
  mostrarResultado(1, `Nome: ${nomeCompleto}`);
}

function exercicio2() {
  const nome = 'Felipe Ferreira Pacheco';
  mostrarResultado(2, `Maiúsculas: ${nome.toUpperCase()}`);
}

function exercicio3() {
  const nome = 'felipe ferreira pacheco';
  const palavras = nome.split(' ');
  const formatado = palavras.map(p => p[0].toUpperCase() + p.slice(1)).join(' ');
  mostrarResultado(3, `Formatado: ${formatado}`);
}

function exercicio4() {
  const nome = 'Felipe Ferreira Pacheco';
  mostrarResultado(4, `Caracteres: ${nome.length}`);
}

function exercicio5() {
  const nome = 'Felipe Ferreira Pacheco';
  const partes = nome.split(' ');
  mostrarResultado(5, `Primeiro sobrenome: ${partes[1]}`);
}

function exercicio6() {
  const nome = 'Felipe Ferreira Pacheco'.toLowerCase();
  mostrarResultado(6, `Posição de 'a': ${nome.indexOf('a')}`);
}

function exercicio7() {
  const [n1, n2, n3] = [45, 78, 23];
  mostrarResultado(7, `Números: ${n1}, ${n2}, ${n3}`);
}

function exercicio8() {
  const [n1, n2, n3] = [45, 78, 23];
  mostrarResultado(8, `Soma: ${n1 + n2 + n3}, Mult: ${n1 * n2 * n3}`);
}

function exercicio9() {
  const a = 17, b = 5;
  mostrarResultado(9, `17 ÷ 5 = ${Math.floor(a/b)}, resto ${a % b}`);
}

function exercicio10() {
  const A = 8, B = 3;
  mostrarResultado(10, `Dobro A: ${A*2}, Triplo B: ${B*3}, C: ${A*B*B}`);
}