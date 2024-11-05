import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from './logger.service';

/**
 * Gerenciamento da lógica de internacionalização.
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translateService: TranslateService,
    private logger: LoggerService,
  ) {
    if (typeof window !== 'undefined') {
      const language = localStorage.getItem('language') || 'pt';
      this.logger.info('Inicializando serviço de idioma', { language });
      this.changeLanguage(language);
    }
  }

  changeLanguage(language: string) {
    if (typeof window !== 'undefined') {
      this.translateService.use(language);
      localStorage.setItem('language', language);
      this.logger.info('Idioma alterado', { language });
    }
  }

  get currentLanguage() {
    const currentLang = this.translateService.currentLang;
    this.logger.debug('Idioma atual recuperado', { currentLang });
    return currentLang;
  }
  
}
