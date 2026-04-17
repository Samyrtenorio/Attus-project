import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    fixture.componentRef.setInput('user', {
      id: 1,
      name: 'Ana Souza',
      email: 'ana@email.com',
      cpf: '39053344705',
      phone: '11987654321',
      phoneType: 'mobile',
    });
    fixture.detectChanges();
  });

  it('should render the user name and email', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Ana Souza');
    expect(text).toContain('ana@email.com');
  });

  it('should emit edit when the action button is clicked', () => {
    const component = fixture.componentInstance;
    const spy = jest.fn();
    component.edit.subscribe(spy);

    fixture.nativeElement.querySelector('.user-row-edit').click();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: 'Ana Souza' }),
    );
  });
});
