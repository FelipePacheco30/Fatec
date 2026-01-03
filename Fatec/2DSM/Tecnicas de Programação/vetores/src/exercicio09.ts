/* Crie um script que gere um vetor com 30 números inteiros aleatórios entre 1 e 100, 
mostre os elementos gerados no console, bem como qual o maior e qual o menor dos números gerados, 
além das suas posições no vetor.
*/

var num: number[] = Array(30);
var maior: number = 0;
var menor: number = 100;
var posmaior: number = 0;
var posmenor: number = 0;

for (let x: number = 0; x < 30; x++) {
    num[x] = Math.floor(Math.random() * 100 + 1)
    if(num[x] > maior){
        maior = num[x];
        posmaior = x;
    }
    if(num[x] < menor){
        menor = num[x];
        posmenor = x;
    }
}

console.log("<< Vetor Gerado >>");
console.log(num);

console.log("O maior número gerado é:",maior,"na posição ",posmaior," do vetor.");
console.log("O menor número gerado é:",menor,"na posição ",posmenor," do vetor.");