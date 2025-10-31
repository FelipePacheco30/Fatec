// src/finance.ts
function toNumber(input) {
  const n = Number(input.replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}
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
function scenarioB_calc(C0, c0, Cf, iMonthly, maxMonths = 1e4, captureHistory = false) {
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
  if (value >= Cf)
    return { months: 0, finalValue: value, history };
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
    if (value >= Cf)
      return { months: month, finalValue: value, history };
    if (Math.abs(iMonthly) < 1e-12 && c0 === 0)
      break;
  }
  throw new Error(`n\xE3o atingido dentro de ${maxMonths} meses`);
}

// src/ui.ts
function bindUI() {
  const scenarioEl = document.getElementById("scenario");
  const taxTypeEl = document.getElementById("taxType");
  const rateEl = document.getElementById("rate");
  const c0El = document.getElementById("c0");
  const C0El = document.getElementById("C0");
  const CfEl = document.getElementById("Cf");
  const runBtn = document.getElementById("run");
  const output = document.getElementById("output");
  const historyToggle = document.getElementById("showHistory");
  const historyBody = document.getElementById("historyBody");
  const moreBlock = document.getElementById("more");
  const aporteBlock = document.getElementById("aporteBlock");
  if (!scenarioEl || !rateEl || !C0El || !CfEl || !runBtn || !output) {
    console.warn("bindUI: elementos DOM n\xE3o encontrados (ids inv\xE1lidos).");
    return;
  }
  scenarioEl.addEventListener("change", () => {
    if (scenarioEl.value === "b") {
      aporteBlock == null ? void 0 : aporteBlock.classList.remove("hidden");
      moreBlock == null ? void 0 : moreBlock.classList.remove("hidden");
    } else {
      aporteBlock == null ? void 0 : aporteBlock.classList.add("hidden");
      moreBlock == null ? void 0 : moreBlock.classList.add("hidden");
    }
  });
  runBtn.addEventListener("click", () => {
    var _a, _b;
    output.innerHTML = "";
    if (historyBody)
      historyBody.innerHTML = "";
    const C0 = toNumber(C0El.value);
    const Cf = toNumber(CfEl.value);
    const taxa = toNumber(rateEl.value);
    const tipoTaxa = (_a = taxTypeEl == null ? void 0 : taxTypeEl.value) != null ? _a : "annual";
    try {
      if (!Number.isFinite(C0) || C0 <= 0)
        throw new Error("C0 inv\xE1lido.");
      if (!Number.isFinite(Cf) || Cf <= 0)
        throw new Error("Cf inv\xE1lido.");
      if (!Number.isFinite(taxa))
        throw new Error("Taxa inv\xE1lida.");
      const iMonthly = tipoTaxa === "annual" ? annualToMonthly(taxa / 100) : taxa / 100;
      if (scenarioEl.value === "a") {
        const { monthsExact, monthsCeil } = scenarioA_calc(C0, Cf, iMonthly);
        const human = monthsToYearsMonthsText(monthsExact, monthsCeil);
        output.innerHTML = `<strong>Cen\xE1rio A</strong><br>- Meses exatos: ${monthsExact.toFixed(4)}<br>- Meses inteiros: ${monthsCeil} \u21D2 ${human}`;
      } else {
        const c0 = toNumber((_b = c0El == null ? void 0 : c0El.value) != null ? _b : "0");
        if (!Number.isFinite(c0) || c0 < 0)
          throw new Error("c0 inv\xE1lido.");
        const res = scenarioB_calc(C0, c0, Cf, iMonthly, 1e4, true);
        const human = monthsToYearsMonthsText(null, res.months);
        output.innerHTML = `<strong>Cen\xE1rio B</strong><br>- Meses necess\xE1rios: ${res.months} \u21D2 ${human}<br>- Valor final: R$ ${res.finalValue.toFixed(2)}`;
        if (res.history && res.history.length && historyBody) {
          historyBody.innerHTML = res.history.map((h) => `
            <tr>
              <td>${h.month}</td>
              <td>R$ ${h.valueBeforeInterest.toFixed(2)}</td>
              <td>R$ ${h.valueAfterInterest.toFixed(2)}</td>
              <td>${h.contribution ? "R$ " + h.contribution.toFixed(2) : "-"}</td>
              <td>R$ ${h.valueAfterContribution.toFixed(2)}</td>
            </tr>
          `).join("");
        }
      }
    } catch (err) {
      output.textContent = "Erro: " + (err && err.message ? err.message : String(err));
    }
  });
}

// src/main.ts
window.addEventListener("DOMContentLoaded", () => {
  bindUI();
});
//# sourceMappingURL=bundle.js.map
