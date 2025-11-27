const substituir = function(entrada: string, letra: string, novo: string): string[] {
    let res: string[] = [];
    for(let i = 0; i < entrada.length; i++){
        if( entrada[i] == letra ){
            res.push(novo);
        }
        else{
            res.push(entrada[i]);
        }
    }
    return res;
};

console.log("Substituir 'a' por '-':", substituir("Mariana","a","-"));
console.log("Substituir 'e' por '8':", substituir("Perspectiva","e","8"));
