import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Todo } from '@app/core/models/todo.model';
import { loadTodos, loadTodosError, loadTodosSuccess } from './todo.actions';

@Injectable()
export class TodoEffects {
  private readonly actions$ = inject(Actions);
  private readonly http = inject(HttpClient);

  readonly loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.http.get<Todo[]>('/api/todos').pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error: HttpErrorResponse) =>
            of(loadTodosError({ error: error.message || 'Falha ao carregar tarefas.' })),
          ),
        ),
      ),
    ),
  );
}
