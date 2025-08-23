const prompt = require("prompt-sync")();
numero1 = prompt("Entre com o primeiro número inteiro: ");
numero2 = prompt("Entre com o segundo número inteiro: ");
numero1 = parseInt(numero1);
numero2 = parseInt(numero2);
resultado = numero1 % numero2;
console.log(`Resto: ${resultado}`);