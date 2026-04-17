import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { ReplaySubject } from 'rxjs';
import { TodoEffects } from './todo.effects';
import { loadTodos, loadTodosError, loadTodosSuccess } from './todo.actions';

describe('TodoEffects', () => {
  let actions$: ReplaySubject<ReturnType<typeof loadTodos>>;
  let effects: TodoEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Actions, useValue: new Actions(actions$) },
      ],
    });

    effects = TestBed.inject(TodoEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should emit loadTodosSuccess on successful request', (done) => {
    effects.loadTodos$.subscribe((action) => {
      expect(action).toEqual(
        loadTodosSuccess({
          todos: [{ id: 1, title: 'Estudar', completed: false }],
        }),
      );
      done();
    });

    actions$.next(loadTodos());

    const req = httpMock.expectOne('/api/todos');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, title: 'Estudar', completed: false }]);
  });

  it('should emit loadTodosError on failed request', (done) => {
    effects.loadTodos$.subscribe((action) => {
      expect(action.type).toBe(loadTodosError.type);
      expect(action.error).toContain('500');
      done();
    });

    actions$.next(loadTodos());

    const req = httpMock.expectOne('/api/todos');
    req.flush('erro', { status: 500, statusText: 'Server Error' });
  });
});
