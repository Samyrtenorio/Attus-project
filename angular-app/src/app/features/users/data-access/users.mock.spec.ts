import { USERS_MOCK } from './users.mock';

describe('USERS_MOCK', () => {
  it('should expose the default mock user', () => {
    expect(USERS_MOCK).toHaveLength(1);
    expect(USERS_MOCK[0]).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Giana Sandrini',
        email: 'giana@attornatus.com.br',
      }),
    );
  });
});
