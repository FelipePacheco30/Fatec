# Mega-Sena App (frontend + API + banco)

Aplicação composta por um frontend React (Vite), uma API Node/Express em TypeScript e um banco PostgreSQL populado com dados da Mega-Sena. O `docker-compose.yml` orquestra os três serviços.

## Estrutura do projeto
- `front/` — Vite + React + styled-components; build estático servido por `serve`.
- `server/` — Express + TypeScript; expõe endpoints para buscar o último concurso ou um concurso específico.
- `server/data/` — CSV original (`megasena.csv`) e scripts SQL (`init.sql`) usados para criar/preencher o banco.
- `docker-compose.yml` — Sobe `db` (Postgres), `server` (API em `3001`) e `front` (SPA em `3002` → porta interna `4173`).

## Banco de Dados
- Banco: `megasena`
- Tabela: `megasena`
- Campos:
  - `concurso` (integer, PK)
  - `data_do_sorteio` (date)
  - `bola1` a `bola6` (integer) — números sorteados
  - `ganhadores_6_acertos` (integer)
  - `cidade_uf` (varchar)
  - `rateio_6_acertos` (decimal)
  - `ganhadores_5_acertos` (integer)
  - `rateio_5_acertos` (decimal)
  - `ganhadores_4_acertos` (integer)
  - `rateio_4_acertos` (decimal)
  - `acumulado_6_acertos` (decimal)
  - `arrecadacao_total` (decimal)
  - `estimativa_premio` (decimal)
  - `acumulado_sorteio_especial_mega_da_virada` (decimal)
  - `observacao` (varchar, opcional)

## Execução com Docker
1) Clone o repositório: `git clone https://github.com/arleysouza/mega-server-front-docker.git app`  
   Entre na pasta: `cd app`
2) Requisitos: Docker + Docker Compose.
3) Na raiz do projeto: `docker compose up --build`
4) Acessos:
   - Frontend: `http://localhost:3002`
   - API: `http://localhost:3001`
   - Postgres: `localhost:5433` (user `postgres`, senha `postgres`, db `megasena`)

Os dados são carregados automaticamente via `server/data/init.sql`, que lê o `megasena.csv` montado em `/docker-entrypoint-initdb.d/` dentro do container `db`.
