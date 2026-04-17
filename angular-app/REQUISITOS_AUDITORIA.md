# Auditoria de aderência ao teste

## Entrega solicitada no enunciado

O teste pede:
- envio do documento com as perguntas respondidas;
- link do código público no GitHub;
- README com instruções de instalação e execução.

## Status do projeto

### 1. Stack obrigatória
- [x] Angular 17+
- [x] Angular Material
- [x] NgRx ou Signals
- [x] RxJS
- [x] Jest

### 2. Listagem de usuários
- [x] Cards com nome, e-mail e botão de editar
- [x] Filtro por nome com debounce de 300ms
- [x] Loading durante carregamento
- [x] Mensagem de erro em caso de falha
- [x] Dados vindos de serviço mockado

### 3. Criação e edição em modal
- [x] Modal aberto pelo botão vermelho
- [x] Formulário reativo
- [x] Campos: e-mail, nome, CPF, telefone e tipo de telefone
- [x] Validação por campo
- [x] Botão salvar desabilitado quando inválido
- [x] Preenchimento automático no modo de edição

### 4. Requisitos técnicos
- [x] Pelo menos 2 operadores RxJS além de `map` e `tap`
- [x] Components standalone
- [x] Subscriptions sem memory leak
- [x] README com instalação e execução
- [ ] Cobertura acima de 60% precisa ser confirmada localmente

### 5. Itens extras mantidos fora do escopo
- O projeto não depende de módulos paralelos como favoritos ou telas adicionais para evitar ruído na avaliação.
- O menu lateral foi mantido mínimo, apenas como apoio visual ao cabeçalho.

## Checklist final antes de enviar

1. Rodar `npm install`
2. Rodar `npm start`
3. Rodar `npm test -- --coverage`
4. Confirmar cobertura global acima de 60%
5. Publicar o repositório em modo público
6. Inserir o link do GitHub no documento respondido


## Observação adicional

- A suíte de testes foi ampliada para buscar 100% de cobertura global nos arquivos medidos pelo Jest.
