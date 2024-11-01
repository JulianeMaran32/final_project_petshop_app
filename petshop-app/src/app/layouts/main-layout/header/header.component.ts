import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { UserResponse } from '../../../shared/models/user/user-response.model';
import { LoggerService } from '../../../core/services/logger.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { WindowService } from '../../../core/services/window.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ AuthService, LoggerService, WindowService ]
})
export class HeaderComponent implements OnInit {

  user!: UserResponse;
  isAuthenticated: boolean = false;
  isMenuOpen: boolean = false;
  dropdownStates: { [key: string]: boolean } = {};

  constructor(
    private authService: AuthService, 
    private logger: LoggerService,
    private windowService: WindowService) {}

  ngOnInit(): void {
    this.logger.info('Inicializando o componente de cabeçalho');
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) { 
      this.loadUserProfile(); 
    } else {
      this.logger.warn('Usuário não autenticado, redirecionando para login.');
      this.authService.logout(); 
    }
     // Observa as alterações de tamanho da tela
     this.windowService.onResize().subscribe((width) => {
      if (width > 768) {
        this.isMenuOpen = false;
      }
    });
  }

  loadUserProfile(): void {
    this.logger.info('Carregando perfil do usuário');
    this.authService.getCurrentUser().subscribe({
      next: (userResponse: UserResponse) => {
        this.user = userResponse; 
        this.logger.info('Dados do usuário carregados', this.user);
      },
      error: (error) => {
        this.logger.error('Erro ao carregar dados do usuário', error); 
      }
    });
  }

  hasRole(role: string): boolean {
    this.logger.debug(`Verificando se o usuário tem a função: ${role}`);
    return this.authService.getUserRoles().includes(role);
  }

  logout(): void {
    this.logger.info('Usuário solicitou logout');
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.logger.debug(`Menu ${this.isMenuOpen ? 'aberto' : 'fechado'}`);
  }

  toggleDropdown(event: Event, dropdown: string): void {
    event.preventDefault();
    this.dropdownStates[dropdown] = !this.dropdownStates[dropdown];
    this.logger.debug(`Dropdown ${dropdown} ${this.dropdownStates[dropdown] ? 'aberto' : 'fechado'}`);
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.dropdownStates[dropdown] || false;
  }

 
}
