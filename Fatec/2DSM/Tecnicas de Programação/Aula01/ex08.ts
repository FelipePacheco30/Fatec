const aleatorio = (): number => Math.floor(Math.random() * 100);

const aleatorios = (quantidade: number): number[] => {
    const res: number[] = [];
    for(let i = 0; i < quantidade; i++){
        res.push(aleatorio());
    }
    return res;
}

console.log("5 números aleatórios:", aleatorios(5));
console.log("3 números aleatórios:", aleatorios(3));
