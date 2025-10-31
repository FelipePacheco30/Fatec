// src/ui.ts
import {
  toNumber,
  annualToMonthly,
  monthsToYearsMonthsText,
  scenarioA_calc,
  scenarioB_calc
} from './finance';

// Função que liga os inputs da página às funções de cálculo.
// Não faz consultas a servidor — roda 100% no cliente (bundle).
export function bindUI() {
  const scenarioEl = document.getElementById('scenario') as HTMLSelectElement | null;
  const taxTypeEl = document.getElementById('taxType') as HTMLSelectElement | null;
  const rateEl = document.getElementById('rate') as HTMLInputElement | null;
  const c0El = document.getElementById('c0') as HTMLInputElement | null;
  const C0El = document.getElementById('C0') as HTMLInputElement | null;
  const CfEl = document.getElementById('Cf') as HTMLInputElement | null;
  const runBtn = document.getElementById('run') as HTMLButtonElement | null;
  const output = document.getElementById('output') as HTMLElement | null;
  const historyToggle = document.getElementById('showHistory') as HTMLInputElement | null;
  const historyBody = document.getElementById('historyBody') as HTMLElement | null;
  const moreBlock = document.getElementById('more') as HTMLElement | null;
  const aporteBlock = document.getElementById('aporteBlock') as HTMLElement | null;

  if (!scenarioEl || !rateEl || !C0El || !CfEl || !runBtn || !output) {
    console.warn('bindUI: elementos DOM não encontrados (ids inválidos).');
    return;
  }

  // exibe/oculta bloco de aporte quando necessário
  scenarioEl.addEventListener('change', () => {
    if (scenarioEl.value === 'b') {
      aporteBlock?.classList.remove('hidden');
      moreBlock?.classList.remove('hidden');
    } else {
      aporteBlock?.classList.add('hidden');
      moreBlock?.classList.add('hidden');
    }
  });

  runBtn.addEventListener('click', () => {
    output.innerHTML = '';
    if (historyBody) historyBody.innerHTML = '';

    const C0 = toNumber(C0El.value);
    const Cf = toNumber(CfEl.value);
    const taxa = toNumber(rateEl.value);
    const tipoTaxa = (taxTypeEl?.value ?? 'annual');

    try {
      if (!Number.isFinite(C0) || C0 <= 0) throw new Error('C0 inválido.');
      if (!Number.isFinite(Cf) || Cf <= 0) throw new Error('Cf inválido.');
      if (!Number.isFinite(taxa)) throw new Error('Taxa inválida.');

      const iMonthly = tipoTaxa === 'annual' ? annualToMonthly(taxa / 100) : (taxa / 100);

      if (scenarioEl.value === 'a') {
        const { monthsExact, monthsCeil } = scenarioA_calc(C0, Cf, iMonthly);
        const human = monthsToYearsMonthsText(monthsExact, monthsCeil);
        output.innerHTML = `<strong>Cenário A</strong><br>- Meses exatos: ${monthsExact.toFixed(4)}<br>- Meses inteiros: ${monthsCeil} ⇒ ${human}`;
      } else {
        const c0 = toNumber(c0El?.value ?? '0');
        if (!Number.isFinite(c0) || c0 < 0) throw new Error('c0 inválido.');

        const res = scenarioB_calc(C0, c0, Cf, iMonthly, 10000, true);
        const human = monthsToYearsMonthsText(null, res.months);
        output.innerHTML = `<strong>Cenário B</strong><br>- Meses necessários: ${res.months} ⇒ ${human}<br>- Valor final: R$ ${res.finalValue.toFixed(2)}`;

        // popula histórico se houver e o usuário marcar
        if (res.history && res.history.length && historyBody) {
          historyBody.innerHTML = res.history.map(h => `
            <tr>
              <td>${h.month}</td>
              <td>R$ ${h.valueBeforeInterest.toFixed(2)}</td>
              <td>R$ ${h.valueAfterInterest.toFixed(2)}</td>
              <td>${h.contribution ? 'R$ ' + h.contribution.toFixed(2) : '-'}</td>
              <td>R$ ${h.valueAfterContribution.toFixed(2)}</td>
            </tr>
          `).join('');
        }
      }
    } catch (err: any) {
      output.textContent = 'Erro: ' + (err && err.message ? err.message : String(err));
    }
  });
}
