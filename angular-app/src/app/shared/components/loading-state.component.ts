import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state-box">
      <mat-spinner diameter="32"></mat-spinner>
      <span>Carregando usuários...</span>
    </div>
  `,
})
export class LoadingStateComponent {}
