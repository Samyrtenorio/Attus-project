import { TODO_FEATURE_KEY, initialTodoState } from './todo.state';

describe('todo.state', () => {
  it('should expose the feature key and initial state', () => {
    expect(TODO_FEATURE_KEY).toBe('todos');
    expect(initialTodoState).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });
});
