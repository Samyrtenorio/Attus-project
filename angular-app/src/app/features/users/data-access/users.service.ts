import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { User, UserFormValue } from '@app/core/models/user.model';
import { USERS_MOCK } from './users.mock';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private db: User[] = [...USERS_MOCK];

  searchUsers(term: string): Observable<User[]> {
    const normalized = term.trim().toLowerCase();

    if (normalized === 'erro') {
      return timer(400).pipe(
        switchMap(() => throwError(() => new Error('Falha ao carregar usuários.'))),
      );
    }

    return of(this.db).pipe(
      delay(400),
      map((users) =>
        users.filter((user) => user.name.toLowerCase().includes(normalized)),
      ),
    );
  }

  createUser(payload: UserFormValue): Observable<User> {
    const nextId = this.db.length ? Math.max(...this.db.map((user) => user.id)) + 1 : 1;
    const created: User = {
      id: nextId,
      ...payload,
    };

    this.db = [created, ...this.db];

    return of(created).pipe(delay(250));
  }

  updateUser(id: number, payload: UserFormValue): Observable<User> {
    const updated: User = { id, ...payload };

    this.db = this.db.map((user) => (user.id === id ? updated : user));

    return of(updated).pipe(delay(250));
  }
}
