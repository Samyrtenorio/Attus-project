import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidPhone } from '../utils/phone.util';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');

    if (!value) {
      return null;
    }

    return isValidPhone(value) ? null : { phoneInvalid: true };
  };
}
