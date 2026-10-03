import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { formatApiError } from './ui-error.util';
import { UiMessageService } from './ui-message.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Login</h2>

      <label>User Name</label>
      <input [(ngModel)]="username" [disabled]="loading()">

      <label>Password</label>
      <input type="password" [(ngModel)]="password" [disabled]="loading()">

      <button (click)="login()" [disabled]="loading()">
        {{ loading() ? 'Logging in...' : 'Submit' }}
      </button>
    </div>
  `
})
export class LoginComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  private messages = inject(UiMessageService);

  username = '';
  password = '';
  loading = signal(false);

  login(): void {
    if (this.loading()) return;

    this.loading.set(true);

    this.api.login(this.username, this.password).subscribe({
      next: (response) => {
        const body: any = response.body;
        const token = body?.token ?? body?.jwt ?? body?.accessToken;

        if (!token) {
          this.loading.set(false);
          this.messages.error('Login response did not contain a JWT token.');
          return;
        }

        sessionStorage.setItem('jwt', token);
        sessionStorage.setItem('username', this.username);
        this.loading.set(false);
        this.messages.success('Login successful.');
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.loading.set(false);
        this.messages.error(formatApiError(err, 'Login'));
      }
    });
  }
}
