import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, TODO_FEATURE_KEY } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.items,
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter((todo) => !todo.completed),
);
