import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
  });

  it('should filter users by name', async () => {
    const users = await firstValueFrom(service.searchUsers('giana'));
    expect(users).toHaveLength(1);
    expect(users.every((user) => user.name.toLowerCase().includes('giana'))).toBe(true);
  });

  it('should return all users for an empty term', async () => {
    const users = await firstValueFrom(service.searchUsers(''));
    expect(users.length).toBeGreaterThan(0);
  });

  it('should throw when the term is erro', async () => {
    await expect(firstValueFrom(service.searchUsers('erro'))).rejects.toThrow(
      'Falha ao carregar usuários.',
    );
  });

  it('should create a new user', async () => {
    const created = await firstValueFrom(
      service.createUser({
        name: 'Novo Usuário',
        email: 'novo@email.com',
        cpf: '39053344705',
        phone: '11988887777',
        phoneType: 'mobile',
      }),
    );

    expect(created.id).toBeGreaterThan(0);
    expect(created.name).toBe('Novo Usuário');
  });

  it('should create user with id 1 when database is empty', async () => {
    (service as unknown as { db: unknown[] }).db = [];

    const created = await firstValueFrom(
      service.createUser({
        name: 'Primeiro',
        email: 'primeiro@email.com',
        cpf: '39053344705',
        phone: '11988887777',
        phoneType: 'mobile',
      }),
    );

    expect(created.id).toBe(1);
  });

  it('should update an existing user', async () => {
    const updated = await firstValueFrom(
      service.updateUser(1, {
        name: 'Ana Atualizada',
        email: 'ana.atualizada@email.com',
        cpf: '39053344705',
        phone: '11999999999',
        phoneType: 'mobile',
      }),
    );

    expect(updated.id).toBe(1);
    expect(updated.name).toBe('Ana Atualizada');
  });
});
