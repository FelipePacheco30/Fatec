const prompt = require ("prompt-sync")();
const numeros = prompt ("Entre com os numeros separados com virgula: ");
const nros = numeros.split(",");
let soma = 0
for( let i = 0; i < nros.length; i++){
    soma += parseFloat(nros[i]);
}
console.log(`somatório: ${soma}`);