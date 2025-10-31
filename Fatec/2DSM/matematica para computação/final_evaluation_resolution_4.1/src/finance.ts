// src/finance.ts
// Lógica pura (sem Node I/O). Exporta funções para uso no frontend.

export function toNumber(input: string): number {
  const n = Number(input.replace(',', '.').trim());
  return Number.isFinite(n) ? n : NaN;
}

export function annualToMonthly(iAnnualDecimal: number) {
  return iAnnualDecimal / 12;
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
 * Cenário B: depósito inicial + aportes (simulação mês-a-mês)
 * Retorna { months, finalValue, history? } (history somente se captureHistory true).
 */
export function scenarioB_calc(
  C0: number,
  c0: number,
  Cf: number,
  iMonthly: number,
  maxMonths = 10000,
  captureHistory = false
) {
  if (C0 <= 0) throw new Error('C0 deve ser > 0');
  if (c0 < 0) throw new Error('c0 não pode ser negativo');
  if (Cf <= C0 && c0 === 0) throw new Error('Cf deve ser maior que C0 se não houver aportes');
  if (iMonthly <= -1) throw new Error('taxa mensal inválida');

  let value = C0;
  let month = 0;
  const history: any[] = captureHistory ? [] : undefined as any;

  if (value >= Cf) return { months: 0, finalValue: value, history };

  while (month < maxMonths) {
    month += 1;
    const before = value;
    const afterInterest = value * (1 + iMonthly);
    let contributed = 0;
    if (month >= 2 && c0 > 0) {
      value = afterInterest + c0;
      contributed = c0;
    } else {
      value = afterInterest;
    }
    if (captureHistory) {
      history.push({
        month,
        valueBeforeInterest: Number(before.toFixed(12)),
        valueAfterInterest: Number(afterInterest.toFixed(12)),
        contribution: contributed,
        valueAfterContribution: Number(value.toFixed(12))
      });
    }
    if (value >= Cf) return { months: month, finalValue: value, history };
    if (Math.abs(iMonthly) < 1e-12 && c0 === 0) break;
  }

  throw new Error(`não atingido dentro de ${maxMonths} meses`);
}
