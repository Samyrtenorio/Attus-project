import { Todo } from '@app/core/models/todo.model';

export type TodoState = {
  items: Todo[];
  loading: boolean;
  error: string | null;
};

export const initialTodoState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

export const TODO_FEATURE_KEY = 'todos';
