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
      <h2>Create Account</h2>

      <label>Customer ID</label>
      <input type="number" [(ngModel)]="customerId" [disabled]="loading()">

      <label>Account Type</label>
      <select [(ngModel)]="accountType" [disabled]="loading()">
        <option value="SAVINGS">SAVINGS</option>
        <option value="CURRENT">CURRENT</option>
      </select>

      <button (click)="submit()" [disabled]="loading()">
        {{ loading() ? 'Processing...' : 'Submit' }}
      </button>

      <span class="link" (click)="back()">Back</span>

      <app-api-response
        *ngIf="result() as result"
        title="Account Response"
        [status]="result.status"
        [body]="result.body">
      </app-api-response>

    </div>
  `
})
export class CreateAccountComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private messages = inject(UiMessageService);

  customerId = 1;
  accountType = 'SAVINGS';
  loading = signal(false);
  result = signal<{ status: number; body: unknown } | null>(null);

  submit(): void {
    if (this.loading()) return;

    this.result.set(null);
    this.loading.set(true);

    this.api.createAccount({ customerId: Number(this.customerId), accountType: this.accountType }).subscribe({
      next: (res) => {
        this.result.set({ status: res.status, body: res.body });
        this.loading.set(false);
        this.messages.success('Account created successfully.');
      },
      error: (err) => {
        this.loading.set(false);
        this.messages.error(formatApiError(err, 'Account creation'));
      }
    });
  }

  back(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
