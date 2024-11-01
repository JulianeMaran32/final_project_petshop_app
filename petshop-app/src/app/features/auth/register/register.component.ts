import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserResponse } from '../../../shared/models/user/user-response.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UserRegistrationRequest } from '../../../shared/models/user/user-register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    ButtonModule    
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    UserService
  ]
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, this.cpfValidator()]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{9,14}$/)]],
      password: ['', [Validators.required, this.passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  showTermsDialog() {
    this.visible = true;
  }

  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;
      const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      return cpfPattern.test(value) && this.isValidCPF(value) ? null : { invalidCPF: true };
    };
  }

  isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    return remainder === parseInt(cpf.substring(10, 11));
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      return hasUpperCase && hasLowerCase && hasNumber && value.length >= 8 ? null : { passwordStrength: true };
    };
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.invalid && (control.dirty || control.touched));
  }
  
  isControlValid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.valid && (control.dirty || control.touched)); 
  }
  
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'Este campo é obrigatório.';
      if (control.errors['invalidCPF']) return 'Informe um CPF válido.';
      if (control.errors['email']) return 'Informe um e-mail válido.';
      if (control.errors['pattern']) return 'Informe um telefone válido.';
      if (control.errors['passwordStrength']) return 'Senha deve ter ao menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.';
      if (control.errors['passwordsMismatch']) return 'As senhas não coincidem.';
    }
    return '';
  }

  onRegister(): void {
    if (this.registerForm.valid) {
        this.isSubmitting = true;
        this.errorMessage = '';
        this.successMessage = '';

         // Declare userType como let para permitir reatribuição
         const formUserType: "customer" | "owner" = this.registerForm.value.userType;

         // Variável para o valor ajustado que o backend espera
         let userType: "CUSTOMER" | "OWNER";
 
         // Verificar se formUserType é válido e mapear para o que o backend espera
         if (formUserType === 'customer') {
             userType = 'CUSTOMER'; // Para o que o backend espera
         } else if (formUserType === 'owner') {
             userType = 'OWNER'; // Para o que o backend espera
         } else {
             this.errorMessage = 'Tipo de usuário inválido.';
             return;
         } 

        const userRequest: UserRegistrationRequest = {
            name: this.registerForm.value.name,
            cpf: this.registerForm.value.cpf,
            email: this.registerForm.value.email,
            phone: this.registerForm.value.phone,
            password: this.registerForm.value.password,
            confirm_password: this.registerForm.value.confirmPassword,
            userType: userType // Aqui você pode usar o valor que foi ajustado
        };

        this.userService.register(userRequest).subscribe({
            next: (response: UserResponse) => {
                this.successMessage = 'Cadastro realizado com sucesso!';
                this.isSubmitting = false;
                this.registerForm.reset();
                this.router.navigate(['/login']);
            },
            error: (error: Error) => {
                this.errorMessage = error.message;
                this.isSubmitting = false;
            }
        });
    } 
    this.registerForm.markAllAsTouched();
}


}