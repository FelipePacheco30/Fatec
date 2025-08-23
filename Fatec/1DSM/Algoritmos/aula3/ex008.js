const prompt = require ("prompt-sync") ();
senha = "abc"
tentativa = prompt("Entre com a senha:")
while(tentativa != senha){
    console.log("Senha incorreta!")
    tentativa = prompt("Entre com a senha:")
}
console.log("Acesso liberado!")