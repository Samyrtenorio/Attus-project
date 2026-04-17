import { FormControl } from '@angular/forms';
import { phoneValidator } from './phone.validator';

describe('phoneValidator', () => {
  it('should return null for an empty value', () => {
    const control = new FormControl('');
    expect(phoneValidator()(control)).toBeNull();
  });

  it('should return null for valid phone', () => {
    const control = new FormControl('11987654321');
    expect(phoneValidator()(control)).toBeNull();
  });

  it('should return error for invalid phone', () => {
    const control = new FormControl('123');
    expect(phoneValidator()(control)).toEqual({ phoneInvalid: true });
  });
});
