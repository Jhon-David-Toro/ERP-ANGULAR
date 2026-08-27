import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Country } from '../../core/models/country.model';
import { CountryService } from '../../core/services/country.service';
import { CountrySelector } from '../../shared/components/country-selector/country-selector';
import { Input } from '../../shared/components/input/input';
import { Spinner } from '../../shared/components/spinner/spinner';
import { matchingPasswordValidator } from '../../shared/validators/matching-password.validator';

@Component({
  imports: [
    CommonModule,
    CountrySelector,
    Input,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    Spinner
  ],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html'
})
export class Register implements OnInit {
  private readonly formBuild = inject(FormBuilder);
  private readonly countryService = inject(CountryService);

  readonly submitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly imageLoaded = signal(false);
  readonly showPassword = signal(false);
  readonly countries = signal<Country[]>([]);
  readonly countriesLoading = signal(true);
  readonly countriesLoadError = signal(false);

  readonly passwordInputType = computed(() => (this.showPassword() ? 'text' : 'password'));

  readonly passwordAriaLabel = computed(() =>
    this.showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'
  );

  readonly form = this.formBuild.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    countryCode: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
      ]
    ],
    confirmPassword: ['', [Validators.required, matchingPasswordValidator]],

    terms: [false, Validators.requiredTrue],
    marketing: [false]
  });

  private readonly genericErrors: Record<string, (error?: { requiredLength?: number }) => string> =
    {
      required: () => 'Este campo es obligatorio',
      email: () => 'Ingresa un correo electrónico válido',
      minlength: (error) => `Debe tener al menos ${error?.requiredLength ?? 0} caracteres`,
      pattern: () => 'Formato inválido'
    };

  ngOnInit(): void {
    this.form.controls.password.valueChanges.subscribe(() => {
      this.form.controls.confirmPassword.updateValueAndValidity({
        emitEvent: false
      });
    });

    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.countries.set(countries);
        this.countriesLoading.set(false);
      },
      error: () => {
        this.countriesLoadError.set(true);
        this.countriesLoading.set(false);
      }
    });
  }

  private readonly fieldErrors: Record<string, Record<string, string>> = {
    phone: {
      pattern: 'Ingresa un número de celular válido'
    },
    password: {
      pattern: 'La contraseña debe incluir letras, números y símbolos'
    },
    confirmPassword: {
      passwordMismatch: 'Las contraseñas no coinciden'
    },
    terms: {
      required: 'Debes aceptar los términos y condiciones'
    }
  };

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  async onSubmitForm(): Promise<void> {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    try {
      const payload = this.buildPayload();
      console.log('Aca sale el data form', payload);

      await new Promise((resolve) => setTimeout(resolve, 800));

      // Dejo este espacio para consumir el servicio acá y mandarle el payload esperando a escobar >.<
    } finally {
      this.isSubmitting.set(false);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);

    return !!control?.invalid && (control.touched || this.submitted());
  }

  getError(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control || !this.shouldShowError(control)) return '';

    return this.getErrorMessage(controlName, control.errors);
  }

  private shouldShowError(control: ReturnType<typeof this.form.get>): boolean {
    return !!control?.errors && (control.touched || this.submitted());
  }

  private getErrorMessage(
    controlName: string,
    errors: NonNullable<ReturnType<typeof this.form.get>>['errors']
  ): string {
    const firstErrorKey = Object.keys(errors ?? {})[0];

    return (
      this.fieldErrors[controlName]?.[firstErrorKey] ??
      this.genericErrors[firstErrorKey]?.(errors?.[firstErrorKey]) ??
      'Campo inválido'
    );
  }

  private buildPayload() {
    const value = this.form.getRawValue();

    return {
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      email: value.email.trim().toLowerCase(),
      countryCode: value.countryCode,
      password: value.password,
      terms: value.terms,
      marketing: value.marketing
    };
  }
}
