import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  static personalNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pesel = control.value;
      if (!/^\d{11}$/.test(pesel)) {
        return { invalidPesel: true };
      }

      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      let sum = 0;

      for (let i = 0; i < weights.length; i++) {
        sum += weights[i] * parseInt(pesel[i], 10);
      }

      const checkDigit = (10 - (sum % 10)) % 10;

      if (checkDigit !== parseInt(pesel[10], 10)) {
        return { invalidPesel: true };
      }

      return null;
    };
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = /^[0-9]{9}$/;
      const valid = phoneRegex.test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }
}