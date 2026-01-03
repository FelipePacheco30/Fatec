/* Escreva um script que aceite a entrada de um número inteiro do usuário e determine se o número é primo ou não.
 Se o número não for primo, exiba os únicos fatores primos do número. Lembre-se de que os fatores de um número primo
 são somente 1 e o próprio número primo. Cada número que não é primo tem uma fatoração em primos única. 
 Por exemplo, considere o número 54. Os fatores primos de 54 são 2, 3, 3 e 3. 
 Quando os valores são multiplicados, o resultado é 54. Para o número 54, a saída dos fatores primos deve ser 2 e 3.
*/

var readline = require('readline');

var leitor = readline.createInterface({
    input: process.stdin, output: process.stdout
});

var num: number = 0;
var primos: number[] = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

leitor.question("Digite um número inteiro: ", function (answer: string) {
    num = parseInt(answer);
    console.log("O número digitado: ",num,isPrimo(num)?"é":"não é","primo.")
    if(!isPrimo(num)){
        console.log("<< Fatorando >>");
        for(let n of primos ){
            while(num%n==0){
                console.log(num,"==> Fator: ",n);
                num /= n;
            }
        }
    }
    leitor.close();
});

function isPrimo(n: number): boolean {
    for (var divisor = 2; divisor < n; divisor++)
        if (n % divisor == 0) return false;
    return true;
}