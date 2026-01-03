/* Crie um script que gere um vetor com 20 números inteiros aleatórios entre 1 e 100, 
colocando-os em ordem crescente e listando-os no console.
*/

const numint: number[] = Array(20);

for (let x: number = 0; x < 20; x++) {
    numint[x] = Math.floor(Math.random() * 100 + 1)
}

console.log(numint);

numint.sort(function(a, b){return a-b});

//for (let x of numint) {
//    console.log(x);
//}

console.log(numint);