const prompt = require("prompt-sync")();
numero = parseInt(prompt("Entre com um número inteiro: "));
numero = numero %2;
console.log(`Resto: ${numero}`);