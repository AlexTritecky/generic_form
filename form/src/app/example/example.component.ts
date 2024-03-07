import { Component } from '@angular/core';
import { BaseFormComponent } from '../form/components/base-form.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidatorsService } from '../form/services/validators.service';
import { FormService } from '../form/services/form.service';
import { FormControlsConfig } from '../form/form.type';
import { CommonModule } from '@angular/common';

export interface ExampleInterface {
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  password: string;
  confirm_password: string;
  is_artist: boolean;
}

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent extends BaseFormComponent<ExampleInterface> {
  constructor(override formService: FormService) {
    super(formService);
  }

  protected initForm() {
    const controlsConfig: FormControlsConfig<ExampleInterface> = {
      email: new FormControl<string>('', [
        ValidatorsService.requiredValidator(),
        ValidatorsService.emailValidator(),
      ]),
      first_name: new FormControl<string>('', [
        ValidatorsService.requiredValidator(),
      ]),
      last_name: new FormControl<string>('', [
        ValidatorsService.requiredValidator(),
      ]),
      age: new FormControl<number | null>(null, [
        ValidatorsService.requiredValidator(),
        ValidatorsService.min(18),
      ]),
      password: new FormControl<string>('', [
        ValidatorsService.requiredValidator(),
        ValidatorsService.minLength(8),
      ]),
      confirm_password: new FormControl<string>('', [
        ValidatorsService.requiredValidator(),
      ]),
      is_artist: new FormControl<boolean>(false),
    };

    return this.formService.buildForm(controlsConfig, {
      validators: ValidatorsService.passwordMatch(
        'password',
        'confirm_password'
      ),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      console.log('Form value:', formValue);
    } else {
      console.log('Form is invalid');
    }
  }
}
