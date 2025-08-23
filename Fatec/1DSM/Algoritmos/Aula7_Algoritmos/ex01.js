const prompt = require ("prompt-sync")();
const nome = prompt("Entre com o seu nome: ");
for ( let i = 0; i < nome.length; i++ ) {
    console.log(nome[i]);
}