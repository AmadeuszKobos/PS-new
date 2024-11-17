import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificationService } from './shared/notification/notification.service';
import { NotificationsService } from './core/services/notifications.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, NotificationService]
})
export class AppComponent {
  title = 'PS-new';
}
