var numeros:number[] = [];
var cidades:string[] = Array();
var estados:string[] = Array(4);
numeros[0] = 10;
numeros[1] = 5;
numeros[2] = 1;
cidades[0] = "São Paulo";
estados[0] = "SP";
cidades[1] = "Rio de Janeiro";
estados[1] = "RJ";

var vetor:number[] = [];
for(var x:number=0;x<5;x++){
    vetor[x] = x;
}

var cidades:string[] = ["São Paulo", "Rio de Janeiro", "Salvador", "Belo Horizonte", "Porto Alegre"];
for(var i = 0;i < 5;i++){
  	console.log("Gostaria de visitar a cidade:",cidades[i]);
}

var capitais: (string | string)[] = ["São Paulo", "SP",
    "Curitiba", "PR",
    "Porto Alegre", "RS",
    "Salvador", "BA"
];

var funcionarios: Array < string | number >
    = ['Junior', 1, 'Vivian', 3, 'Sonia', 8];

console.log(capitais[0][0]);
