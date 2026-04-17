import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User, UserFormValue } from '@app/core/models/user.model';
import { cpfValidator } from '@app/shared/validators/cpf.validator';
import { phoneValidator } from '@app/shared/validators/phone.validator';

export type UserDialogData = {
  mode: 'create' | 'edit';
  user?: User;
};

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="proto-dialog">
      <h2 mat-dialog-title class="proto-dialog-title">
        {{ data.mode === 'create' ? 'Adicionar novo usuário' : 'Editar usuário' }}
      </h2>

      <mat-dialog-content class="proto-dialog-content">
        <form class="proto-form" [formGroup]="form" novalidate>
          <div class="proto-field proto-field-full">
            <input
              class="proto-input"
              type="email"
              placeholder="Usuário (e-mail) *"
              formControlName="email"
            />
            @if (form.controls.email.touched && form.controls.email.hasError('required')) {
              <div class="proto-error">E-mail é obrigatório.</div>
            } @else if (form.controls.email.touched && form.controls.email.hasError('email')) {
              <div class="proto-error">Informe um e-mail válido.</div>
            }
          </div>

          <div class="proto-field proto-field-full">
            <input class="proto-input" placeholder="Nome completo *" formControlName="name" />
            @if (form.controls.name.touched && form.controls.name.hasError('required')) {
              <div class="proto-error">Nome é obrigatório.</div>
            }
          </div>

          <div class="proto-field">
            <input class="proto-input" placeholder="CPF *" formControlName="cpf" />
            @if (form.controls.cpf.touched && form.controls.cpf.hasError('required')) {
              <div class="proto-error">CPF é obrigatório.</div>
            } @else if (form.controls.cpf.touched && form.controls.cpf.hasError('cpfInvalid')) {
              <div class="proto-error">Informe um CPF válido.</div>
            }
          </div>

          <div class="proto-field">
            <input class="proto-input" placeholder="Número do telefone *" formControlName="phone" />
            @if (form.controls.phone.touched && form.controls.phone.hasError('required')) {
              <div class="proto-error">Telefone é obrigatório.</div>
            } @else if (form.controls.phone.touched && form.controls.phone.hasError('phoneInvalid')) {
              <div class="proto-error">Informe um telefone válido.</div>
            }
          </div>

          <div class="proto-field proto-field-select">
            <select class="proto-select" formControlName="phoneType">
              <option value="mobile">CELULAR</option>
              <option value="landline">FIXO</option>
              <option value="whatsapp">WHATSAPP</option>
            </select>
            @if (form.controls.phoneType.touched && form.controls.phoneType.hasError('required')) {
              <div class="proto-error">Tipo de telefone é obrigatório.</div>
            }
          </div>
        </form>

        <p class="proto-hint">O usuário receberá uma senha provisória para acesso ao sistema por SMS.</p>
      </mat-dialog-content>

      <mat-dialog-actions align="start" class="proto-dialog-actions">
        <button type="button" class="proto-save-button" (click)="save()" [disabled]="form.invalid">
          SALVAR
        </button>
      </mat-dialog-actions>
    </div>
  `,
})
export class UserFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<MatDialogRef<UserFormDialogComponent, UserFormValue>>(MatDialogRef);
  readonly data = inject<UserDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, cpfValidator()]],
    phone: ['', [Validators.required, phoneValidator()]],
    phoneType: this.fb.nonNullable.control<'mobile' | 'landline' | 'whatsapp' | ''>('mobile', Validators.required),
  });

  constructor() {
    if (this.data.user) {
      this.form.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        cpf: this.data.user.cpf,
        phone: this.data.user.phone,
        phoneType: this.data.user.phoneType,
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue() as UserFormValue);
  }
}
