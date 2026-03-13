import { useEffect, useState } from 'react'
import { ShoppingCart, Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import type { ShoppingItem } from '@/types/shopping'
import { formatarValor, parseValor } from '@/types/shopping'

const API_URL = '/api'

export default function App() {
  const [itens, setItens] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' | '' }>({ texto: '', tipo: '' })
  const [form, setForm] = useState({ nome: '', valor: '', quantidade: '1' })
  const [editando, setEditando] = useState<ShoppingItem | null>(null)
  const [editForm, setEditForm] = useState({ nome: '', valor: '', quantidade: '1' })

  const mostrarMensagem = (texto: string, tipo: 'sucesso' | 'erro') => {
    setMensagem({ texto, tipo })
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000)
  }

  const carregarItens = async () => {
    try {
      const res = await fetch(`${API_URL}/itens`)
      const data = await res.json()
      setItens(data)
    } catch {
      mostrarMensagem('Erro ao carregar lista.', 'erro')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarItens()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nome = form.nome.trim()
    if (!nome) return
    setEnviando(true)
    try {
      const res = await fetch(`${API_URL}/itens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          quantidade: parseInt(form.quantidade, 10) || 1,
          valor: parseValor(form.valor),
        }),
      })
      if (!res.ok) throw new Error()
      const item: ShoppingItem = await res.json()
      setItens((prev) => [item, ...prev])
      setForm({ nome: '', valor: '', quantidade: '1' })
      mostrarMensagem('Item adicionado.', 'sucesso')
    } catch {
      mostrarMensagem('Erro ao adicionar item.', 'erro')
    } finally {
      setEnviando(false)
    }
  }

  const toggleComprado = async (item: ShoppingItem) => {
    const comprado = !item.comprado
    try {
      const res = await fetch(`${API_URL}/itens/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: item.nome,
          quantidade: item.quantidade,
          valor: item.valor ?? 0,
          comprado,
        }),
      })
      if (!res.ok) throw new Error()
      const atualizado: ShoppingItem = await res.json()
      setItens((prev) =>
        prev.map((i) => (i._id === item._id ? atualizado : i))
      )
    } catch {
      mostrarMensagem('Erro ao atualizar.', 'erro')
    }
  }

  const abrirEdicao = (item: ShoppingItem) => {
    setEditando(item)
    setEditForm({
      nome: item.nome,
      valor: item.valor != null ? String(item.valor).replace('.', ',') : '0,00',
      quantidade: String(item.quantidade),
    })
  }

  const salvarEdicao = async () => {
    if (!editando) return
    const nome = editForm.nome.trim()
    if (!nome) return
    setEnviando(true)
    try {
      const res = await fetch(`${API_URL}/itens/${editando._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          quantidade: parseInt(editForm.quantidade, 10) || 1,
          valor: parseValor(editForm.valor),
        }),
      })
      if (!res.ok) throw new Error()
      const atualizado: ShoppingItem = await res.json()
      setItens((prev) =>
        prev.map((i) => (i._id === editando._id ? atualizado : i))
      )
      setEditando(null)
      mostrarMensagem('Item atualizado.', 'sucesso')
    } catch {
      mostrarMensagem('Erro ao atualizar item.', 'erro')
    } finally {
      setEnviando(false)
    }
  }

  const excluirItem = async (item: ShoppingItem) => {
    if (!confirm('Remover este item da lista?')) return
    try {
      const res = await fetch(`${API_URL}/itens/${item._id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      setItens((prev) => prev.filter((i) => i._id !== item._id))
      mostrarMensagem('Item removido.', 'sucesso')
    } catch {
      mostrarMensagem('Erro ao remover item.', 'erro')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 border-b bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-bold tracking-tight">
                Lista de Compras
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Adicione itens, defina valores e marque como comprado.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit}
              className="mb-8 flex flex-wrap items-end gap-3"
            >
              <div className="flex-1 min-w-[140px] space-y-2">
                <Label htmlFor="nome">Nome do item</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Leite, Arroz..."
                  value={form.nome}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nome: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="w-28 space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  placeholder="R$ 0,00"
                  value={form.valor}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, valor: e.target.value }))
                  }
                  inputMode="decimal"
                />
              </div>
              <div className="w-20 space-y-2">
                <Label htmlFor="qtd">Qtd</Label>
                <Input
                  id="qtd"
                  type="number"
                  min={1}
                  value={form.quantidade}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, quantidade: e.target.value }))
                  }
                />
              </div>
              <Button type="submit" disabled={enviando} className="shrink-0">
                {enviando ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Adicionar
              </Button>
            </form>

            {mensagem.texto && (
              <p
                className={`mb-4 rounded-md px-3 py-2 text-sm ${
                  mensagem.tipo === 'erro'
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-green-500/10 text-green-700 dark:text-green-400'
                }`}
              >
                {mensagem.texto}
              </p>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : itens.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                Nenhum item na lista. Adicione o primeiro acima.
              </p>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="w-[180px] text-right">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.map((item) => (
                      <TableRow
                        key={item._id}
                        className={
                          item.comprado
                            ? 'opacity-60 bg-muted/30'
                            : ''
                        }
                      >
                        <TableCell className="w-12">
                          <Checkbox
                            checked={item.comprado}
                            onCheckedChange={() => toggleComprado(item)}
                            aria-label="Marcar como comprado"
                          />
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              item.comprado
                                ? 'text-muted-foreground line-through'
                                : 'font-medium'
                            }
                          >
                            {item.nome}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums text-primary">
                          <span
                            className={
                              item.comprado
                                ? 'text-muted-foreground line-through'
                                : ''
                            }
                          >
                            {formatarValor(item.valor ?? 0)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => abrirEdicao(item)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:hover:bg-blue-950"
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => excluirItem(item)}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Excluir
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editando} onOpenChange={(open) => !open && setEditando(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar item</DialogTitle>
            <DialogDescription>
              Altere o nome, valor ou quantidade do item.
            </DialogDescription>
          </DialogHeader>
          {editando && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nome">Nome</Label>
                <Input
                  id="edit-nome"
                  value={editForm.nome}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, nome: e.target.value }))
                  }
                  placeholder="Nome do item"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-valor">Valor</Label>
                <Input
                  id="edit-valor"
                  value={editForm.valor}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, valor: e.target.value }))
                  }
                  placeholder="R$ 0,00"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-qtd">Quantidade</Label>
                <Input
                  id="edit-qtd"
                  type="number"
                  min={1}
                  value={editForm.quantidade}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, quantidade: e.target.value }))
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </Button>
                <Button onClick={salvarEdicao} disabled={enviando}>
                  {enviando ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
