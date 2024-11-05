import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * O Auth Interceptor adiciona o Token de Autenticação às requisições HTTP.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>, 
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const injector = inject(Injector);
  const authService = injector.get(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);

};
