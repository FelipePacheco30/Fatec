const prompt = require('prompt-sync')();

function mes_por_extenso() {
    let mes = " "
    let num = prompt("Digite o número de um mês 1-12: ")
    switch (num) {
        case 1:
            mes = "Janeiro"
    }
    console.log(mes)
} 

mes_por_extenso();
