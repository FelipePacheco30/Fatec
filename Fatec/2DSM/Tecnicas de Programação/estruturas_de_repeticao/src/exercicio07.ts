// Calcule a soma dos inteiros de 1 a 10 utilizando o laço de repetição while.

var i:number = 1;
var soma:number = 0;

while(i<11){
    console.log(i);
    soma += i;
    i++;
}

console.log("Soma: ",soma);

export default{};