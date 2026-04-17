import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, startWith, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersStore } from '../data-access/users.store';
import { User } from '@app/core/models/user.model';
import { UserCardComponent } from '../ui/user-card.component';
import { UserFormDialogComponent } from '../ui/user-form-dialog.component';
import { LoadingStateComponent } from '@app/shared/components/loading-state.component';
import { ErrorStateComponent } from '@app/shared/components/error-state.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UserCardComponent,
    LoadingStateComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="users-page">
      <header class="topbar">
        <div class="topbar-brand">
          <button
            type="button"
            class="topbar-menu-button"
            aria-label="Abrir menu"
            (click)="toggleMenu()"
          >
            ☰
          </button>
          <span class="topbar-title">USUÁRIOS</span>
        </div>

        <label class="topbar-search" aria-label="Pesquisar usuários">
          <span class="topbar-search-icon" aria-hidden="true">⌕</span>
          <input [formControl]="searchControl" placeholder="Pesquisar..." />
        </label>
      </header>

      @if (menuOpen()) {
        <button type="button" class="mini-drawer-backdrop" aria-label="Fechar menu" (click)="closeMenu()"></button>
        <aside class="mini-drawer" aria-label="Menu lateral">
          <div class="mini-drawer-header">
            <span>Menu</span>
            <button type="button" class="mini-drawer-close" aria-label="Fechar menu" (click)="closeMenu()">×</button>
          </div>
          <button type="button" class="mini-drawer-item" (click)="closeMenu()">Usuários</button>
        </aside>
      }

      <main class="page-shell">
        <section class="users-section">
          <h2 class="users-section-title">Usuários cadastrados</h2>

          @if (store.loading()) {
            <app-loading-state />
          } @else {
            @if (store.error(); as error) {
              <app-error-state [message]="error" (retry)="reload()" />
            } @else if (store.hasUsers()) {
              <section class="user-list">
                @for (user of store.users(); track user.id) {
                  <app-user-card [user]="user" (edit)="openEditDialog($event)" />
                }
              </section>
            } @else {
              <div class="state-box state-box-empty">
                <span>Nenhum usuário encontrado.</span>
              </div>
            }
          }
        </section>
      </main>

      <button
        type="button"
        class="fab-create"
        aria-label="Adicionar novo usuário"
        (click)="openCreateDialog()"
      >
        <span class="fab-create-icon" aria-hidden="true">+</span>
      </button>
    </div>
  `,
})
export class UsersPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  readonly menuOpen = signal(false);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly store = inject(UsersStore);
  readonly hasError = computed(() => !!this.store.error());

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.store.search(term)),
        catchError(() => EMPTY),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  reload(): void {
    this.store
      .refresh()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '505px',
      maxWidth: 'calc(100vw - 32px)',
      panelClass: 'user-dialog-panel',
      autoFocus: false,
      data: { mode: 'create' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.store.create(result) : EMPTY)),
        switchMap(() => this.store.refresh()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '505px',
      maxWidth: 'calc(100vw - 32px)',
      panelClass: 'user-dialog-panel',
      autoFocus: false,
      data: { mode: 'edit', user },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.store.update(user.id, result) : EMPTY)),
        switchMap(() => this.store.refresh()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
