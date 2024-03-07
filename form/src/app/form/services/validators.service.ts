import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}
  // please use expectedValue type as per your requirement
  static customValidator(expectedValue: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value === expectedValue;
      return isValid ? null : { customError: true };
    };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        // If control is empty, return null (considered valid)
        return null;
      }
      const isValid = regex.test(control.value);
      return isValid ? null : error;
    };
  }

  // Required Validator
  static requiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNotEmpty =
        control.value !== null &&
        control.value !== undefined &&
        control.value !== '';
      return isNotEmpty ? null : { required: true };
    };
  }

  // Email Validator
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailInvalid: true };
    };
  }

  // Enable/Disable Control
  static toggleControlState(
    control: AbstractControl,
    isEnabled: boolean
  ): void {
    if (isEnabled) {
      control.enable();
    } else {
      control.disable();
    }
  }

  // Set Control Validators
  static setControlValidators(
    control: AbstractControl,
    validators: ValidatorFn[]
  ): void {
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || isNaN(control.value)) {
        return null; // Not checking for non-numeric values, consider another validator for type or format checks
      }
      return control.value < min
        ? { min: { min, actual: control.value } }
        : null;
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || isNaN(control.value)) {
        return null;
      }
      return control.value > max
        ? { max: { max, actual: control.value } }
        : null;
    };
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length < minLength
        ? { minLength: { minLength, actualLength: control.value.length } }
        : null;
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length > maxLength
        ? { maxLength: { maxLength, actualLength: control.value.length } }
        : null;
    };
  }

  static passwordMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (
        !control ||
        !matchingControl ||
        control.value !== matchingControl.value
      ) {
        return { passwordMatch: true };
      }
      return null;
    };
  }
}
