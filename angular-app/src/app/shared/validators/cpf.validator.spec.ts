import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';

describe('cpfValidator', () => {
  it('should return null for an empty value', () => {
    const control = new FormControl('');
    expect(cpfValidator()(control)).toBeNull();
  });

  it('should return null for a valid cpf', () => {
    const control = new FormControl('39053344705');
    expect(cpfValidator()(control)).toBeNull();
  });

  it('should return error for an invalid cpf', () => {
    const control = new FormControl('11111111111');
    expect(cpfValidator()(control)).toEqual({ cpfInvalid: true });
  });
});
