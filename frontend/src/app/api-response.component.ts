import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface ResponseField {
  key: string;
  value: unknown;
}

@Component({
  selector: 'app-api-response',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="result-card success-result">
      <h3>{{ title }}</h3>
      <p><strong>HTTP Status:</strong> {{ status }}</p>

      <div class="response-grid" *ngIf="displayFields.length > 0; else nonObjectResponse">
        <div class="response-field" *ngFor="let field of displayFields">
          <label>{{ field.key }}</label>
          <input class="response-value" type="text" [value]="displayValue(field.value)" readonly>
        </div>
      </div>

      <ng-template #nonObjectResponse>
        <div class="response-field" *ngIf="body !== null && body !== undefined">
          <label>Response</label>
          <input class="response-value" type="text" [value]="displayValue(body)" readonly>
        </div>

        <div class="response-field" *ngIf="body === null || body === undefined">
          <label>Response</label>
          <input class="response-value" type="text" value="No response body returned" readonly>
        </div>
      </ng-template>
    </div>
  `
})
export class ApiResponseComponent {
  @Input() title = 'API Response';
  @Input() status = 200;
  @Input() body: unknown = null;
  @Input() emptyFields: ResponseField[] = [];

  get displayFields(): ResponseField[] {
    if (this.isObject(this.body)) {
      return Object.entries(this.body as Record<string, unknown>)
        .map(([key, value]) => ({ key, value }));
    }
    return this.emptyFields;
  }

  isObject(value: unknown): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  displayValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}
