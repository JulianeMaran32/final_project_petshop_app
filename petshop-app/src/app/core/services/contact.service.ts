import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactForm } from '../../shared/models/contact/contact-form.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = `${environment.apiUrl}/api`;

  constructor(
    private http: HttpClient, 
    private logger: LoggerService,
  ) { }

  sendContactEmail(contactForm: ContactForm): Observable<void> {
    const url = `${this.apiUrl}/contacts`;
    const headers = { 'Content-Type': 'application/json' };
    this.logger.info('Enviando email de contato', contactForm);
    return this.http.post<void>(url, contactForm, { headers }).pipe(
      tap({
        next: () => this.logger.info('Email de contato enviado com sucesso'),
        error: (error) => this.logger.error('Falha ao enviar email de contato', error)
      })
    );
  }

}
