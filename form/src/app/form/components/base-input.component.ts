import { ControlValueAccessor } from '@angular/forms';
import { Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'app-base-input',
  template: '',
})
export abstract class AbstractGenericInputComponent<T>
  implements ControlValueAccessor
{
  @Output() changed = new EventEmitter<T>();

  value: T | null = null;

  // The callbacks still need to be initialized to prevent errors if they're called before being registered
  private propagateChange = (value: T | null) => {};
  private propagateTouched = () => {};

  writeValue(value: T | null): void {
    this.value = value;
    if (value) {
      this.onChange(value);
    }
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  // Trigger change detection and emit the changed value
  onChange(value: T): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  // Notify that the component has been touched
  onBlur(): void {
    this.propagateTouched();
  }

  // Abstract methods that child classes must implement. Example:
  abstract onKeyup(value: T): void;
}
