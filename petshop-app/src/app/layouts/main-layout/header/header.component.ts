import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { LoggerService } from '../../../core/services/logger.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // PrimeNG
        ButtonModule,
        RippleModule,
        StyleClassModule,
        MenuModule,
        MenubarModule,
        BadgeModule,
        AvatarModule,
        InputTextModule,
        TranslateModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [LoggerService, TranslateService]
})
export class HeaderComponent implements OnInit {

    items: MenuItem[] | undefined;
    isAuthenticated: boolean = false; // TODO: implementar a funcionalidade da autenticação para exibir os itens do menu
    isMenuVisible: boolean = false;
    selectedLanguage = 'pt';
    isDarkTheme: boolean = false;

    currentLang!: string;
    isLightMode = true;

    availableLanguages = [
        { code: 'pt', label: 'Português', imgSrc: '' },
        { code: 'en', label: 'English', imgSrc: '' },
        { code: 'es', label: 'Español', imgSrc: '' }
    ];

    constructor(
        private language: LanguageService,
        private themeService: ThemeService,
        private translate: TranslateService,
        private logger: LoggerService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.selectedLanguage = localStorage.getItem('language') || 'pt';
            this.translate.setDefaultLang(this.selectedLanguage);
            this.translate.use(this.selectedLanguage);
            this.logger.info('HeaderComponent inicializado com o idioma padrão', this.selectedLanguage);
        }
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Agenda',
                icon: 'pi pi-calendar',
                visible: this.isAuthenticated,
                routerLink: '/calendar'
            },
            {
                label: 'Meus Pets',
                icon: 'pi pi-chart-line',
                visible: this.isAuthenticated,
                routerLink: '/pet-list'
            },
            {
                label: 'Perfil',
                icon: 'pi pi-user',
                visible: this.isAuthenticated,
                routerLink: '/user-profile'
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-chart-line',
                visible: this.isAuthenticated,
                routerLink: '/dashboard'
            },
            {
                label: 'Configurações',
                icon: 'pi pi-cog',
                visible: this.isAuthenticated,
                routerLink: '/settings'
            }
        ];

        if (isPlatformBrowser(this.platformId)) {
            const theme = this.themeService.getTheme();
            document.querySelector('nav')?.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
        }

        if (isPlatformBrowser(this.platformId)) {
            this.currentLang = localStorage.getItem('language') || 'pt';
            console.log(`Idioma atual carregado do armazenamento local: ${this.currentLang}`);
        }

    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
        this.logger.info('Visibilidade do menu alternada', this.isMenuVisible);
    }

    changeLanguage(language: string) {
        if (isPlatformBrowser(this.platformId)) {
            this.selectedLanguage = language;
            localStorage.setItem('language', language);
            this.translate.use(language).subscribe({
                next: () => {
                    this.logger.info('Idioma alterado', language);
                },
                error: (error) => {
                    this.logger.error('Erro ao alterar idioma', error);
                }
            });
        }
    }

    getFilteredLanguages() {
        const filteredLanguages = this.availableLanguages.filter(lang => lang.code !== this.selectedLanguage);
        this.logger.info('Idiomas filtrados', filteredLanguages);
        return filteredLanguages;
    }

    scrollToSection(sectionId: string) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        this.logger.info('Rolado para a seção', sectionId);
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        const newTheme = this.isDarkTheme ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.logger.info('Tema alternado', newTheme);
    }

    toggleLanguage() {
        if (isPlatformBrowser(this.platformId)) {
            // Alterna entre PT, EN e ES
            this.currentLang = this.currentLang === 'pt' ? 'en' : this.currentLang === 'en' ? 'es' : 'pt';
            console.log(`Alternando para o idioma: ${this.currentLang}`);
            this.language.changeLanguage(this.currentLang);
        }
        console.log('Ambiente de renderização do lado do servidor detectado. Idioma não alterado.');
    }

    getLanguageLabel(): string {
        switch (this.currentLang) {
            case 'en': return 'EN';
            case 'es': return 'ES';
            case 'pt': return 'PT';
            default: return 'PT';
        }

    }

}
