import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    FileUploadModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    UserProfileComponent,
    UserEditModalComponent,
    UserSettingsComponent
  ],
  exports: [
    UserProfileComponent,
    UserEditModalComponent,
    UserSettingsComponent
  ]
})
export class UsersModule { }
