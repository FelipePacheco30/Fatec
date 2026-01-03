/* Criar um script que com dois vetores v1 e v2 numéricos, com 10 números
aleatórios entre 1 e 100, cada, e crie um terceiro vetor v3 incluindo todos os elementos de v1
e v2. Mostrar no console os elementos de v1, v2 e v3.
*/

const v1: number[] = Array(10);
const v2: number[] = Array(10);

for (let x: number = 0; x < 10; x++) {
    v1[x] = Math.floor(Math.random() * 100 + 1)
    v2[x] = Math.floor(Math.random() * 100 + 1)
}

const v3 = v1.concat(v2);

console.log("<< Elementos de V1 >>");
console.log(v1);
console.log("\n<< Elementos de V2 >>");
console.log(v2);
console.log("\n<< Elementos de V3 >>");
console.log(v3);



