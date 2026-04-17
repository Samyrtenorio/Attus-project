import { selectAllTodos, selectPendingTodos, selectTodoState } from './todo.selectors';

describe('todo selectors', () => {
  const state = {
    todos: {
      items: [
        { id: 1, title: 'Pendente', completed: false },
        { id: 2, title: 'Concluída', completed: true },
      ],
      loading: false,
      error: null,
    },
  };

  it('should select todo state', () => {
    expect(selectTodoState(state as never)).toEqual(state.todos);
  });

  it('should select all todos', () => {
    expect(selectAllTodos(state as never)).toHaveLength(2);
  });

  it('should select only pending todos', () => {
    expect(selectPendingTodos(state as never)).toEqual([
      { id: 1, title: 'Pendente', completed: false },
    ]);
  });
});
