import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoggerService } from './logger.service';
import { isPlatformBrowser } from '@angular/common';

/**
 * Gerenciamento da lógica de Temas.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isBrowser: boolean;

  constructor(
    private logger: LoggerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.applyStoredTheme();
  }

  toggleTheme() {
    if (this.isBrowser) {
      const currentTheme = localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.body.classList.remove('light-mode', 'dark-mode');
      document.body.classList.add(newTheme === 'light' ? 'light-mode' : 'dark-mode');
      console.log(`Tema alternado para: ${newTheme}`);
    }
  }

  getTheme(): string {
    if (this.isBrowser) {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  }

  private applyStoredTheme() {
    if (this.isBrowser) {
      const theme = this.getTheme();
      document.body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
    }
  }

}
