document.addEventListener('DOMContentLoaded', () => {
  const cenarioSelect = document.getElementById('cenario');
  const aportesSection = document.getElementById('aportes-section');
  const taxaBtns = document.querySelectorAll('.taxa-btn');
  const resultadoDiv = document.getElementById('resultado');
  let tipoTaxa = '1'; // padrão anual

  taxaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      taxaBtns.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
      tipoTaxa = btn.dataset.tipo;
    });
  });

  cenarioSelect.addEventListener('change', () => {
    aportesSection.classList.toggle('hidden', cenarioSelect.value === 'a');
  });

  document.getElementById('calcular').addEventListener('click', () => {
    const C0 = parseFloat(document.getElementById('C0').value);
    const Cf = parseFloat(document.getElementById('Cf').value);
    const taxa = parseFloat(document.getElementById('taxa').value) / 100;
    const c0 = parseFloat(document.getElementById('c0')?.value || 0);

    if (!C0 || !Cf || !taxa) {
      resultadoDiv.innerHTML = `<p style="color:#ff6b6b;">⚠️ Preencha todos os campos obrigatórios.</p>`;
      return;
    }

    const iMonthly = tipoTaxa === '1' ? taxa / 12 : taxa;

    if (cenarioSelect.value === 'a') {
      const monthsExact = Math.log(Cf / C0) / Math.log(1 + iMonthly);
      const monthsCeil = Math.ceil(monthsExact);
      resultadoDiv.innerHTML = `
        <h3>📊 Resultado (Cenário A)</h3>
        <p>Meses exatos: ${monthsExact.toFixed(2)} meses</p>
        <p>Meses inteiros necessários: ${monthsCeil} meses</p>
      `;
    } else {
      let value = C0, month = 0;
      while (value < Cf && month < 10000) {
        month++;
        value *= (1 + iMonthly);
        if (month >= 2 && c0 > 0) value += c0;
      }
      resultadoDiv.innerHTML = `
        <h3>📊 Resultado (Cenário B)</h3>
        <p>Meses necessários: ${month} meses</p>
        <p>Valor final alcançado: R$ ${value.toFixed(2)}</p>
      `;
    }
  });
});
