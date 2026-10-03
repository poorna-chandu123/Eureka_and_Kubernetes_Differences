import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MessageType = 'success' | 'error' | 'info';

export interface UiMessage {
  type: MessageType;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class UiMessageService {
  private messageSubject = new BehaviorSubject<UiMessage | null>(null);
  readonly message$ = this.messageSubject.asObservable();

  show(type: MessageType, text: string, durationMs = 5000): void {
    this.messageSubject.next({ type, text });
    if (durationMs > 0) {
      setTimeout(() => this.clear(), durationMs);
    }
  }

  success(text: string): void {
    this.show('success', text);
  }

  error(text: string): void {
    this.show('error', text, 8000);
  }

  info(text: string): void {
    this.show('info', text);
  }

  clear(): void {
    this.messageSubject.next(null);
  }
}
