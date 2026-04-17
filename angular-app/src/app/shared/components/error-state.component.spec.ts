import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorStateComponent } from './error-state.component';

describe('ErrorStateComponent', () => {
  let fixture: ComponentFixture<ErrorStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorStateComponent);
    fixture.componentRef.setInput('message', 'Falha ao carregar usuários.');
    fixture.detectChanges();
  });

  it('should render the error message', () => {
    expect(fixture.nativeElement.textContent).toContain('Falha ao carregar usuários.');
  });

  it('should emit retry when the button is clicked', () => {
    const spy = jest.fn();
    fixture.componentInstance.retry.subscribe(spy);

    fixture.nativeElement.querySelector('button').click();

    expect(spy).toHaveBeenCalled();
  });
});
