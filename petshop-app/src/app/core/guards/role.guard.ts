import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

/**
 * O RoleGuard verifica se o usuário possui as permissões necessárias para acessar uma rota.
 */
export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(LoggerService);

  const requiredRoles = route.data?.['roles'] as string[];

  try {
    logger.info('Verificando autenticação e autorização', { requiredRoles, route: route.url, state: state.url });
    if (authService.isAuthenticated()) {
      const userRoles = authService.getUserRoles();
      logger.debug('Roles do usuário obtidas', userRoles);

      const hasRole = requiredRoles.some(role => userRoles.includes(role));

      if (hasRole) {
        logger.info('Usuário autorizado', { userRoles, requiredRoles });
        return true;
      } else {
        logger.warn('Acesso negado: usuário não possui as permissões necessárias', { userRoles, requiredRoles });
        return router.createUrlTree(['/access-denied']);
      }
    } else {
      logger.warn('Usuário não autenticado, redirecionando para login');
      return router.createUrlTree(['/login']);
    }
  } catch (error) {
    logger.error('Erro ao verificar autorização ou autenticação', error);
    return router.createUrlTree(['/error']);
  }

};
