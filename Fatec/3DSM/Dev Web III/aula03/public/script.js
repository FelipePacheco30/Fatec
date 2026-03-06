const API_URL = "http://localhost:3000/clientes";
const form = document.getElementById("form-cliente");
const lista = document.getElementById("lista-clientes");

// Função para carregar clientes
async function carregarClientes() {
  const resp = await fetch(API_URL);
  const clientes = await resp.json();
  lista.innerHTML = "";
  clientes.forEach(cliente => {
    const li = document.createElement("li");
    li.textContent = `${cliente.nome} - ${cliente.email} - ${cliente.telefone}`;
    lista.appendChild(li);
  });
}

// Função para cadastrar cliente
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const novoCliente = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value
  };
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoCliente)
  });
  form.reset();
  carregarClientes();
});

// Carrega clientes ao abrir página
carregarClientes();
