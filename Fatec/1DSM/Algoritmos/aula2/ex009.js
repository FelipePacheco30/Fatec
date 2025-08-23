const prompt = require("prompt-sync")();
peso = parseFloat(prompt("Insira o seu peso: "));
altura = parseFloat(prompt("Insira a sua altura: "));
imc = (peso / altura) * altura 
if (imc > 40){
    console.log("Obesidade grau III (Mórbida)");
}
else if(imc >= 35 && imc < 39.9 ){
    console.log("Obesidade grau II (Severa)");
}
else if(imc >= 30 && imc<= 34.9 ){
    console.log("Obesidade grau I ");
}
else if(imc >= 25 && imc <= 29.9 ){
    console.log("Levemente acima do peso");
}
else if(imc >=18.6 && imc <= 24.9 ){
    console.log("Peso ideal(parabens)");
}
else{
    console.log("Abaixo do peso");
}