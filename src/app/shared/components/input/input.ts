import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true
    }
  ]
})
export class Input implements ControlValueAccessor {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input('text');
  readonly inputMode = input<string | undefined>();
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string | undefined>();
  readonly describedBy = input<string | undefined>();
  readonly invalid = input(false);
  readonly error = input('');
  readonly hint = input('');
  readonly icon = input<string | undefined>();
  readonly hasSuffix = input(false);
  readonly required = input(false);

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
