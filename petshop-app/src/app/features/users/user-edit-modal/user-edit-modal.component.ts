import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UserService } from '../../../core/services/user.service';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, 
    InputTextModule, InputTextareaModule,
    ButtonModule, FileUploadModule, DialogModule,
  ],
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
  providers: [UserService, LoggerService]
})
export class UserEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>(); // Adicione isso
  @Input() user: any;
  @Output() userUpdated = new EventEmitter<any>();
  
  updatedUser: any;

  ngOnInit() {
    this.updatedUser = { ...this.user };
  }

  ngOnChanges(changes: SimpleChanges) {
    // Verifica se o usuário foi alterado e atualiza updatedUser
    if (changes['user']) {
      this.updatedUser = { ...this.user };
    }
  }
  
  saveChanges() {
    this.userUpdated.emit(this.updatedUser);
  }

  closeModal() {
    this.visible = false; // Atualiza a variável visible
    this.visibleChange.emit(this.visible); // Emite a mudança
  }

}