// src/finance.ts
function annualToMonthly(iAnnualDecimal) {
  return iAnnualDecimal / 12;
}
function monthsToYearsMonthsText(monthsDecimal, monthsInt) {
  const years = Math.floor(monthsInt / 12);
  const rem = monthsInt % 12;
  const parts = [];
  if (years > 0)
    parts.push(`${years} ano${years > 1 ? "s" : ""}`);
  if (rem > 0)
    parts.push(`${rem} m\xEAs${rem > 1 ? "es" : ""}`);
  const human = parts.length > 0 ? parts.join(" e ") : "0 meses";
  const fracText = monthsDecimal !== null ? ` (\u2248 ${monthsDecimal.toFixed(2)} meses)` : "";
  return `${human}${fracText}`;
}
function scenarioA_calc(C0, Cf, iMonthly) {
  if (C0 <= 0)
    throw new Error("C0 deve ser > 0");
  if (Cf <= C0)
    throw new Error("Cf deve ser maior que C0");
  if (iMonthly <= -1)
    throw new Error("taxa mensal inv\xE1lida");
  if (Math.abs(iMonthly) < 1e-12)
    throw new Error("taxa zero; imposs\xEDvel crescer com juros nulos");
  const monthsExact = Math.log(Cf / C0) / Math.log(1 + iMonthly);
  const monthsCeil = Math.ceil(monthsExact);
  return { monthsExact, monthsCeil };
}
function scenarioB_calc(C0, c0, Cf, iMonthly, timing = "end", maxMonths = 1e4, captureHistory = false) {
  if (C0 <= 0)
    throw new Error("C0 deve ser > 0");
  if (c0 < 0)
    throw new Error("c0 n\xE3o pode ser negativo");
  if (Cf <= C0 && c0 === 0)
    throw new Error("Cf deve ser maior que C0 se n\xE3o houver aportes");
  if (iMonthly <= -1)
    throw new Error("taxa mensal inv\xE1lida");
  let value = C0;
  let month = 0;
  const history = captureHistory ? [] : void 0;
  let totalContributions = 0;
  if (value >= Cf) {
    const totalYield = value - C0 - totalContributions;
    return { months: 0, finalValue: value, history, totalContributions, totalYield };
  }
  while (month < maxMonths) {
    month += 1;
    if (timing === "start") {
      if (month >= 2 && c0 > 0) {
        value += c0;
        totalContributions += c0;
      }
      const before = value;
      value = value * (1 + iMonthly);
      if (captureHistory) {
        history.push({
          month,
          contributionAppliedAt: "start",
          valueBeforeInterest: Number(before.toFixed(12)),
          valueAfterInterest: Number(value.toFixed(12)),
          contribution: month >= 2 ? c0 : 0,
          valueAfterContribution: Number(value.toFixed(12))
          // same because contribution was before interest
        });
      }
    } else {
      const before = value;
      value = value * (1 + iMonthly);
      if (month >= 2 && c0 > 0) {
        value += c0;
        totalContributions += c0;
      }
      if (captureHistory) {
        history.push({
          month,
          contributionAppliedAt: "end",
          valueBeforeInterest: Number(before.toFixed(12)),
          valueAfterInterest: Number((before * (1 + iMonthly)).toFixed(12)),
          contribution: month >= 2 ? c0 : 0,
          valueAfterContribution: Number(value.toFixed(12))
        });
      }
    }
    if (value >= Cf) {
      const totalYield = value - C0 - totalContributions;
      return { months: month, finalValue: value, history, totalContributions, totalYield };
    }
    if (Math.abs(iMonthly) < 1e-12 && c0 === 0)
      break;
  }
  throw new Error(`n\xE3o atingido dentro de ${maxMonths} meses`);
}

