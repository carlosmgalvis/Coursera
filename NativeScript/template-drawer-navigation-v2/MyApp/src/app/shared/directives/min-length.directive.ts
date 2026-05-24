import { Directive, Input } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

@Directive({
  selector: '[appMinLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinLengthDirective,
      multi: true
    }
  ]
})
export class MinLengthDirective implements Validator {
  @Input('appMinLength') minLength: number = 3

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null
    }
    const isValid = control.value.length >= this.minLength
    return isValid ? null : { 
      appMinLength: { 
        requiredLength: this.minLength, 
        actualLength: control.value.length 
      } 
    }
  }
}
