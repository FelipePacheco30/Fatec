const operarAnonima = function<T, U>(v1: T[], v2: U[]): (T | U)[] {
    let res: (T | U)[] = [];
    for(let i = 0; i < v1.length; i++){
        res[i] = (v1[i] as any) + (v2[i] as any);
    }
    return res;
};

const vet1a: number[] = [5,3,1,8,2];
const vet2a: string[] = ["M","a","r","i","a"];
console.log("Resultado:", operarAnonima(vet1a,vet2a));
