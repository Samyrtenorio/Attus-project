import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingStateComponent } from './loading-state.component';

describe('LoadingStateComponent', () => {
  let fixture: ComponentFixture<LoadingStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingStateComponent);
    fixture.detectChanges();
  });

  it('should render the loading message', () => {
    expect(fixture.nativeElement.textContent).toContain('Carregando usuários...');
  });

  it('should render the spinner element', () => {
    expect(fixture.nativeElement.querySelector('mat-spinner')).toBeTruthy();
  });
});
