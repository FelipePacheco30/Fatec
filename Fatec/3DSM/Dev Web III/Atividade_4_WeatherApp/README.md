# Atividade 4 - WeatherApp

Aplicação web em TypeScript + Express para consulta de clima em tempo real utilizando a WeatherAPI.

## Requisitos

- Node.js 18+
- npm

## Configuração

O arquivo `.env` já está incluído no projeto de propósito, com a chave necessária para a atividade funcionar ao ser clonada.

> Observação: em projetos reais, o `.env` não deve ser versionado porque pode expor credenciais. Neste caso ele foi mantido no repositório intencionalmente, conforme solicitado para a entrega da atividade.

## Execução

Na pasta do projeto, rode:

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Scripts disponíveis

```bash
npm run dev
npm run build
npm start
```

- `npm run dev`: inicia o servidor em desenvolvimento.
- `npm run build`: compila o TypeScript para a pasta `dist`.
- `npm start`: executa a versão compilada.

## Funcionalidades

- Busca do clima por cidade
- Exibição de cidade, país, temperatura, sensação térmica, umidade, condição e ícone
- Validação de busca vazia
- Tratamento para cidade não encontrada e falhas de requisição
