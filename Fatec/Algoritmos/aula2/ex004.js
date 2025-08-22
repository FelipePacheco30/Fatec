const prompt = require("prompt-sync")();
numero1 = prompt("Entre com o primeiro número inteiro: ");
numero2 = prompt("Entre com o segundo número inteiro: ");
numero1 = parseInt(numero1);
numero2 = parseInt(numero2);
if (numero1 % numero2 == 0){
    console.log(`${numero1} é um múltiplo de ${numero2}`);
}
else{
    console.log(`${numero1} não é um múltiplo de ${numero2}`);
}