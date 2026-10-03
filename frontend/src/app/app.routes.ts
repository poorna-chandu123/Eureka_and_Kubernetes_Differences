import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { CreateCustomerComponent } from './create-customer.component';
import { GetCustomerComponent } from './get-customer.component';
import { CreateAccountComponent } from './create-account.component';
import { CloseAccountComponent } from './close-account.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers/create', component: CreateCustomerComponent },
  { path: 'customers/get', component: GetCustomerComponent },
  { path: 'accounts/create', component: CreateAccountComponent },
  { path: 'accounts/close', component: CloseAccountComponent },
  { path: '**', redirectTo: 'login' }
];