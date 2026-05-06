import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nombreProhibidoValidator(nombre: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value?.toLowerCase() === nombre.toLowerCase()) {
      return { nombreProhibido: true };
    }

    return null;
  };
}