import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layouts/main-layout/header/header.component";
import { FooterComponent } from "./layouts/main-layout/footer/footer.component";
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from './core/services/logger.service';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PrimeNGConfig, LoggerService, TranslateService]
})
export class AppComponent implements OnInit {

  title = 'petshop-app';

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private logger: LoggerService,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.logger.info('Inicializando o componente AppComponent');
    this.config.ripple = true;
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng').subscribe({
      next: res => {
        this.config.setTranslation(res);
        this.logger.info('Traduções do PrimeNG configuradas', res);
      },
      error: error => {
        this.logger.error('Erro ao configurar traduções do PrimeNG', error);
      }
    });
  }

  toggleTheme() {
    this.logger.info('Alternando tema');
    this.themeService.toggleTheme();
  }

  changeLanguage(language: string) {
    this.logger.info(`Mudando idioma para ${language}`);
    this.languageService.changeLanguage(language);
  }

  // get isDarkMode() {
  //   const isDark = this.themeService.currentTheme === 'dark';
  //   this.logger.debug('Verificando se o tema atual é escuro', { isDark });
  //   return isDark;
  // }

  // get currentLanguage() {
  //   const currentLang = this.languageService.currentLanguage;
  //   this.logger.debug('Obtendo idioma atual', { currentLang });
  //   return currentLang;
  // }

}
