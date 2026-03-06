class Pessoa {
  nome: string;
  email: string;
  nasc: string;

  constructor(nome:string, email:string, nasc:string){
    this.nome = nome;
    this.email = email;
    this.nasc = nasc;
  }
  imprimir(){
    console.log(`Nome: ${this.nome}\nEmail: ${this.email}\nNascimento: ${this.nasc}`);
  }
  idade(nasc:any){
    const data = new Date();
    const ano = parseInt(nasc.substring(6, 10));
    const mes = parseInt(nasc.substring(3, 5));
    const dia = parseInt(nasc.substring(0, 2));
    const dataNasc = new Date(ano, mes, dia);
    const idade = data.getFullYear() - dataNasc.getFullYear();
    
    if ()

    
  }

}

const cliente = new Pessoa("felipe", "felipe@gmail.com", "19/02/2006");

cliente.imprimir();
const resultado = cliente.idade(cliente.nasc);
console.log(`Idade: ${resultado}`);