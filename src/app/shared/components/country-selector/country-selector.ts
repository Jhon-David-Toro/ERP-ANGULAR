import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '../../../core/models/country.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-country-selector',
  templateUrl: './country-selector.html',
  styleUrl: './country-selector.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelector),
      multi: true
    }
  ]
})
export class CountrySelector implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly countries = input<Country[]>([]);
  readonly loading = input(false);
  readonly invalid = input(false);
  readonly error = input('');

  readonly isOpen = signal(false);
  readonly searchTerm = signal('');
  readonly value = signal('');
  readonly disabled = signal(false);

  readonly selectedCountry = computed(() =>
    this.countries().find((country) => country.dialCode === this.value())
  );

  readonly filteredCountries = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();

    if (!search) return this.countries();

    return this.countries().filter((country) =>
      `${country.name} ${country.dialCode}`.toLocaleLowerCase().includes(search)
    );
  });

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  toggle(): void {
    if (this.disabled()) return;

    this.isOpen.update((open) => !open);
    this.searchTerm.set('');
  }

  selectCountry(country: Country): void {
    this.value.set(country.dialCode);
    this.onChange(country.dialCode);
    this.onTouched();
    this.isOpen.set(false);
    this.searchTerm.set('');
  }

  close(): void {
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.isOpen()) this.close();
  }

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
