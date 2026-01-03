import { Funcionario } from './Funcionario'
import { leftPad } from '../utils'

export class Horista extends Funcionario {
  public horas: number;
  constructor(matricula: number, nome: string, idade: number, email: string, salario: number, horas: number, cargo: string) {
    super(matricula, nome, idade, email, salario, cargo);
    this.horas = horas;
  }
  public validaEmail(): boolean {
    if (!this.validaEmailBase()) return false;
    const allowed = /@(adm|dev|vendas)\.xpto\.tec\.br$/;
    return allowed.test(this.email);
  }
  public calcSalarioBruto(): number {
    const sh = this.salario;
    const sb = sh * this.horas;
    return parseFloat(sb.toFixed(2));
  }
  public calcDsr(): number {
    const sb = this.calcSalarioBruto();
    const dsr = sb / 25 * 4;
    return parseFloat(dsr.toFixed(2));
  }
  public calcINSS(): number {
    const sb = this.calcSalarioBruto();
    const dsr = this.calcDsr();
    const salarioContrib = sb + dsr;
    return this['calcINSSPorAliquota'](salarioContrib);
  }
  public calcSalario(): number {
    const sb = this.calcSalarioBruto();
    const dsr = this.calcDsr();
    const inss = this.calcINSS();
    const liquido = sb + dsr - inss;
    return parseFloat(liquido.toFixed(2));
  }
  public formatSaida(): string[] {
    const matricula = leftPad(this.getMatricula(), 5);
    const emailValido = this.validaEmail() ? 'Válido' : 'Inválido';
    const sb = this.calcSalarioBruto().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const dsr = this.calcDsr().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const horasPad = leftPad(this.horas, 3);
    const sh = this.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const inss = this.calcINSS().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const liquido = this.calcSalario().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const lines: string[] = [];
    lines.push('<< HORISTA >>');
    lines.push(`Matrícula: ${matricula}`);
    lines.push(`Nome: ${this.nome}`);
    lines.push(`e-Mail: ${this.email} - ${emailValido}`);
    if (!this.validaEmail()) return lines;
    lines.push(`Idade: ${this.idade}`);
    lines.push(`Função: ${this.cargo}`);
    lines.push(`Quantidades Horas Trabalhadas no mês: ${this.horas}`);
    lines.push(`Valor Hora.........: ${sh}`);
    lines.push(`(+) Salário Bruto..: ${sb}`);
    lines.push(`(+) DSR............: ${dsr}`);
    const totalMes = (this.calcSalarioBruto() + this.calcDsr()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    lines.push(`(=) Salário Mês....: ${totalMes}`);
    lines.push(`(-) INSS...........: ${inss}`);
    lines.push(`(=) Salário Líquido: ${liquido}`);
    return lines;
  }
}
