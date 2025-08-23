const prompt = require ("prompt-sync") ();
menorv = parseInt(prompt("Entre com o menor valor: "));
maiorv = parseInt(prompt("Entre com o maior valor: "))
if (menorv < maiorv){
    while (menorv <= maiorv){
        console.log(menorv)
        menorv ++
}
}else{
    while (maiorv <= menorv){
        console.log(maiorv)
        maiorv ++
}
}
