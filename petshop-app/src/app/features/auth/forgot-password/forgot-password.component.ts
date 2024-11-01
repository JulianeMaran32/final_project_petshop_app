import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { PasswordService } from '../../../core/services/password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    MessagesModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ PasswordService, LoggerService, MessageService ]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private logger: LoggerService,
    private messageService: MessageService,
    @Inject(PasswordService) private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.logger.info('Inicializando o componente de recuperação de senha');
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.logger.warn('Formulário de recuperação de senha inválido');
      this.messageService.add({
        severity: 'error', 
        summary: 'Erro', 
        detail: 'Por favor, insira um e-mail válido.'
      });
      return;
    }

    this.isSubmitting = true;
    const email = this.forgotPasswordForm.get('email')?.value;
    this.logger.info('Solicitação de recuperação de senha enviada', { email });

    this.passwordService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.logger.info('E-mail de recuperação de senha enviado com sucesso', { response });
        this.messageService.add({
          severity: 'success', 
          summary: 'Sucesso', 
          detail: response
        });
        this.router.navigate(['/reset-password']); 
      },
      error: (error) => {
        this.isSubmitting = false;
        this.logger.error('Falha ao enviar e-mail de recuperação', error);
        this.messageService.add({
          severity: 'error', 
          summary: 'Erro', 
          detail: 'Falha ao enviar e-mail de recuperação.'});
      }
    });
  }

  isControlInvalid(controlName: string): boolean | null {
    const control = this.forgotPasswordForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.forgotPasswordForm.get(controlName);
    if (control?.hasError('required')) {
      return 'E-mail é obrigatório';
    } else if (control?.hasError('email')) {
      return 'E-mail inválido';
    }
    return '';
  }

}