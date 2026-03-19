# Explicacao do Projeto: Cadastro e Evolucao de Leads (Node/Express/TypeScript)

## 1) O que o sistema faz (visao simples)
A revenda recebe contatos (presencial, telefone, WhatsApp ou Instagram). Cada contato que demonstra interesse vira uma **lead** (o “lead” e a oportunidade de venda).

Depois do cadastro, a negociacao evolui por **estagios** (andamento da conversa) e possui um **status** (situacao geral da negociacao). O sistema fornece uma API para:
- cadastrar leads
- listar e ver detalhes de uma lead
- evoluir a negociacao (mudando estagio e/ou status) seguindo regras coerentes

Os dados ficam em **memoria** (estrutura simples), entao o foco da atividade e modelar corretamente o fluxo e aplicar padroes de projeto GoF.

## 2) Regras de negocio (o que precisa ser garantido)
Estas regras aparecem refletidas no codigo:

1. Toda lead nasce com:
   - estagio: `Contato inicial`
   - status: `Aberto`
2. Apenas canais validos sao aceitos:
   - `visita presencial`
   - `telefone`
   - `WhatsApp`
   - `Instagram`
3. Uma lead finalizada nao pode continuar evoluindo:
   - `Finalizado com venda`
   - `Finalizado sem venda`
4. Mudancas de estagio e status devem respeitar **transicoes permitidas** (lógica de negociacao)

## 3) Estrutura do projeto (backend)
Principais diretorios/arquivos:
- `src/app.ts`: “composicao” do sistema (liga rotas, repository, facade, observador, chain de validacao)
- `src/server.ts`: inicia o servidor Express
- `src/routes/leads.routes.ts`: endpoints da API (controla Request/Response)
- `src/services/LeadServiceFacade.ts`: **Facade** (orquestra criacao e evolucao)
- `src/domain/factory/LeadFactory.ts`: **Factory** (cria lead com estado inicial)
- `src/domain/state/EstagioState.ts` e `src/domain/state/StatusState.ts`: **State** (transicoes validas)
- `src/domain/observer/LeadSubject.ts` e `src/domain/observer/LeadObserver.ts`: **Observer** (notifica mudancas)
- `src/repositories/LeadRepository.ts`: repository em memoria
- `src/domain/validation/*`: validacao em cadeia (**Chain of Responsibility**)

## 4) Fluxo dos endpoints (passo a passo)

### 4.1) `POST /leads` (cadastrar lead)
Arquivo: `src/routes/leads.routes.ts`

Fluxo:
1. A rota recebe o body e chama a **chain de validacao**:
   - `validationChain.validar(body)`
   - Se falhar, retorna `400` com a mensagem.
2. Normaliza o canal com `normalizarCanal` (case-insensitive) para produzir um `CanalOrigem` valido.
3. Chama o facade:
   - `facade.cadastrarLead({ nomeCliente, telefone, canalOrigem, veiculoInteresse })`
4. O facade delega:
   - cria a lead via `LeadFactory`
   - salva no repository
5. Retorna a lead criada (`201`)

### 4.2) `GET /leads` (listar leads)
Arquivo: `src/routes/leads.routes.ts`

Fluxo:
1. A rota chama `facade.listarLeads()`
2. O facade consulta o repository
3. A rota formata para retornar apenas campos relevantes (incluindo `estagio` e `status`)

### 4.3) `GET /leads/:id` (detalhes)
Arquivo: `src/routes/leads.routes.ts`

Fluxo:
1. A rota chama `facade.obterLead(id)`
2. Se nao existir, retorna `404`
3. Caso exista, retorna o `LeadDto` completo

### 4.4) `PATCH /leads/:id/evoluir` (evoluir negociacao)
Arquivo: `src/routes/leads.routes.ts`

Fluxo:
1. A rota verifica se `estagio` e/ou `status` vieram no body.
2. Ela valida se os valores pertencem a listas permitidas (`ESTAGIOS` e `STATUS`).
3. Chama:
   - `facade.evoluirNegociacao(id, input)`
4. O facade:
   - busca a lead no repository
   - bloqueia evolucao se a lead estiver finalizada
   - tenta aplicar as transicoes usando `EstagioState` e `StatusState`
   - atualiza a lead no repository
   - notifica observers sobre as alteracoes
5. Retorna a lead atualizada

## 5) Onde cada padrao GoF entra (e o por que)

### 5.1) Factory (criacional) - `LeadFactory`
**Padrao**: `Factory` (criacional)  
**Implementado em**: `src/domain/factory/LeadFactory.ts`

**Problema real que ele resolve**
- Uma lead precisa ser criada sempre com um estado inicial padrao.
- Centralizar a criacao deixa facil evoluir a logica no futuro (por exemplo, se um canal tivesse regras iniciais diferentes).

**Como esta feito**
- `LeadFactory.criar(input, id)` monta o `LeadDto` com:
  - `estagio` inicial = `ESTAGIOS[0]` (Contato inicial)
  - `status` inicial = `STATUS[0]` (Aberto)

**Como o professor pode identificar no codigo**
- Procure a interface `ILeadFactory` e a classe `LeadFactory`.
- A inicializacao do `estagio` e `status` acontece dentro do metodo `criar`.

### 5.2) State (comportamental) - `EstagioState` e `StatusState`
**Padrao**: `State` (comportamental)  
**Implementado em**:
- `src/domain/state/EstagioState.ts`
- `src/domain/state/StatusState.ts`

**Problema real que ele resolve**
- A negociacao tem evolucao por fases, e nem todo “de/para” e permitido.
- State encapsula as transicoes validas e impede mudancas incoerentes.

