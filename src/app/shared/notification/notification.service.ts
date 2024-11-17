import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageQueue: Message[] = [];

  constructor(private messageService: MessageService) { }

  showSuccess(summary: string, detail: string): void {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail: string): void {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  showInfo(summary: string, detail: string): void {
    this.messageService.add({ severity: 'info', summary, detail });
  }

  showWarn(summary: string, detail: string): void {
    this.messageService.add({ severity: 'warn', summary, detail });
  }

  addMessage(severity: string, summary: string, detail: string) {
    const msg: Message = {
      key: 'toast',
      severity: severity,
      summary: summary,
      detail: detail,
    };
    this.messageQueue.push(msg);
  }

  flushMessages() {
    for (const msg of this.messageQueue) {
      this.messageService.add({ severity: msg.severity, summary: msg.summary, detail: msg.detail});
    }
    this.messageQueue = [];
  }
}