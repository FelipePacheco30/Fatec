/** Telefone: até 11 dígitos, máscara XX XXXXX-XXXX na digitação e exibição. */
const MAX_TEL_DIGITS = 11;

export function extrairDigitosTelefone(value: string): string {
  return value.replace(/\D/g, "").slice(0, MAX_TEL_DIGITS);
}

export function formatarTelefoneBr(value: string): string {
  const d = extrairDigitosTelefone(value);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `${d.slice(0, 2)} ${d.slice(2)}`;
  return `${d.slice(0, 2)} ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Nome: apenas letras (Unicode) e espaço. */
export function filtrarNomeLetras(value: string): string {
  return [...value]
    .filter((c) => /\p{L}/u.test(c) || c === " ")
    .join("");
}

/** Veículo: letras, números e espaço (sem outros caracteres). */
export function filtrarVeiculoAlfanumerico(value: string): string {
  return [...value]
    .filter((c) => /\p{L}/u.test(c) || /\p{N}/u.test(c) || c === " ")
    .join("");
}

export function validarNomeCliente(nome: string): string | null {
  const t = nome.trim();
  if (!t) return "Nome do cliente é obrigatório.";
  if (!/^[\p{L}\s]+$/u.test(t)) return "Nome deve conter apenas letras e espaços.";
  return null;
}

export function validarTelefoneDigitos(digitos: string): string | null {
  if (!digitos) return "Telefone é obrigatório.";
  if (digitos.length !== MAX_TEL_DIGITS) {
    return "Telefone deve ter 11 dígitos (DDD + número celular), no formato XX XXXXX-XXXX.";
  }
  return null;
}

export function validarVeiculoInteresse(texto: string): string | null {
  const t = texto.trim();
  if (!t) return "Veículo de interesse é obrigatório.";
  if (!/^(?=.*\p{L})(?=.*\p{N})[\p{L}\p{N}\s]+$/u.test(t)) {
    return "Veículo deve incluir letras e números, sem caracteres especiais.";
  }
  return null;
}
