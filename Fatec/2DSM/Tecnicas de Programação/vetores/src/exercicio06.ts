/* Considerando uma turma com 5 alunos, crie um script para calcular a média de
todos os alunos, sabendo que cada aluno possui 2 notas que devem ser usadas para o
cálculo da média. Assim, crie 2 vetores (um para os nomes e o outro para as notas) e,
solicite a entrada dos dados ao usuário. Em seguida, popule um terceiro vetor com a média
dos alunos e mostre no console os nomes dos alunos, suas notas e suas respectivas
médias.
*/

const nomes:string[] = ["Ana","Maria","José","João","Alice"];
const notas:number[][] = [[7,8],[9,10],[5,6],[7,9],[8,9]];
const medias:number[] = [];

for(let i:number=0;i<notas.length;i++){
    medias[i] = (notas[i][0]+notas[i][1]) / 2;
}

for(let i:number=0;i<nomes.length;i++){
    console.log("Aluno(a):",nomes[i]," - Notas: ",notas[i][0],"e",notas[i][1],"- Média =",medias[i]);
}