**Como esta feito**
- Em `EstagioState`, as transicoes sao baseadas em `TRANSICOES_ESTAGIO`:
  - `podeTransicionarPara(proximo)` verifica se esta no conjunto permitido
  - `transicionar(proximo)` valida e retorna um novo estado
- Em `StatusState`, o mesmo vale para `TRANSICOES_STATUS`.
- `StatusState.isFinalizado()` marca finalizacao:
  - se estiver finalizado, o sistema bloqueia qualquer evolucao posterior.

**Como o professor pode identificar**
- Veja as constantes de transicao em `src/config/constants.ts`.
- Veja os metodos `podeTransicionarPara`, `transicionar` e `isFinalizado`.

### 5.3) Facade (estrutural) - `LeadServiceFacade`
**Padrao**: `Facade` (estrutural)  
**Implementado em**: `src/services/LeadServiceFacade.ts`

**Problema real que ele resolve**
- As rotas (controllers) nao devem ficar conhecendo detalhes:
  - como criar lead (Factory)
  - como validar transicoes (State)
  - como salvar/atualizar (Repository)
  - como notificar eventos (Observer)
- O facade cria uma “fachada” unica para o fluxo de negocios.

**Como esta feito**
- O facade expõe metodos:
  - `cadastrarLead(input)`
  - `listarLeads()`
  - `obterLead(id)`
  - `evoluirNegociacao(id, input)`
- Internamente, ele orquestra:
  - `LeadFactory`
  - `LeadRepositoryEmMemoria`
  - `StatusState` e `EstagioState`
  - `LeadSubject.notificar(...)`

**Como o professor pode identificar**
- Procure os metodos `cadastrarLead` e `evoluirNegociacao`.
- Neste arquivo, o facade aparece como o “centro” que usa Factory/State/Observer.

### 5.4) Observer (comportamental) - `LeadSubject` e `LoggingLeadObserver`
**Padrao**: `Observer` (comportamental)  
**Implementado em**:
- `src/domain/observer/LeadSubject.ts`
- `src/domain/observer/LeadObserver.ts`

**Problema real que ele resolve**
- Quando uma lead muda, o sistema pode precisar reagir (log, auditoria, integracoes, alertas, etc.).
- Observer permite adicionar reacoes sem “entupir” o fluxo principal.

**Como esta feito**
- `LeadSubject` guarda uma lista de `ILeadObserver`.
- Quando a lead muda, o facade chama:
  - `subject.notificar(atualizada, alteracoes)`
- No projeto, o observer cadastrado e `LoggingLeadObserver`, que:
  - loga no console o id/nome e o que mudou (`estagio`/`status`)

**Como o professor pode identificar**
- Em `src/app.ts`, veja onde o observer e registrado:
  - `subject.adicionarObserver(new LoggingLeadObserver())`
- Veja `notificar` em `LeadSubject`.

### 5.5) Chain of Responsibility (comportamental) - validadores encadeados
**Padrao**: `Chain of Responsibility` (comportamental)  
**Implementado em**:
- `src/domain/validation/ValidationHandler.ts`
- `src/domain/validation/CreateLeadValidators.ts`
- `src/domain/validation/index.ts`

**Problema real que ele resolve**
- Validacao por etapas e mais clara do que um “mega if” unico.
- Cada validador decide:
  - se aceita o pedido e passa para o proximo
  - ou se rejeita com mensagem adequada

**Como esta feito**
- `BaseValidationHandler.validar`:
  - executa a validacao local (`executarValidacao`)
  - se falhar, retorna a mensagem
  - se passar, chama o `proximo` handler
- `createLeadValidationChain()` monta a cadeia:
  - `CamposObrigatoriosValidator` -> `CanalOrigemValidator`

**Como o professor pode identificar**
- Procure por `BaseValidationHandler` e veja o comportamento “seguir ou parar”.
- Procure por `createLeadValidationChain()` e veja a ligacao entre handlers.

## 6) Como o projeto garante as regras (ligacao direta com o codigo)
Uma maneira simples de explicar para o professor:

- “No cadastro, validamos os campos com a chain e normalizamos o canal; a factory garante o estado inicial.”
- “Na evolucao, o facade bloqueia se o status esta finalizado.”
- “Se nao estiver finalizado, usamos State para validar transicoes de estagio/status, e so entao atualizamos e notificamos observers.”

## 7) Conexao com o frontend (resumo)
O frontend (React) chama a API atraves de:
- `frontend/src/api/client.ts`
- paginas como:
  - `NovaLead.tsx` (POST /leads)
  - `LeadList.tsx` (GET /leads)
  - `LeadDetail.tsx` e `EvoluirDialog.tsx` (GET /leads/:id e PATCH /leads/:id/evoluir)

Importante: a “regra de transicao” e garantida principalmente no backend (State). O frontend apenas facilita a escolha exibindo opcoes proximas.

## 8) Guia rapido (onde olhar no codigo durante a apresentacao)
- `src/app.ts`: onde os componentes sao montados (Factory, Facade, Subject, Observer e Chain)
- `src/routes/leads.routes.ts`: como os endpoints chamam o facade/chain
- `src/services/LeadServiceFacade.ts`: onde o fluxo central acontece (Facade + State + Observer)
- `src/domain/state/*`: onde transicoes sao definidas e validadas (State)
- `src/domain/factory/LeadFactory.ts`: onde os estados iniciais sao impostos (Factory)
- `src/domain/validation/*`: onde a validacao por etapas e encadeada (Chain of Responsibility)
- `src/domain/observer/*`: onde eventos sao notificados (Observer)

Dica pratica: dentro dos arquivos, procure por comentarios com chaves como `// [Facade]`, `// [State]` e `// [Observer]`. Eles marcam exatamente os trechos para voce explicar em ordem.

