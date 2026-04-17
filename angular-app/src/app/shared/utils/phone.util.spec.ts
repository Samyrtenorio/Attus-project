import { isValidPhone } from './phone.util';

describe('phone.util', () => {
  it('should return true for 10-digit phone', () => {
    expect(isValidPhone('1134567890')).toBe(true);
  });

  it('should return true for 11-digit phone', () => {
    expect(isValidPhone('11987654321')).toBe(true);
  });

  it('should return false for invalid length', () => {
    expect(isValidPhone('123')).toBe(false);
  });
});
