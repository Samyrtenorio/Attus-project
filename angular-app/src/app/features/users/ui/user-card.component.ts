import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="user-row-card">
      <div class="user-row-icon" aria-hidden="true">👤</div>

      <div class="user-row-name">{{ user().name }}</div>
      <div class="user-row-email">{{ user().email }}</div>

      <button
        type="button"
        class="user-row-edit"
        aria-label="Editar usuário"
        (click)="edit.emit(user())"
      >
        ✎
      </button>
    </article>
  `,
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly edit = output<User>();
}
