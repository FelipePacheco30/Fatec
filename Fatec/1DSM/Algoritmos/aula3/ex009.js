const prompt = require ("prompt-sync") ();
senha = "abc"
chances = 0
tentativa = prompt("Entre com a senha:")
while(tentativa != "abc" && chances < 2){
    console.log("Senha incorreta!")
    tentativa = prompt("Entre com a senha:")
    chances ++
}
if(tentativa == "abc"){
    console.log("Acesso liberado!")
}
else{
    console.log("Excedeu limite")
}