import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PasswordService } from '../../../core/services/password.service';
import { LoggerService } from '../../../core/services/logger.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    MessagesModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ PasswordService, LoggerService, MessageService ]
})
export class ResetPasswordComponent {

  token: string = '';
  newPassword: string = '';

  constructor(
    private router: Router,
    private logger: LoggerService,
    private messageService: MessageService,
    private passwordService: PasswordService
  ) {}

  onSubmit() {
    if (this.token && this.newPassword) {
      this.passwordService.resetPassword(this.token, this.newPassword).subscribe({
        next: (response) => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Password reset successfully' });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.logger.error('Password reset failed', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Password reset failed' });
        }
      });
    } else {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Warning', 
        detail: 'Please fill in all fields' });
    }
  }
}
