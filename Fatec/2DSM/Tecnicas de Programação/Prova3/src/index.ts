import express from 'express'
import path from 'path'
import { Mensalista } from './models/Mensalista'
import { Horista } from './models/Horista'

const mensalistas: Array<Mensalista> = []
let mensalista = new Mensalista(1, "Joaquim Barbosa", 18, "joaquim.barbosa@adm.xpto.tec.br", 2543.12, 1, "Estagiário")
mensalistas.push(mensalista)
mensalista = new Mensalista(2, "Marcos da Silva", 21, "marcos.silva@dev.xpto.tec.br", 3451.22, 2, "Analista de Sistemas")
mensalistas.push(mensalista)
mensalista = new Mensalista(3, "Ana Maria Brega", 25, "ana.brega@vendas.xpto.tec.br", 5610.3, 3, "Auxiliar de Vendas")
mensalistas.push(mensalista)
mensalista = new Mensalista(4, "Paulo França", 18, "paulo.franca@dev.xpto.tec.br", 8930.10, 4, "Desenvolvedor")
mensalistas.push(mensalista)
mensalista = new Mensalista(5, "Edson Arantes", 30, "edson.arantes@gmail.sp.gov.br", 2328.97, 0, "Gerente")
mensalistas.push(mensalista)

const horistas: Array<Horista> = []
let horista = new Horista(6, "Antonio Marcos", 38, "antonio.marcos@adm.xpto.tex.br", 35, 100, "Técnico em Redes")
horistas.push(horista)
horista = new Horista(7, "Erasmo Carlos", 45, "erasmo.carlos@dev.xpto.tec.br", 50, 220, "Desenvolvedor")
horistas.push(horista)
horista = new Horista(8, "José Augusto", 36, "jose.augusto@vendas.xpto.tec.br", 40, 200, "Vendedor")
horistas.push(horista)
horista = new Horista(9, "Elis Regina", 25, "elis.regina@adm.xpto.tec.br", 30, 220, "Contadora")
horistas.push(horista)
horista = new Horista(10, "Gal Costa", 39, "meu_nome_eh_gal@gmail.com", 25, 110, "Estagiária")
horistas.push(horista)

function gerarSaida(): string {
  const lines: string[] = []
  for (const m of mensalistas) {
    const bloco = m.formatSaida()
    bloco.forEach(l => lines.push(l))
  }
  for (const h of horistas) {
    const bloco = h.formatSaida()
    bloco.forEach(l => lines.push(l))
  }
  return lines.join('\n')
}

function gerarSaidaEstruturada() {
  const lista: { id: number; tipo: 'mensalista' | 'horista'; matricula: string; nome: string; email: string; emailValido: boolean; texto: string }[] = []
  for (const m of mensalistas) {
    lista.push({
      id: m.getMatricula(),
      tipo: 'mensalista',
      matricula: m.getMatricula().toString().padStart(5,'0'),
      nome: m.nome,
      email: m.email,
      emailValido: m.validaEmail(),
      texto: m.formatSaida().join('\n')
    })
  }
  for (const h of horistas) {
    lista.push({
      id: h.getMatricula(),
      tipo: 'horista',
      matricula: h.getMatricula().toString().padStart(5,'0'),
      nome: h.nome,
      email: h.email,
      emailValido: h.validaEmail(),
      texto: h.formatSaida().join('\n')
    })
  }
  return lista
}

const app = express()
const frontendPath = path.join(__dirname, '..', 'frontend')
app.use(express.static(frontendPath))

app.get('/api/saida', (req, res) => {
  res.type('text/plain').send(gerarSaida())
})

app.get('/api/saida-json', (req, res) => {
  res.json(gerarSaidaEstruturada())
})

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
