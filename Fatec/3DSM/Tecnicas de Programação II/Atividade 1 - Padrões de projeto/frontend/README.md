# Frontend – Leads & Negociação

Interface React + TypeScript com **Tailwind CSS** e componentes no estilo **shadcn/ui** (Radix UI).

## Executar

```bash
npm install
npm run dev
```

A API deve estar rodando em `http://localhost:3000`. O Vite faz proxy de `/api` para a API.

## Scripts

- `npm run dev` – servidor de desenvolvimento (porta 5173)
- `npm run build` – build de produção
- `npm run preview` – preview do build

## Estrutura

- `src/components/ui/` – componentes base (Button, Card, Input, Label, Select, Badge, Dialog)
- `src/components/layout/` – layout com navegação
- `src/components/leads/` – EvoluirDialog
- `src/pages/` – LeadList, NovaLead, LeadDetail
- `src/api/` – cliente HTTP para a API
- `src/types/` – tipos (Lead, canais, estágios, status)
