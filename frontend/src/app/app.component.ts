import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiMessageService } from './ui-message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div
      *ngIf="message$ | async as message"
      class="toast"
      [class.toast-success]="message.type === 'success'"
      [class.toast-error]="message.type === 'error'"
      [class.toast-info]="message.type === 'info'"
      role="alert">
      <span>{{ message.text }}</span>
      <button type="button" class="toast-close" (click)="close()">×</button>
    </div>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  private messages = inject(UiMessageService);
  readonly message$ = this.messages.message$;

  close(): void {
    this.messages.clear();
  }
}
