function contar() {
  const el = document.getElementById('resultado1');
  const nums = [];
  for (let i = 1; i <= 15; i++) {
    nums.push(i);
  }
  el.textContent = nums.join(', ');
}

function contarContrario() {
  const el = document.getElementById('resultado2');
  const nums = [];
  for (let i = 15; i >= 1; i--) {
    nums.push(i);
  }
  el.textContent = nums.join(', ');
}

function gerarTabuada() {
  const input = document.getElementById('numeroTabuada');
  const n = parseInt(input.value, 10);
  const el = document.getElementById('resultado3');
  if (isNaN(n) || n < 0) {
    el.textContent = 'Insira um número inteiro positivo.';
    return;               // sai da função se inválido
  }
  const linhas = [];
  for (let i = 0; i <= 10; i++) {
    linhas.push(`${i} × ${n} = ${i * n}`);
  }
  el.innerHTML = linhas.join('<br>');
}

function mudarCor(cor) {
  document.body.style.backgroundColor = cor;
}
