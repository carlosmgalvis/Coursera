import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

// Validador personalizado para longitud mínima
export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null
    }
    const isValid = control.value.length >= minLength
    return isValid ? null : { minLength: { requiredLength: minLength, actualLength: control.value.length } }
  }
}

// Validador personalizado para email
export function emailValidator(): ValidatorFn {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null
    }
    const isValid = emailPattern.test(control.value)
    return isValid ? null : { invalidEmail: true }
  }
}

// Validador personalizado para contraseña segura
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null
    }
    const hasUpperCase = /[A-Z]/.test(control.value)
    const hasLowerCase = /[a-z]/.test(control.value)
    const hasNumber = /[0-9]/.test(control.value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value)
    const isValidLength = control.value.length >= 8

    const errors: ValidationErrors = {}
    if (!hasUpperCase) errors['missingUpperCase'] = true
    if (!hasLowerCase) errors['missingLowerCase'] = true
    if (!hasNumber) errors['missingNumber'] = true
    if (!hasSpecialChar) errors['missingSpecialChar'] = true
    if (!isValidLength) errors['minLength'] = true

    return Object.keys(errors).length === 0 ? null : errors
  }
}
