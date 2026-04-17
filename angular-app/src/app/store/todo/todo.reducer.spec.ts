import { Todo } from '@app/core/models/todo.model';
import { loadTodos, loadTodosError, loadTodosSuccess, toggleTodoComplete } from './todo.actions';
import { todoReducer } from './todo.reducer';
import { initialTodoState } from './todo.state';

describe('todoReducer', () => {
  it('should set loading on loadTodos', () => {
    const state = todoReducer(initialTodoState, loadTodos());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set items on loadTodosSuccess', () => {
    const todos: Todo[] = [{ id: 1, title: 'Estudar NgRx', completed: false }];

    const state = todoReducer(initialTodoState, loadTodosSuccess({ todos }));

    expect(state.items).toEqual(todos);
    expect(state.loading).toBe(false);
  });

  it('should set error on loadTodosError', () => {
    const state = todoReducer(initialTodoState, loadTodosError({ error: 'Falha' }));
    expect(state.error).toBe('Falha');
    expect(state.loading).toBe(false);
  });

  it('should toggle completed flag when id matches', () => {
    const initialState = {
      ...initialTodoState,
      items: [{ id: 1, title: 'Task', completed: false }],
    };

    const state = todoReducer(initialState, toggleTodoComplete({ id: 1 }));

    expect(state.items[0].completed).toBe(true);
  });

  it('should keep item unchanged when id does not match', () => {
    const initialState = {
      ...initialTodoState,
      items: [{ id: 1, title: 'Task', completed: false }],
    };

    const state = todoReducer(initialState, toggleTodoComplete({ id: 99 }));

    expect(state.items).toEqual(initialState.items);
  });
});
