import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, take, tap } from 'rxjs';
import { User, UserFormValue } from '@app/core/models/user.model';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly usersState = signal<User[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);
  private readonly lastSearchState = signal('');

  readonly users = this.usersState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly hasUsers = computed(() => this.users().length > 0);
  readonly lastSearch = this.lastSearchState.asReadonly();

  constructor(private readonly usersService: UsersService) {}

  search(term = ''): Observable<User[]> {
    this.loadingState.set(true);
    this.errorState.set(null);
    this.lastSearchState.set(term);

    return this.usersService.searchUsers(term).pipe(
      tap((users) => this.usersState.set(users)),
      catchError((error: Error) => {
        this.errorState.set(error.message);
        this.usersState.set([]);
        return of([]);
      }),
      finalize(() => this.loadingState.set(false)),
    );
  }

  refresh(): Observable<User[]> {
    return this.search(this.lastSearchState());
  }

  create(payload: UserFormValue): Observable<User> {
    return this.usersService.createUser(payload).pipe(
      tap((created) => {
        this.usersState.update((users) => [created, ...users]);
      }),
      take(1),
    );
  }

  update(id: number, payload: UserFormValue): Observable<User> {
    return this.usersService.updateUser(id, payload).pipe(
      tap((updated) => {
        this.usersState.update((users) =>
          users.map((user) => (user.id === id ? updated : user)),
        );
      }),
      take(1),
    );
  }
}
