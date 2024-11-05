import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { LoginRequest } from '../../shared/models/auth/login-request.model';
import { TokenResponse } from '../../shared/models/auth/token-response.model';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../shared/models/user/user-response.model';
import { LoggerService } from './logger.service';

/**
 * O AuthService gerencia a autenticação do usuário, realizando login, logout e verificando se o usuário está autenticado.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/auth`;

  private currentUserSubject!: BehaviorSubject<TokenResponse | null>;
  public currentUser!: Observable<TokenResponse | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private logger: LoggerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedUser = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<TokenResponse | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('authToken');
      const isAuthenticated = !!token;
      this.logger.debug('Verificando se o usuário está autenticado', { isAuthenticated });
      return isAuthenticated;
    }
    return false;
  }

  getUserRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = sessionStorage.getItem('userRoles');
      this.logger.info('Carregando papéis do usuário', roles);
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }

  login(loginRequest: LoginRequest, rememberMe: boolean): Observable<TokenResponse> {
    this.logger.info('Iniciando login', { email: loginRequest.email });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': `XSRF-TOKEN=${this.getXsrfToken()}`
    });

    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, loginRequest, { headers })
      .pipe(
        tap((response: TokenResponse) => {
          this.logger.info('Login realizado com sucesso', response);
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('authToken', response.auth_token);
            sessionStorage.setItem('userRoles', JSON.stringify(response.roles));
            sessionStorage.setItem('currentUser', JSON.stringify(response));

            if (rememberMe) {
              this.setRememberMeCookie(response.auth_token);
            }

            this.redirectBasedOnRole(response.roles);
          }
        }),
        catchError(this.handleError<TokenResponse>('login'))
      );
  }

  getCurrentUser(): Observable<UserResponse> {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      return throwError(() => new Error('Usuário não autenticado ou token expirado.'));
    }
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.logger.info('Usuário carregado do sessionStorage');
      return of(JSON.parse(storedUser));
    }
    return this.http.get<UserResponse>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((userResponse: UserResponse) => {
        this.logger.info('Dados do usuário carregados com sucesso', userResponse);
        sessionStorage.setItem('currentUser', JSON.stringify(userResponse));
      }),
      catchError(this.handleError<UserResponse>('getCurrentUser'))
    );
  }

  logout(): void {
    this.logger.info('Logout realizado, removendo informações do usuário');
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userRoles');
      sessionStorage.removeItem('currentUser');
      this.deleteRememberMeCookie();
    }
    this.router.navigate(['/']);
  }

  private getXsrfToken(): string {
    const cookies = document.cookie.split(';');
    const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
    const xsrfToken = xsrfCookie ? xsrfCookie.split('=')[1] : '';
    this.logger.debug('Obtendo XSRF token', { xsrfToken });
    return xsrfToken;
  }

  getToken(): string {
    const token = sessionStorage.getItem('authToken') || this.getRememberMeCookie() || '';
    this.logger.debug('Recuperando token de autenticação', { token });
    return token;
  }

  private setRememberMeCookie(token: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 dias
    document.cookie = `authToken=${token}; expires=${date.toUTCString()}; path=/; Secure; HttpOnly`;
  }

  private getRememberMeCookie(): string | null {
    const cookies = document.cookie.split(';');
    const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
    return authTokenCookie ? authTokenCookie.split('=')[1] : null;
  }

  private deleteRememberMeCookie(): void {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; HttpOnly';
  }

  private redirectBasedOnRole(roles: string[]): void {
    if (roles.includes('SUPER_ADMIN') || roles.includes('ADMIN')) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/user-profile']);
    }
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      this.logger.error(`${operation} falhou`, error);

      let errorMessage = 'Ocorreu um erro inesperado.';

      if (error.error instanceof ErrorEvent) {
        this.logger.error('Erro no cliente', error.error.message);
        errorMessage = `Erro no cliente: ${error.error.message}`;
      } else {
        this.logger.error(`Erro no servidor. Código: ${error.status}, Mensagem: ${error.message}`);
        if (error.status === 401) {
          errorMessage = 'Não autorizado. Por favor, faça login novamente.';
          this.logout();
        } else if (error.status === 403) {
          errorMessage = 'Acesso negado. Você não tem permissão para realizar essa ação.';
        } else if (error.status === 500) {
          errorMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
        }
      }
      return throwError(() => new Error(errorMessage));
    };
  }

}