const prompt = require ("prompt-sync") ();
menorv = parseInt(prompt("Entre com o menor valor: "));
maiorv = parseInt(prompt("Entre com o maior valor: "));
while (menorv <= maiorv){
    console.log(menorv)
    menorv ++
}
