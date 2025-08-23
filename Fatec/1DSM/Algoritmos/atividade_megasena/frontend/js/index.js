let currentData = null;

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR");
}

function formatMoney(v) {
  return v == null
    ? ""
    : "R$ " + Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

async function load(n) {
  const url = n ? `/${n}` : `/`;

  try {
    const resp = await fetch(url, {
      headers: { "Accept": "application/json" }
    });
    if (!resp.ok) throw new Error("Não encontrado");
    const data = await resp.json();
    currentData = data;
    render(data);
  } catch (e) {
    alert("Erro ao buscar: " + e.message);
  }
}

function render(d) {
  document.getElementById("title-concurso").textContent =
    `Concurso ${d.concurso} (${formatDate(d.data)})`;

  document.getElementById("local").textContent = d.local || "";

  for (let i = 1; i <= 6; i++) {
    document.getElementById("bola" + i).textContent = d.dezenas[i - 1];
  }

  document.getElementById("acumulou").style.display =
    d.ganhadores_6 > 0 ? "none" : "block";

  document.getElementById("estimativa-premio").textContent =
    formatMoney(d.estimativaPremio);
  document.getElementById("acumulado-6-acertos").textContent =
    formatMoney(d.acumuladoProxConcurso);
  document.getElementById("acumulado-sorteio-especial-mega-da-virada").textContent =
    formatMoney(d.acumuladoMegaVirada);

  document.getElementById("ganhadores-6-acertos").textContent =
    d.ganhadores_6 > 0
      ? `${d.ganhadores_6} ganhador(es), ${formatMoney(d.valor_6)}`
      : "Não houve ganhadores";
  document.getElementById("ganhadores-5-acertos").textContent =
    `${d.ganhadores_5} ganhador(es), ${formatMoney(d.valor_5)}`;
  document.getElementById("ganhadores-4-acertos").textContent =
    `${d.ganhadores_4} ganhador(es), ${formatMoney(d.valor_4)}`;

  document.getElementById("cidade-uf").textContent = d.cidade_uf || "";
  document.getElementById("arrecadacao-total").textContent =
    formatMoney(d.arrecadacao_total);
}
