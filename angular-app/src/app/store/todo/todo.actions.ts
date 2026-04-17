import { createAction, props } from '@ngrx/store';
import { Todo } from '@app/core/models/todo.model';

export const loadTodos = createAction('[Todo/API] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo/API] Load Todos Success',
  props<{ todos: Todo[] }>(),
);

export const loadTodosError = createAction(
  '[Todo/API] Load Todos Error',
  props<{ error: string }>(),
);

export const toggleTodoComplete = createAction(
  '[Todo/List] Toggle Todo Complete',
  props<{ id: number }>(),
);
