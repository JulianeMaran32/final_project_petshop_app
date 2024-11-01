import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const logger = inject(LoggerService); 
  const token = sessionStorage.getItem('authToken');

  logger.info('Interceptando requisição HTTP', { 
    url: req.url, method: req.method 
  });

  let clonedRequest = req;

  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    logger.debug('Token adicionado ao cabeçalho da requisição', { token });
  }

  return next(clonedRequest).pipe(
    tap({
      next: (event) => {
        logger.info('Requisição processada com sucesso', { url: req.url });
      }
    }),
    catchError((error: HttpErrorResponse) => {
      logger.error('Erro durante o processamento da requisição', { 
        url: req.url, 
        status: error.status, 
        message: error.message 
      });
      return throwError(() => new Error(error.message));
    })
  );
  
};
