const prompt = require('prompt-sync')();
nome = prompt("Entre com o nome");
i = 0;
while( i < nome.length ){
    if( i%2 == 0){
        console.log(i, nome[i]);
    }
    i = i + 1;
}