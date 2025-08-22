const prompt = require("prompt-sync")();
fruta = prompt("Entre com o nome da fruta: ");
switch (fruta){
    case "Laranja":
        console.log("R$3,50");
        break;
    case "Limão":
        console.log("R$3,00");
        break;
    case "Acerola":
        console.log("R$3,50");
        break;
    case "Manga":
        console.log("R$4,00");
        break;
    case "Melancia":
        console.log("R$4,00");
        break;
    case "Morango":
        console.log("R$5,00");
        break;
    case "Maracuja":
        console.log("R$4,50");
        break;
    case "Açai":
        console.log("R$6,00");
        break;
}
