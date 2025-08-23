const prompt = require ("prompt-sync")();
const entrada = prompt("Entre com os números separados por vírgula: ");
const nros = entrada.split(",");
for( var i = 0; i < nros.length; i++){
    if( i%2 == 0){
        console.log(nros[i]);
    }
}