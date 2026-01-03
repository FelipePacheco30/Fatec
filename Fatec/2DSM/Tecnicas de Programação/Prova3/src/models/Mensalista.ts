import { Funcionario } from './Funcionario'
import { leftPad } from '../utils'

export class Mensalista extends Funcionario {
  public faltas: number;
  constructor(matricula: number, nome: string, idade: number, email: string, salario: number, faltas: number, cargo: string) {
    super(matricula, nome, idade, email, salario, cargo);
    this.faltas = faltas;
  }
  public validaEmail(): boolean {
    if (!this.validaEmailBase()) return false;
    const allowed = /@(adm|dev|vendas)\.xpto\.tec\.br$/;
    return allowed.test(this.email);
  }
  public calcFaltas(): number {
    const sb = this.salario;
    const fts = sb / 30 * this.faltas;
    return parseFloat(fts.toFixed(2));
  }
  public calcINSS(): number {
    const sb = this.salario;
    const fts = this.calcFaltas();
    const salarioContrib = sb - fts;
    return this['calcINSSPorAliquota'](salarioContrib);
  }
  public calcSalario(): number {
    const sb = this.salario;
    const fts = this.calcFaltas();
    const inss = this.calcINSS();
    const liquido = sb - fts - inss;
    return parseFloat(liquido.toFixed(2));
  }
  public formatSaida(): string[] {
    const matricula = leftPad(this.getMatricula(), 5);
    const emailValido = this.validaEmail() ? 'Válido' : 'Inválido';
    const sb = this.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const fts = this.calcFaltas().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const faltasPad = leftPad(this.faltas, 2);
    const inss = this.calcINSS().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const liquido = this.calcSalario().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const lines: string[] = [];
    lines.push('<< MENSALISTA >>');
    lines.push(`Matrícula: ${matricula}`);
    lines.push(`Nome: ${this.nome}`);
    lines.push(`e-Mail: ${this.email} - ${emailValido}`);
    if (!this.validaEmail()) return lines;
    lines.push(`Idade: ${this.idade}`);
    lines.push(`Cargo: ${this.cargo}`);
    lines.push(`(+) Salário Mês....: ${sb}`);
    lines.push(`(-) Falta(s).......: ${fts} - ${faltasPad} dia(s)`);
    lines.push(`(-) INSS...........: ${inss}`);
    lines.push(`(=) Salário Líquido: ${liquido}`);
    return lines;
  }
}
