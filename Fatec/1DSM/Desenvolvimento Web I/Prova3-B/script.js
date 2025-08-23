const form = document.getElementById('cadastro-form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirma = document.getElementById('confirma');

const strongPasswordRegex = 
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function setValidation(el, valid, message = '') {
  const group = el.parentElement; 
  const feedback = group.querySelector('.feedback');
  if (valid) {
    group.classList.remove('error');
    group.classList.add('success');
    feedback.textContent = message || 'OK';
  } else {
    group.classList.remove('success');
    group.classList.add('error');
    feedback.textContent = message;
  }
}

function validateForm() {
  let isFormValid = true;

  if (nome.value.trim().length < 3) {
    setValidation(nome, false, 'Insira ao menos 3 caracteres.');
    isFormValid = false;
  } else {
    setValidation(nome, true);
  }

  if (!email.checkValidity()) {
    setValidation(email, false, 'E‑mail inválido.');
    isFormValid = false;
  } else {
    setValidation(email, true);
  }

  if (!strongPasswordRegex.test(senha.value)) {
    setValidation(
      senha, false,
      'Senha fraca: use 8+ chars, Maiúsculas, minúsculas, números e símbolos.'
    );
    isFormValid = false;
  } else {
    setValidation(senha, true);
  }

  if (confirma.value !== senha.value || confirma.value === '') {
    setValidation(confirma, false, 'As senhas não coincidem.');
    isFormValid = false;
  } else {
    setValidation(confirma, true);
  }

  return isFormValid;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();           
  const valid = validateForm();
  if (valid) {
    alert('Cadastro realizado com sucesso! 🎉');
    form.reset();
    document
      .querySelectorAll('.form-group')
      .forEach(g => g.classList.remove('success'));
  }
});
