import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

function toNumber(input: string): number {
  const n = Number(input.replace(',', '.').trim());
  return Number.isFinite(n) ? n : NaN;
}

function annualToMonthly(iAnnualDecimal: number) {
  return iAnnualDecimal / 12;
}

function monthsToYearsMonthsText(monthsDecimal: number | null, monthsInt: number) {
  const years = Math.floor(monthsInt / 12);
  const rem = monthsInt % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ano${years > 1 ? 's' : ''}`);
  if (rem > 0) parts.push(`${rem} mês${rem > 1 ? 'es' : ''}`);
  const human = parts.length > 0 ? parts.join(' e ') : '0 meses';
  const fracText = monthsDecimal !== null ? ` (≈ ${monthsDecimal.toFixed(2)} meses)` : '';
  return `${human}${fracText}`;
}
//cal
function scenarioA_calc(C0: number, Cf: number, iMonthly: number) {
  if (C0 <= 0) throw new Error('C0 deve ser > 0');
  if (Cf <= C0) throw new Error('Cf deve ser maior que C0');
  if (iMonthly <= -1) throw new Error('taxa mensal inválida');
  if (Math.abs(iMonthly) < 1e-12) throw new Error('taxa zero; impossível crescer com juros nulos');

  const monthsExact = Math.log(Cf / C0) / Math.log(1 + iMonthly);
  const monthsCeil = Math.ceil(monthsExact);
  return { monthsExact, monthsCeil };
}

function scenarioB_calc(C0: number, c0: number, Cf: number, iMonthly: number, maxMonths = 10000) {
  if (C0 <= 0) throw new Error('C0 deve ser > 0');
  if (c0 < 0) throw new Error('c0 não pode ser negativo');
  if (Cf <= C0 && c0 === 0) throw new Error('Cf deve ser maior que C0 se não houver aportes');
  if (iMonthly <= -1) throw new Error('taxa mensal inválida');

  let value = C0;
  let month = 0;
  if (value >= Cf) return { months: 0, finalValue: value };

  while (month < maxMonths) {
    month += 1;
    value = value * (1 + iMonthly); 
    if (month >= 2 && c0 > 0) value += c0; 
    if (value >= Cf) return { months: month, finalValue: value };
    if (Math.abs(iMonthly) < 1e-12 && c0 === 0) break;
  }
  throw new Error(`não atingido dentro de ${maxMonths} meses`);
}

(async function main() {
  try {
    console.log('\n--- Planejamento Financeiro (interativo e simples) ---\n');

    let cen = (await question('Escolha o cenário (a) depósito inicial ou (b) depósito inicial + aportes): ')).trim().toLowerCase();
    if (cen !== 'a' && cen !== 'b') { console.log('Opção inválida. Encerrando.'); rl.close(); return; }

    const C0s = await question('Capital inicial C0 (ex: 1000): ');
    const C0 = toNumber(C0s);
    if (!Number.isFinite(C0) || C0 <= 0) { console.log('C0 inválido. Encerrando.'); rl.close(); return; }

    const Cfs = await question('Capital alvo Cf (ex: 2000): ');
    const Cf = toNumber(Cfs);
    if (!Number.isFinite(Cf) || Cf <= 0) { console.log('Cf inválido. Encerrando.'); rl.close(); return; }

    let tipoTaxa = (await question('Sua taxa i está em (1) anual (%) ou (2) mensal (%)? Digite 1 ou 2: ')).trim();
    if (tipoTaxa !== '1' && tipoTaxa !== '2') { console.log('Opção inválida. Encerrando.'); rl.close(); return; }

    const taxas = await question('Digite a taxa (porcentagem). Ex: 12 para 12%: ');
    const taxaNum = toNumber(taxas);
    if (!Number.isFinite(taxaNum)) { console.log('Taxa inválida. Encerrando.'); rl.close(); return; }

    const iMonthly = (tipoTaxa === '1') ? annualToMonthly(taxaNum / 100) : (taxaNum / 100);

    if (cen === 'a') {
      try {
        const { monthsExact, monthsCeil } = scenarioA_calc(C0, Cf, iMonthly);
        const human = monthsToYearsMonthsText(monthsExact, monthsCeil);
        console.log('\nResultado (cenário a):');
        console.log(`- Meses exatos: ${monthsExact.toFixed(4)} meses`);
        console.log(`- Meses inteiros necessários: ${monthsCeil} meses => ${human}`);
        console.log('\nInterpretação: se aplicar o capital por esse período (ou mais), C0 alcançará ou superará Cf.');
      } catch (e: any) {
        console.log('Erro:', e.message || e);
      }
    } else {
      const c0s = await question('Aporte mensal fixo c0 (a partir do 2º mês). Digite 0 se não houver: ');
      const c0 = toNumber(c0s);
      if (!Number.isFinite(c0) || c0 < 0) { console.log('c0 inválido. Encerrando.'); rl.close(); return; }

      try {
        const res = scenarioB_calc(C0, c0, Cf, iMonthly, 10000);
        const human = monthsToYearsMonthsText(null, res.months);
        console.log('\nResultado (cenário b):');
        console.log(`- Meses necessários: ${res.months} meses => ${human}`);
        console.log(`- Valor final alcançado: R$ ${res.finalValue.toFixed(2)}`);
        console.log('\nInterpretação: mantendo o aporte mensal descrito, o capital alcançará Cf no período acima.');
      } catch (e: any) {
        console.log('Erro:', e.message || e);
      }
    }

  } catch (err) {
    console.error('Erro inesperado:', err);
  } finally {
    rl.close();
  }
})();
