const prompt = require('prompt-sync')();

function bhaskara() {
    let a = parseInt(prompt("Digite o valor de A: "));
    let b = parseInt(prompt("Digite o valor de B: "));
    let c = parseInt(prompt("Digite o valor de C: "));

    if (a === 0) {
        console.log("Isso não é uma equação do 2º grau. 'a' deve ser diferente de zero.");
        return;
    }

    let delta = b * b - 4 * a * c;

    if (delta < 0) {
        console.log("Não há raízes reais.");
    } else if (delta === 0) {
        let x1 = -b / (2 * a);
        console.log(`A única raiz real é: x = ${x1}`);
    } else {
        let raizDelta = Math.sqrt(delta);
        let x1 = (-b + raizDelta) / (2 * a);
        let x2 = (-b - raizDelta) / (2 * a);
        console.log(`As raízes são: x1 = ${x1} e x2 = ${x2}`);
    }
}

bhaskara();
