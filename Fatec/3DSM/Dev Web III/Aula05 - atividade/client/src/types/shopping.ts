export interface ShoppingItem {
  _id: string
  nome: string
  quantidade: number
  valor: number
  comprado: boolean
  createdAt?: string
  updatedAt?: string
}

export function formatarValor(valor: number): string {
  return 'R$ ' + Number(valor).toFixed(2).replace('.', ',')
}

export function parseValor(str: string): number {
  if (!str || typeof str !== 'string') return 0
  const s = str.trim().replace(',', '.')
  const n = parseFloat(s)
  return isNaN(n) ? 0 : n
}
