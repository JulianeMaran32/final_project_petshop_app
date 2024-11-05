import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { UserService } from '../../../core/services/user.service';
import { TabViewModule } from 'primeng/tabview';
import { AuthService } from '../../../core/services/auth.service';
import { UserResponse } from '../../../shared/models/user/user-response.model';
import { ProfilePictureComponent } from "../../profile-picture/profile-picture.component";
import { UploadComponent } from '../../upload/upload.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    ProfilePictureComponent,
    UploadComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService, LoggerService, AuthService],
})
export class UserProfileComponent implements OnInit {

  user!: UserResponse;

  constructor(
    private authService: AuthService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user: UserResponse) => {
        this.user = user;
        this.logger.info('Dados do usuário carregados com sucesso', user);
      },
      error: (error) => {
        this.logger.error('Erro ao carregar dados do usuário', error);
      }
    });
  }

  onUploadComplete(url: string): void {
    this.user.profilePic = url;
    this.logger.info('Foto do perfil atualizada com sucesso', url);
  }

}
