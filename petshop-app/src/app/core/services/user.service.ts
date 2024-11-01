import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UserResponse } from '../../shared/models/user/user-response.model';
import { UserRegistrationRequest } from '../../shared/models/user/user-register-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  register(user: UserRegistrationRequest): Observable<UserResponse> {
    const url = `${this.apiUrl}/register`;

    return this.http.post<UserResponse>(url, user).pipe(
      catchError(this.handleError)
    );
  }

  getUser(): Observable<UserResponse> {
    const mockUser: UserResponse = {
      id: 1,
      name: 'Usuário Exemplo',
      cpf: '000.000.000-00',
      email: 'usuario@exemplo.com',
      phone: '0000-0000',
      bio: 'Biografia do usuário',
      image: 'https://example.com/image.jpg'
    };

    return of(mockUser); // Retorna o mockUser como um Observable
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';
    if (error.status === 400) {
      errorMessage = 'Erro de validação: verifique os dados informados';
    } else if (error.status === 409) {
      errorMessage = 'Usuário com CPF ou Email já cadastrado, ou senhas não coincidem';
    } else if (error.status === 500) {
      errorMessage = 'Erro interno do servidor, tente novamente mais tarde';
    }
    console.error(`Erro ${error.status}: ${errorMessage}`, error);
    return throwError(() => new Error(errorMessage));
  }

}
