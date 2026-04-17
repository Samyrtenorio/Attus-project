import { isValidCpf, onlyDigits } from './cpf.util';

describe('cpf.util', () => {
  it('should keep only digits', () => {
    expect(onlyDigits('390.533.447-05')).toBe('39053344705');
  });

  it('should return true for a valid cpf', () => {
    expect(isValidCpf('39053344705')).toBe(true);
  });

  it('should return false for repeated digits', () => {
    expect(isValidCpf('11111111111')).toBe(false);
  });

  it('should return false for invalid length', () => {
    expect(isValidCpf('123')).toBe(false);
  });
});
