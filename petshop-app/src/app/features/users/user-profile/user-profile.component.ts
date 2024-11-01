import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserEditModalComponent } from "../user-edit-modal/user-edit-modal.component";
import { UserService } from '../../../core/services/user.service';
import { LoggerService } from '../../../core/services/logger.service';
import { UserResponse } from '../../../shared/models/user/user-response.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    ButtonModule,
    UserEditModalComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService, LoggerService]
})
export class UserProfileComponent {

  user = {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '1234-5678'
  };

  displayEditModal = false;

  openEditModal() {
    this.displayEditModal = true;
  }

  updateUser(updatedUser: any) {
    this.user = { ...this.user, ...updatedUser };
    this.displayEditModal = false;
  }
  
}
