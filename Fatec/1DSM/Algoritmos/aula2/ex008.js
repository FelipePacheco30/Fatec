const prompt = require("prompt-sync")();
temperatura = parseFloat(prompt("Entre com a temperatura corporal: ")) ;
if (temperatura >= 41){
    console.log("Hipertermia");
}
else if(temperatura >= 39.6 && temperatura < 41 ){
    console.log("Febre Alta");
}
else if(temperatura >= 37.8 && temperatura <= 39.5 ){
    console.log("Febre");
}
else if(temperatura >= 35.1 && temperatura <= 37.7 ){
    console.log("Normal");
}
else{
    console.log("Hipotermia");
}

