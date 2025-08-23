const prompt = require ("prompt-sync") ();
somatorio = 0
i = 0
while (somatorio < 20){
    num = parseInt(prompt("Entre com o numero: "));
    somatorio += num
    i ++
}
console.log(`Somatório: ${somatorio}`)
