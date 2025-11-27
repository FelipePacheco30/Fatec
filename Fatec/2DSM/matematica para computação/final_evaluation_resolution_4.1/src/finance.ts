// src/finance.ts
export function toNumber(input: string): number {
  const n = Number(String(input).replace(',', '.').trim());
  return Number.isFinite(n) ? n : NaN;
}

// função de taxa equivalente: anual -> mensal
export function annualToMonthly(iAnnualDecimal: number): number {
  if (iAnnualDecimal <= -1) throw new Error('taxa anual inválida');
  return Math.pow(1 + iAnnualDecimal, 1 / 12) - 1;
}

// função nova: mensal -> anual equivalente
export function monthlyToAnnual(iMonthlyDecimal: number): number {
  if (iMonthlyDecimal <= -1) throw new Error('taxa mensal inválida');
  return Math.pow(1 + iMonthlyDecimal, 12) - 1;
}

export function monthsToYearsMonthsText(monthsDecimal: number | null, monthsInt: number) {
  const years = Math.floor(monthsInt / 12);
  const rem = monthsInt % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ano${years > 1 ? 's' : ''}`);
  if (rem > 0) parts.push(`${rem} mês${rem > 1 ? 'es' : ''}`);
  const human = parts.length > 0 ? parts.join(' e ') : '0 meses';
  const fracText = monthsDecimal !== null ? ` (≈ ${monthsDecimal.toFixed(2)} meses)` : '';
  return `${human}${fracText}`;
}

/**
 * Cenário A: depósito inicial somente (fórmula fechada usando logaritmo)
 * Retorna { monthsExact, monthsCeil }.
 */
export function scenarioA_calc(C0: number, Cf: number, iMonthly: number) {
  if (C0 <= 0) throw new Error('C0 deve ser > 0');
  if (Cf <= C0) throw new Error('Cf deve ser maior que C0');
  if (iMonthly <= -1) throw new Error('taxa mensal inválida');
  if (Math.abs(iMonthly) < 1e-12) throw new Error('taxa zero; impossível crescer com juros nulos');

  const monthsExact = Math.log(Cf / C0) / Math.log(1 + iMonthly);
  const monthsCeil = Math.ceil(monthsExact);
  return { monthsExact, monthsCeil };
}

/**
 * Cenário B: depósito inicial + aportes com opção de timing:
 * timing = 'end' -> aporte no final do mês (após juros) — padrão
 * timing = 'start' -> aporte no início do mês (antes dos juros)
 *
 * A regra do enunciado (aportes a partir do 2º mês) é mantida: os aportes começam no mês 2.
 *
 * Retorno:
 * { months, finalValue, history?, totalContributions, totalYield }
 */
export function scenarioB_calc(
  C0: number,
  c0: number,
  Cf: number,
  iMonthly: number,
  timing: 'start' | 'end' = 'end',
  maxMonths = 10000,
  captureHistory = false
) {
  if (C0 <= 0) throw new Error('C0 deve ser > 0');
  if (c0 < 0) throw new Error('c0 não pode ser negativo');
  if (Cf <= C0 && c0 === 0) throw new Error('Cf deve ser maior que C0 se não houver aportes');
  if (iMonthly <= -1) throw new Error('taxa mensal inválida');

  let value = C0;
  let month = 0;
  const history: any[] | undefined = captureHistory ? [] : undefined;
  let totalContributions = 0;

  if (value >= Cf) {
    const totalYield = value - C0 - totalContributions;
    return { months: 0, finalValue: value, history, totalContributions, totalYield };
  }

  while (month < maxMonths) {
    month += 1;

    // caso aporte no início do mês: aplicamos aporte (a partir do 2º mês) antes de juros
    if (timing === 'start') {
      if (month >= 2 && c0 > 0) {
        value += c0;
        totalContributions += c0;
      }
      // aplicamos juros sobre o valor já com aporte
      const before = value;
      value = value * (1 + iMonthly);
      if (captureHistory) {
        history!.push({
          month,
          contributionAppliedAt: 'start',
          valueBeforeInterest: Number(before.toFixed(12)),
          valueAfterInterest: Number(value.toFixed(12)),
          contribution: (month >= 2 ? c0 : 0),
          valueAfterContribution: Number(value.toFixed(12)) // same because contribution was before interest
        });
      }
    } else {
      // timing === 'end' (aporte no fim do mês)
      // aplicamos juros primeiro
      const before = value;
      value = value * (1 + iMonthly);
      // só depois, se month >=2, adicionamos aporte
      if (month >= 2 && c0 > 0) {
        value += c0;
        totalContributions += c0;
      }
      if (captureHistory) {
        history!.push({
          month,
          contributionAppliedAt: 'end',
          valueBeforeInterest: Number(before.toFixed(12)),
          valueAfterInterest: Number((before * (1 + iMonthly)).toFixed(12)),
          contribution: (month >= 2 ? c0 : 0),
          valueAfterContribution: Number(value.toFixed(12))
        });
      }
    }

    if (value >= Cf) {
      const totalYield = value - C0 - totalContributions;
      return { months: month, finalValue: value, history, totalContributions, totalYield };
    }

    if (Math.abs(iMonthly) < 1e-12 && c0 === 0) break;
  }

  throw new Error(`não atingido dentro de ${maxMonths} meses`);
}
