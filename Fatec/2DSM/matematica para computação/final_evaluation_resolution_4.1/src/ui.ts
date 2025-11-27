// src/ui.ts (versão atualizada para exibir observações como solicitado)
import { scenarioA_calc, scenarioB_calc, annualToMonthly, monthlyToAnnual, monthsToYearsMonthsText } from './finance';

export function bindUI() {
  const scenarioEl = document.getElementById('cenario') as HTMLSelectElement | null;
  const capitalInicialEl = document.getElementById('capitalInicial') as HTMLInputElement | null;
  const capitalFinalEl = document.getElementById('capitalFinal') as HTMLInputElement | null;
  const tipoTaxaEl = document.getElementById('tipoTaxa') as HTMLSelectElement | null;
  const taxaEl = document.getElementById('taxa') as HTMLInputElement | null;
  const aporteContainer = document.getElementById('aporteContainer') as HTMLDivElement | null;
  const momentoAporteEl = document.getElementById('momentoAporte') as HTMLSelectElement | null;
  const aporteMensalEl = document.getElementById('aporteMensal') as HTMLInputElement | null;
  const calcularBtn = document.getElementById('calcularBtn') as HTMLButtonElement | null;
  const resetBtn = document.getElementById('reset') as HTMLButtonElement | null;
  const resultadoEl = document.getElementById('resultado') as HTMLDivElement | null;
  const resultBody = document.getElementById('resultBody') as HTMLElement | null;
  const historicoBox = document.getElementById('historico') as HTMLElement | null;
  const histList = document.getElementById('histList') as HTMLElement | null;
  const summarySmall = document.getElementById('summarySmall') as HTMLElement | null;

  const missing = [];
  if (!scenarioEl) missing.push('cenario');
  if (!capitalInicialEl) missing.push('capitalInicial');
  if (!capitalFinalEl) missing.push('capitalFinal');
  if (!tipoTaxaEl) missing.push('tipoTaxa');
  if (!taxaEl) missing.push('taxa');
  if (!calcularBtn) missing.push('calcularBtn');
  if (!resultadoEl) missing.push('resultado');
  if (!resultBody) missing.push('resultBody');

  if (missing.length > 0) {
    console.error('bindUI: elementos essenciais faltando no HTML. IDs esperados:', missing);
    return;
  }

  function parseNumberInput(v: string | undefined | null): number {
    if (v === undefined || v === null) return NaN;
    const n = Number(String(v).replace(',', '.').trim());
    return Number.isFinite(n) ? n : NaN;
  }
  function formatCurrency(v: number) {
    try { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
    catch { return 'R$ ' + v.toFixed(2); }
  }
  function fmtPercDecimal(d: number, digits = 6) {
    return `${(d * 100).toFixed(digits)}%`;
  }
  function normalizeTipoTaxa(raw: string | null | undefined) {
    if (!raw) return 'annual';
    const s = String(raw).trim().toLowerCase();
    if (s === 'annual' || s === 'anual' || s === 'yearly') return 'annual';
    if (s === 'monthly' || s === 'mensal' || s === 'month') return 'monthly';
    return s;
  }

  function updateAporteVisibility() {
    if (!aporteContainer || !scenarioEl) return;
    aporteContainer.style.display = scenarioEl.value === 'b' ? 'block' : 'none';
  }
  updateAporteVisibility();
  scenarioEl.addEventListener('change', updateAporteVisibility);

  resetBtn && resetBtn.addEventListener('click', () => {
    if (capitalInicialEl) capitalInicialEl.value = '1000';
    if (capitalFinalEl) capitalFinalEl.value = '2000';
    if (taxaEl) taxaEl.value = '12';
    if (aporteMensalEl) aporteMensalEl.value = '50';
    if (resultadoEl) resultadoEl.innerHTML = '';
    if (resultBody) resultBody.innerHTML = '';
    if (historicoBox) historicoBox.classList.add('hidden');
    if (summarySmall) summarySmall.textContent = 'Resultados e histórico aparecem abaixo';
    updateAporteVisibility();
  });

  function fillResultTable(rows: [string, string][]) {
    if (!resultBody) return;
    resultBody.innerHTML = rows.map(r => `<tr><td>${r[0]}</td><td><strong>${r[1]}</strong></td></tr>`).join('');
  }
calcularBtn.addEventListener('click', () => {
  if (resultBody) resultBody.innerHTML = '';
  if (histList) histList.innerHTML = '';
  if (historicoBox) historicoBox.classList.add('hidden');

  const C0 = parseNumberInput(capitalInicialEl!.value);
  const Cf = parseNumberInput(capitalFinalEl!.value);
  const taxaNum = parseNumberInput(taxaEl!.value); // percentual (ex: 12 ou 1)
  const tipoTaxaRaw = tipoTaxaEl!.value;
  const tipoTaxa = normalizeTipoTaxa(tipoTaxaRaw);

  if (!Number.isFinite(C0) || C0 <= 0) { alert('C0 inválido'); return; }
  if (!Number.isFinite(Cf) || Cf <= 0) { alert('Cf inválido'); return; }
  if (!Number.isFinite(taxaNum)) { alert('Taxa inválida'); return; }

  // ---- preparar variáveis que podem ser usadas em A ou B ----
  let iMonthly: number;
  let obsHtml = ''; // HTML para colocar na célula "Observação taxa"
  let annualEqFormattedShort = '';
  let annualEqFormattedPrecise = '';

  if (tipoTaxa === 'annual') {
    const iAnnualDecimal = taxaNum / 100;
    iMonthly = annualToMonthly(iAnnualDecimal);
    // Monta HTML com duas linhas: versão "racional" (2 casas) e precisão (≈)
    obsHtml = `<div style="line-height:1.25; text-align:left;">
                 Taxa anual informada: ${(iAnnualDecimal * 100)}%<br>
                 mensal equivalente: ${(iMonthly * 100).toFixed(2)}% (≈ ${(iMonthly * 100).toFixed(6)}%)
               </div>`;
  } else { // monthly
    iMonthly = taxaNum / 100;
    const annualEq = monthlyToAnnual(iMonthly);
    annualEqFormattedShort = (annualEq * 100).toFixed(2);
    annualEqFormattedPrecise = (annualEq * 100).toFixed(6);
    // Monta HTML com duas linhas: mostra taxa mensal (arredondada) e precisão
    obsHtml = `<div style="line-height:1.25; text-align:left;">
                 Taxa mensal informada: ${(iMonthly * 100)}%<br>
                 anual equivalente: ${annualEqFormattedShort}% (≈ ${annualEqFormattedPrecise}%)
               </div>`;
  }

  try {
    if (scenarioEl!.value === 'a') {
      const { monthsExact, monthsCeil } = scenarioA_calc(C0, Cf, iMonthly);
      const human = monthsToYearsMonthsText(monthsExact, monthsCeil);
      const finalValueAtMonthsCeil = C0 * Math.pow(1 + iMonthly, monthsCeil);
      const rendimento = finalValueAtMonthsCeil - C0;

      const rows: [string,string][] = [
        ['Capital inicial (C₀)', `${formatCurrency(C0)}`],
        ['Capital alvo (C_f)', `${formatCurrency(Cf)}`],
        // aqui passamos o HTML diretamente — fillResultTable não escapará
        ['Observação taxa', `${obsHtml}`],
        ['Taxa mensal efetiva', `${fmtPercDecimal(iMonthly,6)} / mês`],
        ['Meses (exatos)', `${monthsExact.toFixed(4)} meses`],
        ['Meses inteiros necessários', `${monthsCeil} meses — ${human}`],
        ['Valor final (após arredondamento)', formatCurrency(finalValueAtMonthsCeil)],
        ['Rendimento (ganho)', formatCurrency(rendimento)]
      ];

      // Se o usuário informou taxa MENSAL, INSERIMOS também a linha com anual efetiva
      if (tipoTaxa === 'monthly') {
        // inserir antes de "Meses (exatos)" (índice 4)
        rows.splice(4, 0, ['Taxa anual efetiva', `${annualEqFormattedShort}% (≈ ${annualEqFormattedPrecise}%)`]);
      }

      fillResultTable(rows);
      if (summarySmall) summarySmall.textContent = 'Resultado calculado por fórmula fechada (log).';
      return;
    }

    // -------- Cenário B --------
    if (!aporteMensalEl) {
      alert('Erro: campo de aporte não encontrado no HTML.');
      return;
    }
    const c0 = parseNumberInput(aporteMensalEl.value) || 0;
    const timing = (momentoAporteEl && momentoAporteEl.value === 'start') ? 'start' : 'end';

    const res = scenarioB_calc(C0, c0, Cf, iMonthly, timing as 'start' | 'end', 10000, true);
    const human = monthsToYearsMonthsText(null, res.months);

    const rows: [string,string][] = [
      ['Capital inicial (C₀)', `${formatCurrency(C0)}`],
      ['Aporte mensal (c₀)', `${formatCurrency(c0)}`],
      ['Observação taxa', `${obsHtml}`],
      ['Taxa mensal efetiva', `${fmtPercDecimal(iMonthly,6)} / mês`],
      // placeholder para inserir taxa anual equivalente se for mensal (será inserido abaixo)
      ['Meses necessários', `${res.months} meses — ${human}`],
      ['Valor final alcançado', formatCurrency(res.finalValue)],
      ['Total aportado (soma)', formatCurrency(res.totalContributions)],
      ['Rendimento (ganho)', formatCurrency(res.totalYield)]
    ];

    if (tipoTaxa === 'monthly') {
      // inserir a conversão anual logo antes da linha "Meses necessários" (índice 4)
      rows.splice(4, 0, ['Taxa anual efetiva', `${annualEqFormattedShort}% (≈ ${annualEqFormattedPrecise}%)`]);
    }

    fillResultTable(rows);

    if (summarySmall) summarySmall.textContent = 'Resultado por simulação mês-a-mês.';

    if (res.history && res.history.length && histList && historicoBox) {
      historicoBox.classList.remove('hidden');
      res.history.forEach((h: any) => {
        const item = document.createElement('div');
        item.className = 'historico-item';
        item.innerHTML = `
          <div class="month">Mês ${h.month}</div>
          <div class="values">
            <div><strong>Antes juros:</strong> ${formatCurrency(Number(h.valueBeforeInterest))}</div>
            <div><strong>Após juros:</strong> ${formatCurrency(Number(h.valueAfterInterest))}</div>
            <div><strong>Aporte:</strong> ${h.contribution ? formatCurrency(Number(h.contribution)) : '-'}</div>
            <div><strong>Final:</strong> ${formatCurrency(Number(h.valueAfterContribution))}</div>
          </div>`;
        histList.appendChild(item);
      });
    }
  } catch (e: any) {
    alert('Erro: ' + (e && e.message ? e.message : String(e)));
  }
})};
