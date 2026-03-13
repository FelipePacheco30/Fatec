const API_URL = '/api';
const listaEl = document.getElementById('lista-itens');
const formAdicionar = document.getElementById('form-adicionar');
const nomeInput = document.getElementById('nome-item');
const valorInput = document.getElementById('valor-item');
const quantidadeInput = document.getElementById('quantidade-item');
const mensagemEl = document.getElementById('mensagem');

let itemEditandoId = null;

function formatarValor(valor) {
  const n = Number(valor);
  if (isNaN(n)) return 'R$ 0,00';
  return 'R$ ' + n.toFixed(2).replace('.', ',');
}

function parseValor(str) {
  if (str === '' || str == null) return 0;
  const s = String(str).trim().replace(',', '.');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function mostrarMensagem(texto, tipo = '') {
  mensagemEl.textContent = texto;
  mensagemEl.className = 'mensagem ' + tipo;
  if (texto) {
    setTimeout(() => {
      mensagemEl.textContent = '';
      mensagemEl.className = 'mensagem';
    }, 3000);
  }
}

async function carregarItens() {
  try {
    const res = await fetch(`${API_URL}/itens`);
    const itens = await res.json();
    listaEl.innerHTML = '';
    itens.forEach(item => renderizarItem(item));
  } catch (err) {
    mostrarMensagem('Erro ao carregar lista.', 'erro');
  }
}

function renderizarItem(item) {
  const valor = item.valor ?? 0;
  const tr = document.createElement('tr');
  tr.className = 'item' + (item.comprado ? ' comprado' : '');
  tr.dataset.id = item._id;
  tr.dataset.valor = valor;
  tr.innerHTML = `
    <td><input type="checkbox" ${item.comprado ? 'checked' : ''} data-id="${item._id}"></td>
    <td><span class="nome-item">${escapeHtml(item.nome)}</span></td>
    <td><span class="valor-item">${formatarValor(valor)}</span></td>
    <td>
      <div class="acoes">
        <button type="button" class="btn-editar" data-id="${item._id}">Editar</button>
        <button type="button" class="btn-excluir" data-id="${item._id}">Excluir</button>
      </div>
    </td>
  `;

  tr.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleComprado(item._id));
  tr.querySelector('.btn-editar').addEventListener('click', () => abrirModalEdicao(item));
  tr.querySelector('.btn-excluir').addEventListener('click', () => excluirItem(item._id));

  listaEl.appendChild(tr);
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

formAdicionar.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const valor = parseValor(valorInput.value);
  const quantidade = parseInt(quantidadeInput.value, 10) || 1;
  if (!nome) return;

  try {
    const res = await fetch(`${API_URL}/itens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, valor }),
    });
    if (!res.ok) throw new Error();
    const item = await res.json();
    renderizarItem(item);
    nomeInput.value = '';
    valorInput.value = '';
    quantidadeInput.value = '1';
    mostrarMensagem('Item adicionado.', 'sucesso');
  } catch (err) {
    mostrarMensagem('Erro ao adicionar item.', 'erro');
  }
});

async function toggleComprado(id) {
  const tr = listaEl.querySelector(`[data-id="${id}"]`).closest('tr');
  const comprado = tr.querySelector('input[type="checkbox"]').checked;
  const nome = tr.querySelector('.nome-item').textContent;
  const valor = parseFloat(tr.dataset.valor, 10) || 0;
  const quantidade = 1;
  try {
    const res = await fetch(`${API_URL}/itens/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, valor, comprado }),
    });
    if (!res.ok) throw new Error();
    const item = await res.json();
    tr.className = 'item' + (item.comprado ? ' comprado' : '');
    tr.querySelector('.nome-item').style.textDecoration = item.comprado ? 'line-through' : 'none';
    tr.querySelector('.valor-item').style.textDecoration = item.comprado ? 'line-through' : 'none';
  } catch (err) {
    mostrarMensagem('Erro ao atualizar.', 'erro');
  }
}

function abrirModalEdicao(item) {
  itemEditandoId = item._id;
  const modal = document.getElementById('modal-edicao');
  if (!modal) criarModalEdicao();
  document.getElementById('edit-nome').value = item.nome;
  document.getElementById('edit-valor').value = item.valor != null ? item.valor.toString().replace('.', ',') : '0,00';
  document.getElementById('edit-quantidade').value = item.quantidade;
  document.getElementById('modal-edicao').classList.add('ativo');
}

function criarModalEdicao() {
  const div = document.createElement('div');
  div.id = 'modal-edicao';
  div.className = 'modal';
  div.innerHTML = `
    <div class="modal-conteudo">
      <h2>Editar item</h2>
      <label>Nome</label>
      <input type="text" id="edit-nome" placeholder="Nome do item">
      <label>Valor</label>
      <input type="text" id="edit-valor" placeholder="R$ 0,00" inputmode="decimal">
      <label>Quantidade</label>
      <input type="number" id="edit-quantidade" min="1" value="1">
      <div class="modal-botoes">
        <button type="button" class="cancelar">Cancelar</button>
        <button type="button" class="salvar">Salvar</button>
      </div>
    </div>
  `;
  div.querySelector('.cancelar').addEventListener('click', () => {
    div.classList.remove('ativo');
    itemEditandoId = null;
  });
  div.querySelector('.salvar').addEventListener('click', salvarEdicao);
  div.addEventListener('click', (e) => {
    if (e.target === div) {
      div.classList.remove('ativo');
      itemEditandoId = null;
    }
  });
  document.body.appendChild(div);
}

async function salvarEdicao() {
  const nome = document.getElementById('edit-nome').value.trim();
  const valor = parseValor(document.getElementById('edit-valor').value);
  const quantidade = parseInt(document.getElementById('edit-quantidade').value, 10) || 1;
  if (!nome || !itemEditandoId) return;

  try {
    const res = await fetch(`${API_URL}/itens/${itemEditandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, valor }),
    });
    if (!res.ok) throw new Error();
    const item = await res.json();
    const tr = listaEl.querySelector(`tr[data-id="${itemEditandoId}"]`);
    if (tr) {
      tr.querySelector('.nome-item').textContent = item.nome;
      tr.querySelector('.valor-item').textContent = formatarValor(item.valor ?? 0);
      tr.dataset.valor = item.valor ?? 0;
      tr.querySelector('input[type="checkbox"]').checked = item.comprado;
      tr.className = 'item' + (item.comprado ? ' comprado' : '');
    }
    document.getElementById('modal-edicao').classList.remove('ativo');
    itemEditandoId = null;
    mostrarMensagem('Item atualizado.', 'sucesso');
  } catch (err) {
    mostrarMensagem('Erro ao atualizar item.', 'erro');
  }
}

async function excluirItem(id) {
  if (!confirm('Remover este item da lista?')) return;
  try {
    const res = await fetch(`${API_URL}/itens/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error();
    listaEl.querySelector(`tr[data-id="${id}"]`)?.remove();
    mostrarMensagem('Item removido.', 'sucesso');
  } catch (err) {
    mostrarMensagem('Erro ao remover item.', 'erro');
  }
}

carregarItens();
