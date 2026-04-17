# Attus Angular Challenge

Implementação do desafio técnico de Front End Angular com foco em aderência ao enunciado: listagem de usuários, filtro reativo, loading e erro, criação/edição em modal, Angular Material, RxJS, Signals e estrutura NgRx para a feature conceitual de To-do.

## Stack utilizada

- Angular 17+
- Angular Material
- RxJS
- Signals para estado local da feature de usuários
- NgRx (`actions`, `reducer`, `selectors` e `effects`) para a feature To-do
- Jest para testes unitários
- Suíte ajustada para cobertura total das unidades medidas

## Escopo implementado

### Tela de listagem de usuários
- Cards com nome, e-mail e ação de editar
- Filtro por nome com debounce de 300ms
- Estado de loading durante carregamento
- Mensagem de erro em caso de falha
- Mock local em serviço

### Criação e edição de usuário
- Modal aberto pelo botão flutuante vermelho
- Formulário reativo com:
  - e-mail
  - nome
  - CPF
  - telefone
  - tipo de telefone
- Mensagens de validação por campo
- Botão salvar desabilitado quando inválido
- Preenchimento automático no modo de edição

### Requisitos técnicos
- Uso real de `debounceTime`, `distinctUntilChanged`, `switchMap` e `catchError`
- Components standalone
- Subscriptions gerenciadas com `takeUntilDestroyed`, `take` e streams finitas
- Estrutura NgRx para a feature To-do solicitada no teste
- Testes unitários com Jest

## Decisões técnicas

### Estado da feature de usuários com Signals
A tela principal possui um fluxo local e direto. Por isso, o estado de `users`, `loading`, `error` e busca atual foi modelado com Signals para reduzir boilerplate e manter leitura simples.

### NgRx implementado na feature To-do
Para atender ao item 3.2 do teste, a estrutura de NgRx foi implementada com `actions`, `state`, `reducer`, `selectors` e `effects`, mantendo separação clara entre eventos, leitura e efeitos colaterais.

### Fluxo de busca com RxJS
A busca por nome utiliza:
- `debounceTime(300)` para evitar chamadas excessivas
- `distinctUntilChanged()` para ignorar repetições
- `switchMap()` para cancelar a requisição anterior
- `catchError()` para tratamento de falha sem quebrar a stream

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
```

## Pré-requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
npm install
```

## Execução local

```bash
npm start
```

Aplicação disponível em:

```text
http://localhost:4200
```

## Testes

Rodar testes:

```bash
npm test
```

Rodar testes com cobertura:

```bash
npm test
```

A configuração do Jest foi ajustada para exigir 100% de cobertura global nos arquivos medidos.

## Observações para avaliação

- O mock inicial da tela contém um usuário, em linha com o protótipo apresentado.
- Para simular falha no carregamento, pesquise pelo termo `erro`.
- O projeto foi mantido aderente ao escopo do teste, sem telas extras fora do que foi solicitado.
