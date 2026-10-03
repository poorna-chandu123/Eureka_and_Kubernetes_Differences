import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<HttpResponse<unknown>> {
    return this.http.post('/api/auth/login', { username, password }, { observe: 'response' });
  }

  createCustomer(data: { name: string; email: string; phone: string }): Observable<HttpResponse<unknown>> {
    return this.http.post('/api/customers', data, { observe: 'response' });
  }

  getCustomer(id: number): Observable<HttpResponse<unknown>> {
    return this.http.get(`/api/customers/${id}`, { observe: 'response' });
  }

  createAccount(data: { customerId: number; accountType: string }): Observable<HttpResponse<unknown>> {
    return this.http.post('/api/accounts', data, { observe: 'response' });
  }

  closeAccount(id: number): Observable<HttpResponse<unknown>> {
    return this.http.delete(`/api/accounts/${id}`, { observe: 'response' });
  }
}
