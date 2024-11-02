import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { PetFormComponent } from "../../pets/pet-form/pet-form.component";

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    DividerModule,
    FontAwesomeModule,
    RippleModule,
    PetFormComponent
],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  
  userProfileForm!: FormGroup;
  securityForm!: FormGroup;
  preferencesForm!: FormGroup;
  
  themes = [
    {label: 'Claro', value: 'light'}, 
    {label: 'Escuro', value: 'dark'}
  ];

  countries = [
    {label: 'Brasil', value: 'BR'}, 
    {label: 'Estados Unidos', value: 'US'}, 
    {label: 'Espanha', value: 'ES'}
  ];
  
  languages = [
    {label: 'Português', value: 'pt'}, 
    {label: 'Inglês', value: 'en'}, 
    {label: 'Espanhol', value: 'es'}
  ];

  constructor(private fb: FormBuilder) {}

  showPetForm = false;

  togglePetForm(): void {
    this.showPetForm = !this.showPetForm;
  }

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.preferencesForm = this.fb.group({
      emailNotifications: [false],
      theme: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  // Método auxiliar para verificar e exibir erros de validação
  isFieldInvalid(form: FormGroup, field: string): boolean {
    return !!(form.get(field)?.invalid && (form.get(field)?.dirty || form.get(field)?.touched));
  }

  // Lógica para exibir mensagens de erro personalizadas
  getFieldErrorMessage(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    } else if (control?.hasError('email')) {
      return 'Formato de e-mail inválido';
    } else if (control?.hasError('minlength')) {
      return `Deve ter pelo menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    } else if (control?.hasError('pattern')) {
      return 'Formato inválido';
    }
    return '';
  }

  // Método de envio de formulário, onde você pode implementar a lógica de atualização do usuário
  onSubmitProfile() {
    if (this.userProfileForm.valid) {
      // Enviar informações do perfil
      console.log(this.userProfileForm.value);
    }
  }

  onSubmitSecurity() {
    if (this.securityForm.valid) {
      // Enviar informações de segurança
      console.log(this.securityForm.value);
    }
  }

  onSubmitPreferences() {
    if (this.preferencesForm.valid) {
      // Enviar preferências do usuário
      console.log(this.preferencesForm.value);
    }
  }


}
