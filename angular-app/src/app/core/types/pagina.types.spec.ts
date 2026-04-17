import { filtrarEPaginar } from './pagina.types';

describe('filtrarEPaginar', () => {
  it('should filter and paginate the data', () => {
    const users = [
      { id: 1, name: 'Ana' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bruno' },
      { id: 4, name: 'Alisson' },
    ];

    const result = filtrarEPaginar(
      users,
      (user) => user.name.toLowerCase().startsWith('ali'),
      { pagina: 1, tamanho: 2 },
    );

    expect(result.itens).toEqual([
      { id: 2, name: 'Alice' },
      { id: 4, name: 'Alisson' },
    ]);
    expect(result.total).toBe(2);
    expect(result.totalPaginas).toBe(1);
  });

  it('should normalize invalid page params', () => {
    const result = filtrarEPaginar([1, 2, 3], () => true, { pagina: 0, tamanho: 0 });

    expect(result.pagina).toBe(1);
    expect(result.tamanho).toBe(1);
    expect(result.itens).toEqual([1]);
  });
});
