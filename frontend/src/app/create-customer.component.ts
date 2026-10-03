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
      <h2>Create Customer</h2>

      <label>Name</label>
      <input [(ngModel)]="name" [disabled]="loading()">

      <label>Email</label>
      <input [(ngModel)]="email" [disabled]="loading()">

      <label>Phone</label>
      <input [(ngModel)]="phone" [disabled]="loading()">

      <button (click)="submit()" [disabled]="loading()">
        {{ loading() ? 'Processing...' : 'Submit' }}
      </button>

      <span class="link" (click)="back()">Back</span>

      <app-api-response
        *ngIf="result() as result"
        title="Customer Response"
        [status]="result.status"
        [body]="result.body">
      </app-api-response>

    </div>
  `
})
export class CreateCustomerComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private messages = inject(UiMessageService);

  name = '';
  email = '';
  phone = '';
  loading = signal(false);
  result = signal<{ status: number; body: unknown } | null>(null);

  submit(): void {
    if (this.loading()) return;

    this.result.set(null);
    this.loading.set(true);

    this.api.createCustomer({ name: this.name, email: this.email, phone: this.phone }).subscribe({
      next: (res) => {
        this.result.set({ status: res.status, body: res.body });
        this.loading.set(false);
        this.messages.success('Customer created successfully.');
      },
      error: (err) => {
        this.loading.set(false);
        this.messages.error(formatApiError(err, 'Customer creation'));
      }
    });
  }

  back(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
