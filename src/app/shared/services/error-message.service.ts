import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor() {}

  getError(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);
    return this.getErrorMessage(control);
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (control && control.touched) {
      console.log(control);
      switch (true) {
        case control.hasError('required'):
          return 'Pole jest wymagane';

        case control.hasError('email'):
          return 'Błędny format email';

        case control.hasError('phoneNumber'):
          return control.getError('phoneNumber');

        case control.hasError('minlength'):
          const requiredMinLength =
            control.getError('minlength').requiredLength;
          return `Minimalna długość to ${requiredMinLength} znaków`;

        case control.hasError('maxlength'):
          const requiredMaxLength =
            control.getError('maxlength').requiredLength;
          return `Maksymalna długość to ${requiredMaxLength} znaków`;

        default:
          return '';
      }
    }
    return '';
  }
}
