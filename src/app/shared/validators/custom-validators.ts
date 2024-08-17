import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = /^[0-9]{9}$/;
      const valid = phoneRegex.test(control.value);
      return valid ? null : { phoneNumber: 'Błędny format\n\n Poprawny format:\n np. 123123123' };
    };
  }
}