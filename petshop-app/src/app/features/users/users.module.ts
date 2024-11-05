import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from '../../core/services/user.service';
import { LoggerService } from '../../core/services/logger.service';
import { AuthService } from '../../core/services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileComponent,
    TabViewModule,
  ],
  exports: [
    UserProfileComponent
  ],
  providers: [UserService, LoggerService, AuthService],
})
export class UsersModule { }
