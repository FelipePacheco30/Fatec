const router = require("express").Router();
/*
Testes:
http://localhost:3003/operacoes/somatorio
http://localhost:3003/operacoes/somatorio?inicio=a
http://localhost:3003/operacoes/somatorio?inicio=a&fim=b
http://localhost:3003/operacoes/somatorio?inicio=10&fim=b
http://localhost:3003/operacoes/somatorio?inicio=10&fim=1
http://localhost:3003/operacoes/somatorio?inicio=1&fim=10
*/
// Rota para calcular o somatório
router.get("/somatorio", async function (req, res) {
  const { inicio, fim } = req.query;
  if (!inicio){
  res.json({erro: "Parametro 'inicio' e obrigatorio"});
  }
  else if (!fim) {
    res.json({erro: "Parametro 'fim' e obrigatorio"});
  }
  else if (isNaN(parseInt(inicio))) {
    res.json({erro:"Parâmetro 'inicio' precisa ser um número"});
  }
  else if (isNaN(parseInt(fim))) {
    res.json({erro:"Parâmetro 'fim' precisa ser um número"});
  }
  else if (inicio > fim) {
    res.json({erro:"O valor de 'inicio' não pode ser maior que 'fim'"});
  }
  else {
    let comeco = (parseInt(inicio));
    let final  = (parseInt(fim));
    let soma = 0
    for  (let i = comeco; i <= final; i++) {  
      soma += i
    }
    res.json({resultado:`${soma}`});
  }
});

/*
Testes:
http://localhost:3003/operacoes/fatorial
http://localhost:3003/operacoes/fatorial?numero=a
http://localhost:3003/operacoes/fatorial?numero=-5
http://localhost:3003/operacoes/fatorial?numero=5
*/
// Rota para calcular o fatorial
router.get("/fatorial", async function (req, res) {
  const { numero } = req.query;
  if (!numero){
    res.json({erro: "Parametro 'numero' e obrigatorio"});
  }
  else if (isNaN(parseInt(numero))) {
    res.json({erro:"Parâmetro 'numero' precisa ser um número"});
  }
  else if ((parseInt(numero)) < 0) {
    res.json({erro:"O valor de 'numero' não pode ser negativo"});
  }
  else {
    let num = (parseInt(numero));
    let fatorial = 1
    for  (let i = 1; i <= num; i++) {  
      fatorial *= i
    }
    res.json({resultado:`${fatorial}`});
  }
});

/*
http://localhost:3003/operacoes/media
http://localhost:3003/operacoes/media?numeros=a,b,c
http://localhost:3003/operacoes/media?numeros=1;2;3
http://localhost:3003/operacoes/media?numeros=1,x,3
http://localhost:3003/operacoes/media?numeros=4.32
http://localhost:3003/operacoes/media?numeros=1,2.9,3
 */
// Rota para calcular a média
router.get("/media", async function (req, res) {
  const { numeros } = req.query;
  if (!numeros){
    return res.json({erro:"Parâmetro 'numeros' é obrigatório"});
  }
  const valores = numeros.split(',').map(n => parseFloat(n));
  const regex =  /^\d+(\.\d+)?(,\d+(\.\d+)?)*$/;
  if (!regex.test(numeros)) {
    return res.json({ erro: "Parâmetro 'numeros' deve conter apenas números e vírgulas" });
  }
  else {
    media = 0
    for (i = 0; i < valores.length; i++)
    media += valores[i] 
  }
    resultado = media / valores.length
    res.json({resposta: resultado})
});


/*
http://localhost:3003/operacoes/primo
http://localhost:3003/operacoes/primo?numero=a
http://localhost:3003/operacoes/primo?numero=1
http://localhost:3003/operacoes/primo?numero=2
http://localhost:3003/operacoes/primo?numero=9
 */

router.get('/primo', async (req, res) => {
  const { numero } = req.query;

  // 1. Parâmetro obrigatório
  if (!numero) {
    return res.json({ erro: "Parâmetro 'numero' é obrigatório" });
  }

  // 2. Deve ser um inteiro
  const n = Number(numero);
  if (!Number.isInteger(n)) {
    return res.json({ erro: "Informe um número inteiro" });
  }

  // 3. Deve ser ≥ 2
  if (n < 2) {
    return res.json({ erro: "Informe um número inteiro igual ou maior que 2" });
  }

  // 4. Função para testar se é primo
  function ehPrimo(x) {
    if (x === 2) return true;
    if (x % 2 === 0) return false;
    const limite = Math.sqrt(x);
    for (let i = 3; i <= limite; i += 2) {
      if (x % i === 0) return false;
    }
    return true;
  }

  // 5. Monta a resposta
  const resultado = ehPrimo(n);
  return res.json({ numero: n, primo: resultado });
});

// Exporta o router para ser usado no servidor principal
module.exports = router;
