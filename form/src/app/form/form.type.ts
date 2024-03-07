import {
  ValidatorFn,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  FormArray,
  AbstractControlOptions,
} from '@angular/forms';

export type ValidatorConfig =
  | ValidatorFn
  | ValidatorFn[]
  | AsyncValidatorFn
  | AsyncValidatorFn[]
  | null;

export type ControlConfig =
  | FormControl
  | FormGroup
  | FormArray
  | AbstractControlOptions
  | ValidatorConfig;

export type FormControlsConfig<T> = {
  [K in keyof T]: ControlConfig;
};
