const operarArrow = <T, U>(v1: T[], v2: U[]): (T | U)[] =>
    v1.map((v, i) => (v as any) + (v2[i] as any));

const vet1b: number[] = [5,3,1,8,2];
const vet2b: string[] = ["M","a","r","i","a"];
console.log("Resultado:", operarArrow(vet1b,vet2b));
