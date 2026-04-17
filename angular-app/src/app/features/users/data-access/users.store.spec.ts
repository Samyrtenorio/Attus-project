import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersService } from './users.service';
import { UsersStore } from './users.store';

describe('UsersStore', () => {
  let store: UsersStore;
  let service: jest.Mocked<UsersService>;

  beforeEach(() => {
    const serviceMock: jest.Mocked<UsersService> = {
      searchUsers: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;

    TestBed.configureTestingModule({
      providers: [
        UsersStore,
        { provide: UsersService, useValue: serviceMock },
      ],
    });

    store = TestBed.inject(UsersStore);
    service = TestBed.inject(UsersService) as jest.Mocked<UsersService>;
  });

  it('should load users successfully and set computed values', () => {
    service.searchUsers.mockReturnValue(
      of([
        {
          id: 1,
          name: 'Ana Souza',
          email: 'ana@email.com',
          cpf: '39053344705',
          phone: '11999999999',
          phoneType: 'mobile',
        },
      ]),
    );

    store.search('ana').subscribe();

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.users()).toHaveLength(1);
    expect(store.hasUsers()).toBe(true);
    expect(store.lastSearch()).toBe('ana');
  });

  it('should set error state when search fails', () => {
    service.searchUsers.mockReturnValue(
      throwError(() => new Error('Falha ao carregar usuários.')),
    );

    store.search('erro').subscribe();

    expect(store.loading()).toBe(false);
    expect(store.error()).toBe('Falha ao carregar usuários.');
    expect(store.users()).toEqual([]);
    expect(store.hasUsers()).toBe(false);
  });

  it('should refresh using the last search term', () => {
    service.searchUsers.mockReturnValue(of([]));

    store.search('giana').subscribe();
    store.refresh().subscribe();

    expect(service.searchUsers).toHaveBeenLastCalledWith('giana');
  });

  it('should prepend a created user to the state', () => {
    const payload = {
      name: 'Novo',
      email: 'novo@email.com',
      cpf: '39053344705',
      phone: '11999999999',
      phoneType: 'mobile' as const,
    };

    service.searchUsers.mockReturnValue(of([]));
    service.createUser.mockReturnValue(of({ id: 2, ...payload }));

    store.search('').subscribe();
    store.create(payload).subscribe();

    expect(store.users()[0]).toEqual({ id: 2, ...payload });
  });

  it('should update an existing user in the state', () => {
    const original = {
      id: 1,
      name: 'Original',
      email: 'original@email.com',
      cpf: '39053344705',
      phone: '11999999999',
      phoneType: 'mobile' as const,
    };
    const payload = {
      name: 'Atualizado',
      email: 'atualizado@email.com',
      cpf: '39053344705',
      phone: '11888887777',
      phoneType: 'whatsapp' as const,
    };

    service.searchUsers.mockReturnValue(of([original]));
    service.updateUser.mockReturnValue(of({ id: 1, ...payload }));

    store.search('').subscribe();
    store.update(1, payload).subscribe();

    expect(store.users()).toEqual([{ id: 1, ...payload }]);
  });
});
