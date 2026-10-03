import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { formatApiError } from './ui-error.util';
import { UiMessageService } from './ui-message.service';
import { ApiResponseComponent } from './api-response.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ApiResponseComponent],
  template: `
    <div class="container">
      <h2>Delete / Close Account</h2>

      <label>Account ID</label>
      <input type="number" [(ngModel)]="id" [disabled]="loading()">

      <button (click)="submit()" [disabled]="loading()">
        {{ loading() ? 'Processing...' : 'Submit' }}
      </button>

      <span class="link" (click)="back()">Back</span>

      <app-api-response
        *ngIf="result() as result"
        title="Account Close Response"
        [status]="result.status"
        [body]="result.body"
        [emptyFields]="[{ key: 'accountId', value: id }, { key: 'status', value: 'CLOSED' }]">
      </app-api-response>

    </div>
  `
})
export class CloseAccountComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private messages = inject(UiMessageService);

  id = 1;
  loading = signal(false);
  result = signal<{ status: number; body: unknown } | null>(null);

  submit(): void {
    if (this.loading()) return;

    this.result.set(null);
    this.loading.set(true);

    this.api.closeAccount(Number(this.id)).subscribe({
      next: (res) => {
        this.result.set({ status: res.status, body: res.body });
        this.loading.set(false);
        this.messages.success('Account close operation completed successfully.');
      },
      error: (err) => {
        this.loading.set(false);
        this.messages.error(formatApiError(err, 'Account close'));
      }
    });
  }

  back(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
