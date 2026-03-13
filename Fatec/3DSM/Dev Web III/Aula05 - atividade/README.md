# Lista de Compras - CRUD com TypeScript e MongoDB

Atividade Aula 5 - Desenvolvimento Web III: CRUD de lista de compras usando TypeScript, Express e MongoDB.

## Estrutura do projeto

```
Aula05/
├── client/           # Frontend React + Vite + shadcn/ui
│   ├── src/
│   │   ├── components/ui/   # Componentes shadcn (Button, Card, Table, etc.)
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
├── public/           # Frontend legado (HTML/CSS/JS), usado se client não estiver buildado
├── src/              # Backend TypeScript (Express + Mongoose)
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Banco de dados (MongoDB)

- **Banco:** `shopping-list`
- **Coleção:** `shoppingitems`

No MongoDB Compass (ou direto no MongoDB), crie o banco `shopping-list` e a coleção `shoppingitems`. O Mongoose cria a coleção automaticamente ao inserir o primeiro documento, se não existir.

Conexão padrão: `mongodb://localhost:27017/shopping-list`

## Como rodar

1. **Instalar dependências** (raiz e client):
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Subir o MongoDB** (local ou Atlas). Se usar outra URL:
   ```bash
   set MONGODB_URI=mongodb://sua-url
   ```

3. **Opção A – Interface React (shadcn) em desenvolvimento**
   - Terminal 1 – backend: `npm run dev`
   - Terminal 2 – frontend: `npm run dev:client`
   - Acesse **http://localhost:5173** (Vite faz proxy de `/api` para o backend)

4. **Opção B – Produção (uma porta só)**
   ```bash
   npm run build:all
   npm start
   ```
   Acesse **http://localhost:3000** (Express serve o build do React).

5. **Só backend** (usa o frontend em `public/` se existir):
   ```bash
   npm run build
   npm start
   ```

## API REST

| Método | Rota           | Descrição        |
|--------|----------------|------------------|
| GET    | /api/itens     | Listar todos     |
| GET    | /api/itens/:id | Buscar um item   |
| POST   | /api/itens     | Criar item       |
| PUT    | /api/itens/:id | Atualizar item   |
| DELETE | /api/itens/:id | Remover item     |

Corpo do item: `{ "nome": "string", "quantidade": number, "comprado": boolean }`.
