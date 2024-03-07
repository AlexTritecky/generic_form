import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-base-form',
  template: '',
})
export abstract class BaseFormComponent<T> implements OnInit {
  form!: FormGroup;

  constructor(protected formService: FormService) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  // Initialize the form structure
  protected abstract initForm(): FormGroup;

  // Handle form submission
  abstract onSubmit(): void;

  // Optionally, add methods for patching form values, resetting the form, and validating the form
  patchFormValues(values: Partial<T>): void {
    this.formService.patchFormValues(this.form, values);
  }

  resetForm(state?: Partial<T>): void {
    this.formService.resetForm(this.form, state);
  }

  validateForm(): void {
    this.formService.validateForm(this.form);
  }

  // Utility method to subscribe to form value changes with optional debouncing
  subscribeToFormChanges(
    debounce: number = 0,
    callback: (value: T) => void
  ): void {
    this.formService
      .getFormValueChanges<T>(this.form, debounce)
      .subscribe(callback);
  }

  // Utility methods for enabling/disabling form controls
  disableControls(controlNames: string[] = []): void {
    this.formService.disableControls(this.form, controlNames);
  }

  enableControls(controlNames: string[] = []): void {
    this.formService.enableControls(this.form, controlNames);
  }
}
