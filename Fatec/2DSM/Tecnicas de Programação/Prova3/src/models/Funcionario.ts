export abstract class Funcionario {
  protected matricula: number;
  public nome: string;
  public idade: number;
  public email: string;
  public salario: number;
  public cargo: string;
  constructor(matricula: number, nome: string, idade: number, email: string, salario: number, cargo: string) {
    this.matricula = matricula;
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.salario = salario;
    this.cargo = cargo;
  }
  protected validaEmailBase(): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(this.email);
  }
  public validaEmail(): boolean {
    return this.validaEmailBase();
  }
  protected calcINSSPorAliquota(salarioContrib: number): number {
    let aliquota = 0;
    if (salarioContrib <= 1412.0) aliquota = 0.075;
    else if (salarioContrib <= 2666.68) aliquota = 0.09;
    else if (salarioContrib <= 4000.03) aliquota = 0.12;
    else aliquota = 0.14;
    let inss = salarioContrib * aliquota;
    if (inss > 908.85) inss = 908.85;
    return parseFloat(inss.toFixed(2));
  }
  public abstract calcSalario(): number;
  public getMatricula(): number {
    return this.matricula;
  }
}
