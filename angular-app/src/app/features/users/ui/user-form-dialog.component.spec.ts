import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormDialogComponent } from './user-form-dialog.component';

describe('UserFormDialogComponent', () => {
  let fixture: ComponentFixture<UserFormDialogComponent>;
  let component: UserFormDialogComponent;
  let dialogRef: { close: jest.Mock };

  async function setup(data: unknown): Promise<void> {
    dialogRef = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [UserFormDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should prefill form when editing', async () => {
    await setup({
      mode: 'edit',
      user: {
        id: 1,
        name: 'Ana Souza',
        email: 'ana@email.com',
        cpf: '39053344705',
        phone: '11987654321',
        phoneType: 'mobile',
      },
    });

    expect(component.form.getRawValue().name).toBe('Ana Souza');
    expect(component.form.getRawValue().email).toBe('ana@email.com');
    expect(fixture.nativeElement.textContent).toContain('Editar usuário');
  });

  it('should render create title and keep default values', async () => {
    await setup({ mode: 'create' });

    expect(fixture.nativeElement.textContent).toContain('Adicionar novo usuário');
    expect(component.form.getRawValue().phoneType).toBe('mobile');
  });

  it('should keep save disabled when form is invalid', async () => {
    await setup({ mode: 'create' });

    component.form.patchValue({ email: '' });
    expect(component.form.invalid).toBe(true);
  });

  it('should mark form as touched and not close when save is invalid', async () => {
    await setup({ mode: 'create' });

    component.save();

    expect(component.form.touched).toBe(true);
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog with form value when valid', async () => {
    await setup({
      mode: 'edit',
      user: {
        id: 1,
        name: 'Ana Souza',
        email: 'ana@email.com',
        cpf: '39053344705',
        phone: '11987654321',
        phoneType: 'mobile',
      },
    });

    component.save();
    expect(dialogRef.close).toHaveBeenCalledWith({
      name: 'Ana Souza',
      email: 'ana@email.com',
      cpf: '39053344705',
      phone: '11987654321',
      phoneType: 'mobile',
    });
  });
});
