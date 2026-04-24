# WeatherApp

Aplicação web para consultar o clima atual de uma cidade usando TypeScript, Node.js, Express e OpenWeatherMap.

## Requisitos

- Node.js instalado
- Conta gratuita na OpenWeatherMap
- API Key criada em https://openweathermap.org/api

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
API_KEY=sua_chave_da_openweathermap
PORT=3000
```

## Como Rodar

```bash
npm install
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Scripts

- `npm run dev`: inicia o servidor em modo desenvolvimento.
- `npm run build`: compila o backend TypeScript para `dist`.
- `npm start`: executa a versão compilada.

## Funcionalidades

- Busca de clima por cidade.
- Exibição de cidade, país, temperatura, sensação térmica, umidade, condição do céu e ícone.
- Validação contra buscas vazias.
- Tratamento para cidade não encontrada, falhas externas e API key ausente.
- Interface responsiva com animações e temas visuais por condição climática.
