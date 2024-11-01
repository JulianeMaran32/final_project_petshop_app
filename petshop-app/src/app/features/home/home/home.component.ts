import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { HeaderComponent } from "../../../layouts/main-layout/header/header.component";
import { UserResponse } from '../../../shared/models/user/user-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    HeaderComponent,
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ AuthService, LoggerService ]
})
export class HomeComponent {





}
