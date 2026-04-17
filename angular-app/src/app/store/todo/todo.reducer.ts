import { createReducer, on } from '@ngrx/store';
import { loadTodos, loadTodosError, loadTodosSuccess, toggleTodoComplete } from './todo.actions';
import { initialTodoState } from './todo.state';

export { TODO_FEATURE_KEY } from './todo.state';

export const todoReducer = createReducer(
  initialTodoState,
  on(loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    items: todos,
    error: null,
  })),
  on(loadTodosError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(toggleTodoComplete, (state, { id }) => ({
    ...state,
    items: state.items.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  })),
);
