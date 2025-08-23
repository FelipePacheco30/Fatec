const prompt = require("prompt-sync")();
numero = prompt("Entre com um número inteiro: ");
numero = parseInt(numero);
if (numero %2 == 0){
    console.log(`O número ${numero} é par`);
}
else{
    console.log(`o número ${numero} é ímpar`);
}
