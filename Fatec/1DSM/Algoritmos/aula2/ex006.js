const prompt = require("prompt-sync")();
idade = prompt("Digite sua idade:");
if (idade != null){
    idade = parseInt(idade);
    if (idade < 18){
        console.log("de menor");
    } else {
        console.log("de maior");
    }
}
else{
    console.log("Você não forneceu um número");
}
