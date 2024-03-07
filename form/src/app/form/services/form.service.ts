import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { FormControlsConfig } from '../form.type';
import { Observable, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FormService {
  constructor(private fb: FormBuilder) {}

  buildForm<T>(controlsConfig: FormControlsConfig<T>, formOptions?: AbstractControlOptions): FormGroup {
    return this.fb.group(controlsConfig as {}, formOptions);
  }

  patchFormValues<T>(form: FormGroup, values: Partial<T>): void {
    form.patchValue(values);
  }

  resetForm<T>(form: FormGroup, state?: Partial<T>): void {
    form.reset(state);
  }

  validateForm(form: FormGroup): void {
    Object.values(form.controls).forEach((control) => {
      control.updateValueAndValidity();
    });
  }

  getFormValueChanges<T>(form: FormGroup, debounce: number = 0): Observable<T> {
    return form.valueChanges.pipe(debounceTime(debounce));
  }

  disableControls(form: FormGroup, controlNames: string[] = []): void {
    if (controlNames.length === 0) {
      Object.values(form.controls).forEach((control) => control.disable());
    } else {
      controlNames.forEach((name) => {
        const control = form.get(name);
        if (control) {
          control.disable();
        }
      });
    }
  }

  enableControls(form: FormGroup, controlNames: string[] = []): void {
    if (controlNames.length === 0) {
      Object.values(form.controls).forEach((control) => control.enable());
    } else {
      controlNames.forEach((name) => {
        const control = form.get(name);
        if (control) {
          control.enable();
        }
      });
    }
  }
}
