/* Crie um vetor chamado “nomes”, preenchendo-o com 5 nomes diferentes.
Escreva um laço que mostre na saída padrão a frase “Conheço alguém chamado “, seguido
do vetor nomes[i] (utilize “i” como variável contadora). Rode seu código que deverá mostrar
as cinco frases na saída padrão.
*/

const nomes:string[] = ["Ana","Maria","José","João","Alice"];

for(let i:number = 0; i<nomes.length;i++){
    console.log("Conheço alguém chamado(a):",nomes[i]);
}

export default{};