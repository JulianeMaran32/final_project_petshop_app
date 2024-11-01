import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { LoginRequest } from '../../../shared/models/auth/login-request.model';
import { LoggerService } from '../../../core/services/logger.service';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    MessagesModule,
    RippleModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService, LoggerService, MessageService ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitting = false;
  messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  isControlInvalid(controlName: string): boolean | null {
    const control = this.loginForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    } else if (control?.hasError('email')) {
      return 'Formato de email inválido';
    } else if (control?.hasError('minlength')) {
      return `A senha precisa ter pelo menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  onSubmit() {
    this.isSubmitting = true;

    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;

      this.authService.login(loginRequest).subscribe({
        next: (tokenResponse) => {
          const roles = this.authService.getUserRoles();
          if (roles.includes('ROLE_SUPER_ADMIN')) {
            this.router.navigate(['/super-admin']);
          } else if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/petshop']);
          }
        },
        error: (err) => {
            this.messageService.add({
            severity: 'error',
            summary: 'Erro ',
            detail: 'Credenciais inválidas.',
            life: 5000, // Tempo de exibição em milissegundos
            styleClass: 'error-messages' // Classe CSS personalizada
            });
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      if (this.isControlInvalid('email')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.getErrorMessage('email'),
          life: 5000,
          styleClass: 'error-messages'
        });
      }
      if (this.isControlInvalid('password')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.getErrorMessage('password'),
          life: 5000,
          styleClass: 'error-messages'
        });
      }
      this.isSubmitting = false; 
    }
  }

}
