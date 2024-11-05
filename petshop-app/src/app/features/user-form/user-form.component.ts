import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../core/services/user.service';
import { UserRegistrationRequest } from '../../shared/models/user/user-register-request.model';
import { UserResponse } from '../../shared/models/user/user-response.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserService, LoggerService],
})
export class UserFormComponent {

  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{9,14}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirm_password: ['', [Validators.required]],
      isPetShopOwner: [false],
      isPetOwner: [false],
      agreeTerms: [false, Validators.requiredTrue],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirm_password')?.value ? null : { mismatch: true };
  }

  onRoleChange(selectedRole: string) {
    if (selectedRole === 'ADMIN') {
      this.userForm.patchValue({ isPetOwner: false, role: 'ADMIN' });
    } else if (selectedRole === 'CUSTOMER') {
      this.userForm.patchValue({ isPetShopOwner: false, role: 'CUSTOMER' });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userRegistrationRequest: UserRegistrationRequest = this.userForm.value;

      this.userService.registerUser(userRegistrationRequest).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
        },
        error: (error) => {
          console.error('Error registering user', error);
        }
      });
    }
  }

}
