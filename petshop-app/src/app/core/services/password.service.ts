import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  forgotPassword(email: string): Observable<string> {
    this.logger.info('Iniciando processo de recuperação de senha', { email });
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/x-www-form-urlencoded' 
    });
    const body = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}/forgot-password`, body.toString(), { headers, responseType: 'text' }).pipe(
      tap(
        () => this.logger.info('Solicitação de recuperação de senha enviada', { email })
      ),
      catchError(error => {
        this.logger.error('Falha na solicitação de recuperação de senha', error);
        throw error;
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    this.logger.info('Iniciando processo de redefinição de senha', { token });
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/x-www-form-urlencoded' 
    });
    const body = new HttpParams()
      .set('token', token)
      .set('newPassword', newPassword);
    return this.http.post(`${this.apiUrl}/reset-password`, body.toString(), { headers, responseType: 'text' }).pipe(
      tap(() => this.logger.info('Solicitação de redefinição de senha enviada', { token })),
      catchError(error => {
        this.logger.error('Falha na solicitação de redefinição de senha', error);
        throw error;
      })
    );
  }

}
