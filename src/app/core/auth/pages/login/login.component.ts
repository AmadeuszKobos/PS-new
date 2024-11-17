import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = {
        Username: this.loginForm.value.username,
        Password: this.loginForm.value.password
      };
      this.authService.login(formData).subscribe({
        next: (token) => {
          this.notificationService.addMessage( 'success', 'Pomyślnie zalogowano', 'Witaj A');
          this.notificationService.flushMessages()

          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notificationService.addMessage( 'error', 'Nie udało się zalogować', error.error);
          this.notificationService.flushMessages()
          console.log(error)
          //this.messageService.add({ severity: 'error', summary: 'Błąd logowania', detail: 'Niepoprawna nazwa użytkownika lub hasło' });
        }
      });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
