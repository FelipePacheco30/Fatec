function inverte(nome){
    i = 0
    resultado = ""
    while (i < nome.length){
        resultado = nome[i] + resultado
        i ++
    }
    return resultado
}
r = inverte("Pedro")
console.log(`Invertido: ${r}`)
r = inverte("Mariana")
console.log(`Invertido: ${r}`)