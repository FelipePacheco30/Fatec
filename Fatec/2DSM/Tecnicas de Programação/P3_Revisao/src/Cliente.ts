import Pessoa from "./Pessoa";

export default class Cliente extends Pessoa {
  private saldo: number;

  constructor(nome: string, email: string, nasc: Date, saldo: number) {
    super(nome, email, nasc);
    this.saldo = saldo;
  }

  imprimir(): void {
    console.log("Nome:", this.nome);
    console.log("e-Mail:", this.email);
    console.log("Data Nasc.:", this.formatNasc());
    console.log("Idade:", this.idade(), "anos");
    console.log("Faixa Etária:", this.faixaEtaria());
    console.log("Anos Bissextos:", this.numBissextos());
    console.log("Saldo:", this.saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
  }
}
