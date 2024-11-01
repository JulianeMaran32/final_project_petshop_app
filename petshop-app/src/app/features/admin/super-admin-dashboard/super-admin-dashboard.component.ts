import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { UserResponse } from '../../../shared/models/user/user-response.model';
import { LoggerService } from '../../../core/services/logger.service';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    StyleClassModule
  ],
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss'],
  providers: [ AuthService, LoggerService ]
})
export class SuperAdminDashboardComponent implements OnInit {

  user!: UserResponse;
  isVisible = false;
  isSidebarVisible = false;
  isCustomerMenuVisible = false;
  isSearchSubMenuVisible = false;

  constructor(private authService: AuthService, private logger: LoggerService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) { 
      this.loadUserProfile(); 
    } else {
      this.logger.warn('Usuário não autenticado, redirecionando para login.');
      this.authService.logout(); 
    }
  }

  loadUserProfile(): void {
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

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleCustomerMenu() {
    this.isCustomerMenuVisible = !this.isCustomerMenuVisible;
  }

  toggleSearchSubMenu() {
    this.isSearchSubMenuVisible = !this.isSearchSubMenuVisible;
  }

}
