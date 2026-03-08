const API_URL = "http://localhost:3000/clientes";
const form = document.getElementById("form-cliente");
const lista = document.getElementById("clientes-lista");
const inputId = document.getElementById("cliente-id");
const btnCancelar = document.getElementById("btn-cancelar");

// Função para carregar clientes na tabela
async function carregarClientes() {
  const resp = await fetch(API_URL);
  const clientes = await resp.json();
  lista.innerHTML = "";
  clientes.forEach(cliente => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefone}</td>
      <td>
        <button type="button" class="btn-alterar" data-id="${cliente._id}">Alterar</button>
        <button type="button" class="btn-excluir" data-id="${cliente._id}">Excluir</button>
      </td>
    `;
    lista.appendChild(tr);
  });

  // Eventos dos botões Alterar e Excluir
  document.querySelectorAll(".btn-alterar").forEach(btn => {
    btn.addEventListener("click", () => alterarCliente(btn.getAttribute("data-id")));
  });
  document.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", () => excluirCliente(btn.getAttribute("data-id")));
  });
}

// Preenche o formulário para alteração
async function alterarCliente(id) {
  const resp = await fetch(`${API_URL}/${id}`);
  const cliente = await resp.json();
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("email").value = cliente.email;
  document.getElementById("telefone").value = cliente.telefone;
  inputId.value = id;
}

// Exclui cliente e recarrega a lista
async function excluirCliente(id) {
  if (!confirm("Deseja realmente excluir este cliente?")) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  carregarClientes();
}

// Salvar (criar ou alterar)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = inputId.value.trim();
  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value
  };

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  }

  form.reset();
  inputId.value = "";
  carregarClientes();
});

// Cancelar edição
btnCancelar.addEventListener("click", () => {
  form.reset();
  inputId.value = "";
});

// Carrega clientes ao abrir a página
carregarClientes();
