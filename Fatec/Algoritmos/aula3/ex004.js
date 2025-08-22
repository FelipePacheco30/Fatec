const prompt = require ("prompt-sync") ();
somatorio = 0
menorv = parseInt(prompt("Entre com o menor valor: "));
maiorv = parseInt(prompt("Entre com o maior valor: "));
if (menorv < maiorv){
    while (menorv <= maiorv){
        somatorio += menorv ++
}
console.log(`Somatório: ${somatorio}`)
}else{
    while (maiorv <= menorv){
        somatorio += maiorv ++
}
console.log(`Somatório: ${somatorio}`)
}
