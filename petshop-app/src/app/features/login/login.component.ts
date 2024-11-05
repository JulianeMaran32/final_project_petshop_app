import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoggerService } from '../../core/services/logger.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { LoginRequest } from '../../shared/models/auth/login-request.model';
import { TokenResponse } from '../../shared/models/auth/token-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, LoggerService],
})
export class LoginComponent {

  tokenResponse!: TokenResponse;

  email!: string;
  password!: string;
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private router: Router) { }

  onSubmit(): void {

    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password,
    }

    this.authService.login(loginRequest, this.rememberMe).subscribe({
      next: (response) => {
        this.tokenResponse = response;
        this.logger.info('Login bem-sucedido', this.tokenResponse);

        if (response.roles.includes('SUPER_ADMIN') || response.roles.includes('ADMIN')) {
          this.router.navigate(['dashboard']);
          console.log('Login realizado com sucesso para um administrador');
        } else if (response.roles.includes('CUSTOMER')) {
          this.router.navigate(['user-profile']);
          console.log('Login realizado com sucesso para um cliente');
        } else if (response.roles.includes('EMPLOYEE') || response.roles.includes('VETERINARIAN')) {
          console.log('Login realizado com sucesso para um funcionário ou veterinário');
          this.router.navigate(['scheduling']);
        }
      },
      error: (error) => {
        this.logger.error('Erro no login', error);
        this.errorMessage = error.error.message;
      }
    })

  }

}
