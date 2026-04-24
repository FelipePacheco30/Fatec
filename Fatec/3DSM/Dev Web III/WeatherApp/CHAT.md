# Resumo do Chat - WeatherApp

## Pedido

Criar um projeto de consulta do clima seguindo a Atividade 4 de Desenvolvimento Web III.

## Requisitos Aplicados

- TypeScript.
- Backend com Node.js e Express.
- Integração com OpenWeatherMap.
- Frontend em `views` com HTML, CSS e JavaScript.
- Execução em `localhost:3000`.
- Validação de busca vazia.
- Tratamento para cidade não encontrada, falhas externas e API key inválida.

## Resultado

Foi criado um WeatherApp completo com:

- Rota local `GET /api/weather?city=`.
- Uso seguro de `API_KEY` via `.env`.
- Interface responsiva e visual profissional.
- Animações, glassmorphism, estados de carregamento e erro.
- Temas visuais por condição climática.

## Validações

- `npm install` executado com sucesso.
- `npm run build` executado com sucesso.
- Smoke test em `http://localhost:3000`.
- Snyk Code scan sem issues.
- Diagnósticos/linter sem erros.

## Observação

O arquivo `.env` não deve ser versionado porque contém a chave pessoal da OpenWeatherMap. Use `.env.example` como modelo.
