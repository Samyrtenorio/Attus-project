# Attus Angular Challenge

Implementação do desafio técnico de Front End Angular com foco em aderência ao enunciado: listagem de usuários, filtro reativo, loading e erro, criação e edição em modal, Angular Material, RxJS, Signals e estrutura NgRx para a feature conceitual de To-do.

## Preview da aplicação

![Preview da aplicação](/home/sofia/image (1).png)

## Objetivo

Reproduzir o protótipo proposto no teste técnico com uma aplicação Angular moderna, priorizando:

- organização de código
- tipagem forte
- reatividade com RxJS
- gerenciamento de estado com Signals
- estrutura NgRx para a feature pedida no enunciado
- experiência de uso simples e consistente
- cobertura de testes unitários

## Stack utilizada

- Angular 17+
- Angular Material
- RxJS
- Signals para estado local da feature de usuários
- NgRx (`actions`, `reducer`, `selectors` e `effects`) para a feature To-do
- Jest para testes unitários
- TypeScript

## Funcionalidades implementadas

### Listagem de usuários

- cards com nome, e-mail e ação de edição
- filtro por nome com debounce de 300ms
- estado de loading durante carregamento
- tratamento de erro em caso de falha
- consumo de dados a partir de serviço mockado

### Criação e edição de usuário

- abertura via botão flutuante vermelho
- modal central para cadastro e edição
- formulário reativo com os campos:
  - e-mail
  - nome
  - CPF
  - telefone
  - tipo de telefone
- validação por campo com mensagens de erro
- botão salvar desabilitado enquanto o formulário estiver inválido
- preenchimento automático dos dados no modo de edição

### Requisitos técnicos atendidos

- uso real de operadores RxJS além de `map` e `tap`
  - `debounceTime(300)`
  - `distinctUntilChanged()`
  - `switchMap()`
  - `catchError()`
- components standalone
- subscriptions gerenciadas com `takeUntilDestroyed`, `take` e streams finitas
- Signals para estado local da feature de usuários
- estrutura NgRx completa para a feature To-do solicitada no teste
- testes unitários com Jest

## Decisões técnicas

### Estado local com Signals

A feature principal possui fluxo local e objetivo. Por isso, o estado de usuários foi modelado com Signals para reduzir boilerplate e deixar leitura e manutenção mais simples.

### NgRx na feature To-do

Para atender ao item específico do desafio, a estrutura de NgRx foi implementada com separação clara entre `actions`, `reducer`, `selectors` e `effects`, seguindo o padrão recomendado.

### Busca reativa com RxJS

A busca foi implementada com debounce e cancelamento de requisições anteriores para evitar chamadas excessivas e race condition, mantendo o comportamento previsível da interface.

## Estrutura do projeto

```text
src/app
├── core
│   ├── models
│   └── types
├── features
│   └── users
│       ├── data-access
│       ├── pages
│       └── ui
├── shared
│   ├── components
│   ├── utils
│   └── validators
└── store
    └── todo
