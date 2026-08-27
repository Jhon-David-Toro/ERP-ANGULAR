import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private readonly formBuild = inject(FormBuilder);

  readonly submitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly showPassword = signal(false);

  readonly passwordInputType = computed(() =>
    this.showPassword() ? 'text' : 'password'
  );

  readonly passwordButtonText = computed(() =>
    this.showPassword() ? 'Ocultar' : 'Mostrar'
  );

  readonly passwordAriaLabel = computed(() =>
    this.showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'
  );

  readonly form = this.formBuild.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      ],
    ],

    terms: [false, Validators.requiredTrue],
    marketing: [false],
  });

  private readonly genericErrors: Record<string, (error?: any) => string> = {
    required: () => 'Este campo es obligatorio',
    email: () => 'Ingresa un correo electrónico válido',
    minlength: (error) =>
      `Debe tener al menos ${error.requiredLength} caracteres`,
    pattern: () => 'Formato inválido',
  };
  
  private readonly fieldErrors: Record<string, Record<string, string>> = {
    phone: {
      pattern: 'Ingresa un número de celular válido',
    },
    password: {
      pattern: 'La contraseña debe incluir letras, números y símbolos',
    },
    terms: {
      required: 'Debes aceptar los términos y condiciones',
    },
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
      console.log('Aca sale el data form', payload)

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
    const errors = control?.errors;

    if (!errors) return '';
    if (!control.touched && !this.submitted()) return '';

    const firstErrorKey = Object.keys(errors)[0];

    return (
      this.fieldErrors[controlName]?.[firstErrorKey] ??
      this.genericErrors[firstErrorKey]?.(errors[firstErrorKey]) ??
      'Campo inválido'
    );
  }

  private buildPayload() {
    const value = this.form.getRawValue();

    return {
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      email: value.email.trim().toLowerCase(),
      password: value.password,
      terms: value.terms,
      marketing: value.marketing,
    };
  }
}
