const prompt = require ("prompt-sync")();
const numeros = prompt ("Entre com os numeros separados com virgula: ");
const nros = numeros.split(",");
for (let i = 0; i < nros.length; i++) {
    console.log (nros[i]);
}
