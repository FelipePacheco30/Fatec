export default class Pessoa {
  public nome: string;
  public email: string;
  public nasc: Date;

  constructor(nome: string, email: string, nasc: Date) {
    this.nome = nome;
    this.email = email;
    this.nasc = nasc;
  }

  idade(): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.nasc.getFullYear();
    const mesDiff = hoje.getMonth() - this.nasc.getMonth();
    if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < this.nasc.getDate())) {
      idade--;
    }
    return idade;
  }

  numBissextos(): number {
    const hoje = new Date();
    const inicio = this.nasc.getFullYear();
    const fim = hoje.getFullYear();
    let count = 0;
    for (let y = inicio; y <= fim; y++) {
      if ((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)) {
        const feb29 = new Date(Date.UTC(y, 1, 29));
        const nascimentoUTC = new Date(Date.UTC(this.nasc.getFullYear(), this.nasc.getMonth(), this.nasc.getDate()));
        const hojeUTC = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()));
        if (feb29 >= nascimentoUTC && feb29 <= hojeUTC) {
          count++;
        }
      }
    }
    return count;
  }

  faixaEtaria(): string {
    const i = this.idade();
    if (i >= 0 && i < 13) return "Criança";
    if (i >= 13 && i < 18) return "Adolescente";
    if (i >= 18 && i < 60) return "Adulto";
    if (i >= 60 && i < 100) return "Idoso";
    return "Matusalém";
  }

  formatNasc(): string {
    return this.nasc.toLocaleString("pt-BR", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" });
  }
}
