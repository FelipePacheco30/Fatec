const prompt = require ("prompt-sync") ();
i = 0
num = []
while (i < 5){
    num = parseInt(prompt("Entre com o numero: "));
    i ++
}
console.log(`Maior valor: ${Math.max(num)}`)