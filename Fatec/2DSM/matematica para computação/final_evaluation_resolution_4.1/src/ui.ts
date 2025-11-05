// src/ui.ts
// Versão robusta: exporta bindUI e usa os IDs do seu HTML.
// Espera que finance.ts exporte: scenarioA_calc, scenarioB_calc, annualToMonthly, monthsToYearsMonthsText

import { scenarioA_calc, scenarioB_calc, annualToMonthly, monthsToYearsMonthsText } from './finance';

// Exportamos a função para que main.ts possa importá-la e chamá-la.
export function bindUI() {
  // obter elementos do DOM (IDs devem existir no HTML)
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

  // checagem básica
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
    // não lançamos erro para não quebrar todo o app, mas nenhuma ação fará sentido se estiver faltando o essencial
    return;
  }

  // Helper utilities
  function toNumber(input: string | undefined | null): number {
    if (input === undefined || input === null) return NaN;
    const n = Number(String(input).replace(',', '.').trim());
    return Number.isFinite(n) ? n : NaN;
  }
  function formatCurrency(v: number) {
    try { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
    catch { return 'R$ ' + v.toFixed(2); }
  }

  // Atualizar visibilidade do bloco de aporte conforme cenário
  function updateAporteVisibility() {
    if (!aporteContainer || !scenarioEl) return;
    if (scenarioEl.value === 'b') aporteContainer.style.display = 'block';
    else aporteContainer.style.display = 'none';
  }
  updateAporteVisibility();
  scenarioEl.addEventListener('change', updateAporteVisibility);

  // Reset visual e campos
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

  // Função que preenche a tabela de resultado (tbody)
  function fillResultTable(rows: [string, string][]) {
    if (!resultBody) return;
    resultBody.innerHTML = rows.map(r => `<tr><td>${r[0]}</td><td><strong>${r[1]}</strong></td></tr>`).join('');
  }

  // Handler do botão calcular
  calcularBtn.addEventListener('click', () => {
    // limpar visual
    if (resultBody) resultBody.innerHTML = '';
    if (histList) histList.innerHTML = '';
    if (historicoBox) historicoBox.classList.add('hidden');

    // validar campos
    const C0 = toNumber(capitalInicialEl!.value);
    const Cf = toNumber(capitalFinalEl!.value);
    const taxaNum = toNumber(taxaEl!.value);
    const tipoTaxa = tipoTaxaEl!.value; // 'annual' ou 'monthly'

    if (!Number.isFinite(C0) || C0 <= 0) { alert('C0 inválido'); return; }
    if (!Number.isFinite(Cf) || Cf <= 0) { alert('Cf inválido'); return; }
    if (!Number.isFinite(taxaNum)) { alert('Taxa inválida'); return; }

    const iMonthly = (tipoTaxa === 'annual') ? annualToMonthly(taxaNum / 100) : (taxaNum / 100);

    try {
      if (scenarioEl!.value === 'a') {
        // Cenário A: fórmula fechada
        const { monthsExact, monthsCeil } = scenarioA_calc(C0, Cf, iMonthly);
        const human = monthsToYearsMonthsText(monthsExact, monthsCeil);
        const finalValueAtMonthsCeil = C0 * Math.pow(1 + iMonthly, monthsCeil);
        const rendimento = finalValueAtMonthsCeil - C0;

        const rows: [string,string][] = [
          ['Capital inicial (C₀)', `R$ ${C0.toFixed(2)}`],
          ['Capital alvo (C_f)', `R$ ${Cf.toFixed(2)}`],
          ['Taxa mensal', `${(iMonthly*100).toFixed(6)}% / mês`],
          ['Meses (exatos)', `${monthsExact.toFixed(4)} meses`],
          ['Meses inteiros necessários', `${monthsCeil} meses — ${human}`],
          ['Valor final (após arredondamento)', formatCurrency(finalValueAtMonthsCeil)],
          ['Rendimento (ganho)', formatCurrency(rendimento)]
        ];
        fillResultTable(rows);
        if (summarySmall) summarySmall.textContent = 'Resultado calculado por fórmula fechada (log).';
        return;
      }

      // Cenário B: aporte (apenas se aporteContainer for visível)
      // Validamos que o input #aporteMensal exista
      if (!aporteMensalEl) {
        alert('Erro: campo de aporte não encontrado no HTML.');
        return;
      }
      const c0 = toNumber(aporteMensalEl.value) || 0;
      const timing = (momentoAporteEl && momentoAporteEl.value === 'start') ? 'start' : 'end';

      // chamada correta: scenarioB_calc(C0, c0, Cf, iMonthly, timing, maxMonths?, captureHistory?)
      const res = scenarioB_calc(C0, c0, Cf, iMonthly, timing as 'start' | 'end', 10000, true);

      const human = monthsToYearsMonthsText(null, res.months);

      const rows: [string,string][] = [
        ['Capital inicial (C₀)', `R$ ${C0.toFixed(2)}`],
        ['Aporte mensal (c₀)', `R$ ${c0.toFixed(2)}`],
        ['Taxa mensal', `${(iMonthly*100).toFixed(6)}% / mês`],
        ['Meses necessários', `${res.months} meses — ${human}`],
        ['Valor final alcançado', formatCurrency(res.finalValue)],
        ['Total aportado (soma)', formatCurrency(res.totalContributions)],
        ['Rendimento (ganho)', formatCurrency(res.totalYield)]
      ];
      fillResultTable(rows);

      if (summarySmall) summarySmall.textContent = 'Resultado por simulação mês-a-mês.';

      // popular histórico, se houver
      if (res.history && res.history.length && histList && historicoBox) {
        historicoBox.classList.remove('hidden');
        res.history.forEach((h: any) => {
          const item = document.createElement('div');
          item.className = 'historico-item';
          item.innerHTML = `
            <div class="month">Mês ${h.month}</div>
            <div class="values">
              <div><strong>Antes juros:</strong> R$ ${Number(h.valueBeforeInterest).toFixed(2)}</div>
              <div><strong>Após juros:</strong> R$ ${Number(h.valueAfterInterest).toFixed(2)}</div>
              <div><strong>Aporte:</strong> ${h.contribution ? 'R$ ' + Number(h.contribution).toFixed(2) : '-'}</div>
              <div><strong>Final:</strong> R$ ${Number(h.valueAfterContribution).toFixed(2)}</div>
            </div>`;
          histList.appendChild(item);
        });
      }
    } catch (e: any) {
      alert('Erro: ' + (e && e.message ? e.message : String(e)));
    }
  });
}
