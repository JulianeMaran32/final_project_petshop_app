import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LoggerService } from '../services/logger.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService); 

  try {
    logger.info('Verificando autenticação do usuário', { route: route.url, state: state.url });

    if (authService.isAuthenticated()) {
      logger.info('Usuário autenticado, acesso permitido', { route: route.url });
      return true;
    } else {
      logger.warn('Usuário não autenticado, redirecionando para login', { route: route.url });
      return router.createUrlTree(['/login']);
    }

  } catch (error) {
    logger.error('Erro durante a verificação de autenticação', error);
    return router.createUrlTree(['/error']);
  }

};