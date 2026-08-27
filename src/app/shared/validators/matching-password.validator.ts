import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;

  return password === control.value ? null : { passwordMismatch: true };
};
