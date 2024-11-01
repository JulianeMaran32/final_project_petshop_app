import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContactService } from '../../../core/services/contact.service';
import { ContactForm } from '../../../shared/models/contact/contact-form.model';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    MessagesModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [ ContactService, LoggerService, MessageService ]
})
export class ContactComponent {

  contactForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService, 
    private logger: LoggerService,
    private messageService: MessageService) {}

  ngOnInit(): void {
      this.logger.info('ContactComponent initialized');
      this.contactForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
      });
  }

  onSubmit(): void {
      if (this.contactForm.valid) {
          this.isSubmitting = true;
          const contactFormValue: ContactForm = this.contactForm.value;
          this.logger.info('Submitting contact form', contactFormValue);
          this.contactService.sendContactEmail(contactFormValue).subscribe({
              next: () => {
                  this.logger.info('Email sent successfully');
                  this.messageService.add({severity: 'success', summary: 'Success', detail: 'Email sent successfully'});
                  this.isSubmitting = false;
                  this.contactForm.reset();
              },
              error: (error) => {
                  this.logger.error('Error sending email', error);
                  this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error sending email'});
                  this.isSubmitting = false;
              }
          });
      } else {
          this.logger.warn('Contact form is invalid', this.contactForm.errors);
      }
  }

}