// src/ui.ts
function bindUI() {
  const scenarioEl = document.getElementById("cenario");
  const capitalInicialEl = document.getElementById("capitalInicial");
  const capitalFinalEl = document.getElementById("capitalFinal");
  const tipoTaxaEl = document.getElementById("tipoTaxa");
  const taxaEl = document.getElementById("taxa");
  const aporteContainer = document.getElementById("aporteContainer");
  const momentoAporteEl = document.getElementById("momentoAporte");
  const aporteMensalEl = document.getElementById("aporteMensal");
  const calcularBtn = document.getElementById("calcularBtn");
  const resetBtn = document.getElementById("reset");
  const resultadoEl = document.getElementById("resultado");
  const resultBody = document.getElementById("resultBody");
  const historicoBox = document.getElementById("historico");
  const histList = document.getElementById("histList");
  const summarySmall = document.getElementById("summarySmall");
  const missing = [];
  if (!scenarioEl)
    missing.push("cenario");
  if (!capitalInicialEl)
    missing.push("capitalInicial");
  if (!capitalFinalEl)
    missing.push("capitalFinal");
  if (!tipoTaxaEl)
    missing.push("tipoTaxa");
  if (!taxaEl)
    missing.push("taxa");
  if (!calcularBtn)
    missing.push("calcularBtn");
  if (!resultadoEl)
    missing.push("resultado");
  if (!resultBody)
    missing.push("resultBody");
  if (missing.length > 0) {
    console.error("bindUI: elementos essenciais faltando no HTML. IDs esperados:", missing);
    return;
  }
  function toNumber(input) {
    if (input === void 0 || input === null)
      return NaN;
    const n = Number(String(input).replace(",", ".").trim());
    return Number.isFinite(n) ? n : NaN;
  }
  function formatCurrency(v) {
    try {
      return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    } catch (e) {
      return "R$ " + v.toFixed(2);
    }
  }
  function updateAporteVisibility() {
    if (!aporteContainer || !scenarioEl)
      return;
    if (scenarioEl.value === "b")
      aporteContainer.style.display = "block";
    else
      aporteContainer.style.display = "none";
  }
  updateAporteVisibility();
  scenarioEl.addEventListener("change", updateAporteVisibility);
  resetBtn && resetBtn.addEventListener("click", () => {
    if (capitalInicialEl)
      capitalInicialEl.value = "1000";
    if (capitalFinalEl)
      capitalFinalEl.value = "2000";
    if (taxaEl)
      taxaEl.value = "12";
    if (aporteMensalEl)
      aporteMensalEl.value = "50";
    if (resultadoEl)
      resultadoEl.innerHTML = "";
    if (resultBody)
      resultBody.innerHTML = "";
    if (historicoBox)
      historicoBox.classList.add("hidden");
    if (summarySmall)
      summarySmall.textContent = "Resultados e hist\xF3rico aparecem abaixo";
    updateAporteVisibility();
  });
  function fillResultTable(rows) {
    if (!resultBody)
      return;
    resultBody.innerHTML = rows.map((r) => `<tr><td>${r[0]}</td><td><strong>${r[1]}</strong></td></tr>`).join("");
  }
  calcularBtn.addEventListener("click", () => {
    if (resultBody)
      resultBody.innerHTML = "";
    if (histList)
      histList.innerHTML = "";
    if (historicoBox)
      historicoBox.classList.add("hidden");
    const C0 = toNumber(capitalInicialEl.value);
    const Cf = toNumber(capitalFinalEl.value);
    const taxaNum = toNumber(taxaEl.value);
    const tipoTaxa = tipoTaxaEl.value;
    if (!Number.isFinite(C0) || C0 <= 0) {
      alert("C0 inv\xE1lido");
      return;
    }
    if (!Number.isFinite(Cf) || Cf <= 0) {
      alert("Cf inv\xE1lido");
      return;
    }
    if (!Number.isFinite(taxaNum)) {
      alert("Taxa inv\xE1lida");
      return;
    }
    const iMonthly = tipoTaxa === "annual" ? annualToMonthly(taxaNum / 100) : taxaNum / 100;
    try {
      if (scenarioEl.value === "a") {
        const { monthsExact, monthsCeil } = scenarioA_calc(C0, Cf, iMonthly);
        const human2 = monthsToYearsMonthsText(monthsExact, monthsCeil);
        const finalValueAtMonthsCeil = C0 * Math.pow(1 + iMonthly, monthsCeil);
        const rendimento = finalValueAtMonthsCeil - C0;
        const rows2 = [
          ["Capital inicial (C\u2080)", `R$ ${C0.toFixed(2)}`],
          ["Capital alvo (C_f)", `R$ ${Cf.toFixed(2)}`],
          ["Taxa mensal", `${(iMonthly * 100).toFixed(6)}% / m\xEAs`],
          ["Meses (exatos)", `${monthsExact.toFixed(4)} meses`],
          ["Meses inteiros necess\xE1rios", `${monthsCeil} meses \u2014 ${human2}`],
          ["Valor final (ap\xF3s arredondamento)", formatCurrency(finalValueAtMonthsCeil)],
          ["Rendimento (ganho)", formatCurrency(rendimento)]
        ];
        fillResultTable(rows2);
        if (summarySmall)
          summarySmall.textContent = "Resultado calculado por f\xF3rmula fechada (log).";
        return;
      }
      if (!aporteMensalEl) {
        alert("Erro: campo de aporte n\xE3o encontrado no HTML.");
        return;
      }
      const c0 = toNumber(aporteMensalEl.value) || 0;
      const timing = momentoAporteEl && momentoAporteEl.value === "start" ? "start" : "end";
      const res = scenarioB_calc(C0, c0, Cf, iMonthly, timing, 1e4, true);
      const human = monthsToYearsMonthsText(null, res.months);
      const rows = [
        ["Capital inicial (C\u2080)", `R$ ${C0.toFixed(2)}`],
        ["Aporte mensal (c\u2080)", `R$ ${c0.toFixed(2)}`],
        ["Taxa mensal", `${(iMonthly * 100).toFixed(6)}% / m\xEAs`],
        ["Meses necess\xE1rios", `${res.months} meses \u2014 ${human}`],
        ["Valor final alcan\xE7ado", formatCurrency(res.finalValue)],
        ["Total aportado (soma)", formatCurrency(res.totalContributions)],
        ["Rendimento (ganho)", formatCurrency(res.totalYield)]
      ];
      fillResultTable(rows);
      if (summarySmall)
        summarySmall.textContent = "Resultado por simula\xE7\xE3o m\xEAs-a-m\xEAs.";
      if (res.history && res.history.length && histList && historicoBox) {
        historicoBox.classList.remove("hidden");
        res.history.forEach((h) => {
          const item = document.createElement("div");
          item.className = "historico-item";
          item.innerHTML = `
            <div class="month">M\xEAs ${h.month}</div>
            <div class="values">
              <div><strong>Antes juros:</strong> R$ ${Number(h.valueBeforeInterest).toFixed(2)}</div>
              <div><strong>Ap\xF3s juros:</strong> R$ ${Number(h.valueAfterInterest).toFixed(2)}</div>
              <div><strong>Aporte:</strong> ${h.contribution ? "R$ " + Number(h.contribution).toFixed(2) : "-"}</div>
              <div><strong>Final:</strong> R$ ${Number(h.valueAfterContribution).toFixed(2)}</div>
            </div>`;
          histList.appendChild(item);
        });
      }
    } catch (e) {
      alert("Erro: " + (e && e.message ? e.message : String(e)));
    }
  });
}

// src/main.ts
window.addEventListener("DOMContentLoaded", () => {
  bindUI();
});
//# sourceMappingURL=bundle.js.map
