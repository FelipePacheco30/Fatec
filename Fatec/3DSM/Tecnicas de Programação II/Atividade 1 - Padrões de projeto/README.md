# API de Cadastro e Evolução de Leads com Negociação

API em **Node.js**, **Express** e **TypeScript** para cadastro e evolução de leads com negociação, aplicando padrões de projeto GoF.

## Como executar

```bash
npm install
npm run build
npm start
```

Em modo desenvolvimento (com hot reload):

```bash
npm run dev
```

Servidor: `http://localhost:3000`

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST   | `/leads` | Cadastrar lead |
| GET    | `/leads` | Listar leads |
| GET    | `/leads/:id` | Detalhes de uma lead |
| PATCH  | `/leads/:id/evoluir` | Evoluir negociação (estágio e/ou status) |

### Exemplos

**Cadastrar lead**
```json
POST /leads
{
  "nomeCliente": "João Silva",
  "telefone": "11999999999",
  "canalOrigem": "WhatsApp",
  "veiculoInteresse": "Fiat Argo 2024"
}
```

**Evoluir negociação**
```json
PATCH /leads/:id/evoluir
{
  "estagio": "Enviou proposta",
  "status": "Em negociação"
}
```

## Regras de negócio

- Toda lead é criada com **estágio**: "Contato inicial" e **status**: "Aberto".
- **Canais de origem** aceitos: `visita presencial`, `telefone`, `WhatsApp`, `Instagram`.
- **Estágios** (ordem): Contato inicial → Enviou proposta → Aguardando resposta do cliente → Aguardando pagamento.
- **Status**: Aberto → Em negociação → Finalizado com venda **ou** Finalizado sem venda.
- Lead **finalizada** (com venda ou sem venda) não pode mais evoluir.
- Transições de estágio e status seguem apenas as sequências permitidas (evitar mudanças incoerentes).

## Padrões de projeto GoF utilizados

1. **Factory (criacional)** – `LeadFactory`: centraliza a criação da lead com estágio e status iniciais padronizados; preparado para variação por canal de origem.
2. **State (comportamental)** – `EstagioState` e `StatusState`: modelam os estados da negociação e encapsulam as transições permitidas (evolução coerente).
3. **Facade (estrutural)** – `LeadServiceFacade`: simplifica o fluxo de criação e evolução da negociação, ocultando factory, repositório, state e observer.
4. **Observer (comportamental)** – `LeadSubject` + `LoggingLeadObserver`: notifica quando uma lead muda de estágio ou status (auditoria, logs, futuras integrações).
5. **Chain of Responsibility (comportamental)** – validadores encadeados (`CamposObrigatoriosValidator`, `CanalOrigemValidator`) para validar os dados antes do cadastro.

## Estrutura do projeto

```
src/
├── config/          # Constantes (canais, estágios, status, transições)
├── domain/
│   ├── entities/    # Lead, DTOs
│   ├── factory/     # LeadFactory
│   ├── state/       # EstagioState, StatusState
│   ├── observer/    # LeadSubject, LeadObserver
│   └── validation/  # Chain of Responsibility (validadores)
├── repositories/    # Repositório em memória
├── services/        # LeadServiceFacade
├── routes/          # Rotas Express
├── app.ts           # Composição da aplicação
└── server.ts        # Entrada do servidor
```

Dados são armazenados **em memória** (não é obrigatório banco de dados nesta etapa).

---

## Frontend (React + shadcn/ui)

Interface em **React**, **TypeScript**, **Vite**, **Tailwind CSS** e **shadcn/ui** (Radix) para uso da API.

### Como executar o frontend

1. Suba a API (na raiz do projeto): `npm run dev`
2. No diretório `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:5173**. As requisições para `/api` são encaminhadas para a API em `localhost:3000` (proxy do Vite).

### Funcionalidades da interface

- **Listagem de leads** – cards com nome, veículo, origem, estágio e status
- **Nova lead** – formulário com validação e select de canal de origem
- **Detalhes da lead** – dados completos e estado da negociação
- **Evoluir negociação** – modal para atualizar estágio e/ou status (apenas transições permitidas)
