import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersPageComponent } from './users-page.component';
import { UsersStore } from '../data-access/users.store';
import { User } from '@app/core/models/user.model';

const usersState = signal<User[]>([]);
const loadingState = signal(false);
const errorState = signal<string | null>(null);
const lastSearchState = signal('');

const storeMock = {
  users: usersState.asReadonly(),
  loading: loadingState.asReadonly(),
  error: errorState.asReadonly(),
  hasUsers: computed(() => usersState().length > 0),
  lastSearch: lastSearchState.asReadonly(),
  search: jest.fn((term = '') => {
    lastSearchState.set(term);
    return of(usersState());
  }),
  refresh: jest.fn(() => of(usersState())),
  create: jest.fn((payload: Omit<User, 'id'>) => of({ id: 2, ...payload })),
  update: jest.fn((id: number, payload: Omit<User, 'id'>) => of({ id, ...payload })),
};

const dialogOpenMock = jest.fn();
const dialogMock = {
  open: dialogOpenMock,
};

describe('UsersPageComponent', () => {
  let fixture: ComponentFixture<UsersPageComponent>;
  let component: UsersPageComponent;

  beforeEach(async () => {
    usersState.set([
      {
        id: 1,
        name: 'Alis',
        email: 'alis@email.com',
        cpf: '39053344705',
        phone: '11987654321',
        phoneType: 'mobile',
      },
    ]);
    loadingState.set(false);
    errorState.set(null);
    lastSearchState.set('');
    jest.clearAllMocks();
    dialogOpenMock.mockReturnValue({
      afterClosed: () => of(null),
    });

    await TestBed.configureTestingModule({
      imports: [UsersPageComponent],
      providers: [
        { provide: UsersStore, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
  });

  it('should perform the initial search and render the users list', fakeAsync(() => {
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    expect(storeMock.search).toHaveBeenCalledWith('');
    expect(fixture.nativeElement.textContent).toContain('Alis');
    expect(component.hasError()).toBe(false);
  }));

  it('should search again when the term changes', fakeAsync(() => {
    fixture.detectChanges();
    tick(300);

    component.searchControl.setValue('ali');
    tick(300);

    expect(storeMock.search).toHaveBeenLastCalledWith('ali');
  }));

  it('should render the loading state', fakeAsync(() => {
    loadingState.set(true);

    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Carregando usuários...');
  }));

  it('should render the error state and allow reload', fakeAsync(() => {
    errorState.set('Falha ao carregar usuários.');

    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    expect(component.hasError()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Falha ao carregar usuários.');

    fixture.nativeElement.querySelector('.state-box button').click();
    expect(storeMock.refresh).toHaveBeenCalled();
  }));

  it('should render the empty state', fakeAsync(() => {
    usersState.set([]);

    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Nenhum usuário encontrado.');
  }));

  it('should open the create dialog when the FAB is clicked', fakeAsync(() => {
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.fab-create').click();

    expect(dialogOpenMock).toHaveBeenCalled();
  }));

  it('should create and refresh when the create dialog returns data', fakeAsync(() => {
    dialogOpenMock.mockReturnValue({
      afterClosed: () =>
        of({
          name: 'Novo',
          email: 'novo@email.com',
          cpf: '39053344705',
          phone: '11999999999',
          phoneType: 'mobile',
        }),
    });

    fixture.detectChanges();
    tick(300);

    component.openCreateDialog();

    expect(storeMock.create).toHaveBeenCalledWith({
      name: 'Novo',
      email: 'novo@email.com',
      cpf: '39053344705',
      phone: '11999999999',
      phoneType: 'mobile',
    });
    expect(storeMock.refresh).toHaveBeenCalled();
  }));

  it('should update and refresh when the edit dialog returns data', fakeAsync(() => {
    dialogOpenMock.mockReturnValue({
      afterClosed: () =>
        of({
          name: 'Editado',
          email: 'editado@email.com',
          cpf: '39053344705',
          phone: '11888887777',
          phoneType: 'whatsapp',
        }),
    });

    fixture.detectChanges();
    tick(300);

    component.openEditDialog(usersState()[0]);

    expect(storeMock.update).toHaveBeenCalledWith(1, {
      name: 'Editado',
      email: 'editado@email.com',
      cpf: '39053344705',
      phone: '11888887777',
      phoneType: 'whatsapp',
    });
    expect(storeMock.refresh).toHaveBeenCalled();
  }));

  it('should toggle and close the side menu', fakeAsync(() => {
    fixture.detectChanges();
    tick(300);

    fixture.nativeElement.querySelector('.topbar-menu-button').click();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(true);

    component.closeMenu();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(false);
  }));
});
