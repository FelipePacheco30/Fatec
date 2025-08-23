// index.js: funções de requisição com tratamento de erro apropriado

// Função para calcular a média
async function calcularMedia() {
    const numeros = document.getElementById('mediaInput').value;
  
    try {
      const res = await fetch(
        `http://localhost:3003/operacoes/media?numeros=${numeros}`
      );
      const data = await res.json();
  
      if (data.erro) {
        document.getElementById('mediaResultado').innerText = data.erro;
      } else {
        document.getElementById('mediaResultado').innerText = `Resultado: ${data.resposta}`;
      }
    } catch (err) {
      document.getElementById('mediaResultado').innerText = 'Erro na requisição';
      console.error(err);
    }
  }
  
  // Função para calcular o fatorial
  async function calcularFatorial() {
    const numero = document.getElementById('fatorialInput').value;
  
    try {
      const res = await fetch(
        `http://localhost:3003/operacoes/fatorial?numero=${numero}`
      );
      const data = await res.json();
  
      if (data.erro) {
        document.getElementById('fatorialResultado').innerText = data.erro;
      } else {
        document.getElementById('fatorialResultado').innerText = `Resultado: ${data.resultado}`;
      }
    } catch (err) {
      document.getElementById('fatorialResultado').innerText = 'Erro na requisição';
      console.error(err);
    }
  }
  
  // Função para calcular o somatório
  async function calcularSomatorio() {
    const inicio = document.getElementById('somatorioInicio').value;
    const fim = document.getElementById('somatorioFim').value;
  
    try {
      const res = await fetch(
        `http://localhost:3003/operacoes/somatorio?inicio=${inicio}&fim=${fim}`
      );
      const data = await res.json();
  
      if (data.erro) {
        document.getElementById('somatorioResultado').innerText = data.erro;
      } else {
        document.getElementById('somatorioResultado').innerText = `Resultado: ${data.resultado}`;
      }
    } catch (err) {
      document.getElementById('somatorioResultado').innerText = 'Erro na requisição';
      console.error(err);
    }
  }
  
  // Função para verificar número primo
  async function calcularPrimo() {
    const numero = document.getElementById('primoInput').value;
  
    try {
      const res = await fetch(
        `http://localhost:3003/operacoes/primo?numero=${numero}`
      );
      const data = await res.json();
  
      if (data.erro) {
        document.getElementById('primoResultado').innerText = data.erro;
      } else {
        const texto = data.primo
          ? `O número ${numero} é primo.`
          : `O número ${numero} não é primo.`;
        document.getElementById('primoResultado').innerText = texto;
      }
    } catch (err) {
      document.getElementById('primoResultado').innerText = 'Erro na requisição';
      console.error(err);
    }
  }
  