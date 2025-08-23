const prompt = require ("prompt-sync")();
const entrada = prompt("Entre com os números separados por vírgula: ");
const nros = entrada.split(",");
for( let i = 0; i < nros.length; i++){
    let nro = parseInt(nros[i]);
    if( nro%2 == 0 ){
        console.log(nros[i]);
    }
}
