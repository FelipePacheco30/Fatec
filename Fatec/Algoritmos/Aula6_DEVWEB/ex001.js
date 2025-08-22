const prompt = require("prompt-sync")()
function maior(n1, n2){
    if (n1 > n2){
        return n1
    }
    else{
        return n2
    }
}
m = maior(2, 3)
console.log(`Maior: ${m}`)
m = maior(5, 2)
console.log(`Maior: ${m}`)