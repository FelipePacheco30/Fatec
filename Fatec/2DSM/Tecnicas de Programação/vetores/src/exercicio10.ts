/* Elaborar um script para gerar randomicamente uma matriz quadrada, 
solicitando ao usuário a quantidade de elementos. 
Somar a primeira linha da matriz a todas as demais linhas, incluindo ela mesma. 
Mostrar as duas matrizes no console.
*/

var readline = require('readline');

var leitor = readline.createInterface({
    input: process.stdin, output: process.stdout
});

var elementos: number = 0;

leitor.question("Digite a quantidade de elementos da matriz quadrada: ", function (answer: string) {

    let e = parseInt(answer);

    var matriz:number[][] = [];

    for (let x:number = 0;x<e;x++) {
        let m:number[] = []; 
        for (let y: number = 0; y < e; y++) {
            m.push(Math.floor(Math.random() * 100 + 1));
        }
        
        matriz.push(m);
    }

    console.log("<< Matriz Original >>");
    console.table(matriz);

    let m:number[] = Array();

    matriz[0].forEach((e) => m.push(e));

    console.log(m);

    for (let x:number = 0;x<e;x++) {
        for (let y: number = 0; y < e; y++) {
            matriz[x][y] += m[y];
        }       
    }

    console.log("<< Matriz Somada com a 1ª Linha >>");
    console.table(matriz);

    leitor.close();

});
