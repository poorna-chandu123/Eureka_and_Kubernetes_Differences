import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: `
    <div class="container">
      <h2>Banking System</h2>

      <p>Logged in user: <b>{{ username }}</b></p>

      <div class="operation">
        <h3>Customer Operations</h3>
        <button (click)="go('/customers/create')">Create Customer</button>
        <button (click)="go('/customers/get')">Get Customer</button>
      </div>

      <div class="operation">
        <h3>Account Operations</h3>
        <button (click)="go('/accounts/create')">Create Account</button>
        <button (click)="go('/accounts/close')">Delete / Close Account</button>
      </div>

      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class DashboardComponent {
  private router = inject(Router);
  username = sessionStorage.getItem('username') ?? '';

  go(path: string): void {
    this.router.navigateByUrl(path);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}