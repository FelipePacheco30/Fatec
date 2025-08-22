const prompt = require('prompt-sync')();
nome = prompt("Entre com o nome");
i = nome.length - 1;
while( i >= 0 ){
    console.log(i, nome[i]);
    i = i - 1;
}