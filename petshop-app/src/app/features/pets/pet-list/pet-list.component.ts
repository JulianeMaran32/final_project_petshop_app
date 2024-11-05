import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PetResponse } from '../../../shared/models/pet/pet-response.model';
import { PetService } from '../../../core/services/pet.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule, RouterModule,
    TableModule, DialogModule,
    RippleModule, ButtonModule,
    ToastModule, ToolbarModule,
    ConfirmDialogModule, InputTextModule,
    InputTextareaModule, FileUploadModule,
    DropdownModule, TagModule,
    RadioButtonModule, RatingModule,
    InputTextModule, InputNumberModule
  ],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  providers: [MessageService, ConfirmationService, PetService]
})
export class PetListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  
  petDialog: boolean = false;

  pets!: PetResponse[];

  pet!: PetResponse;

  selectedPets!: PetResponse[] | null;

  submitted: boolean = false;

  constructor(
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.petService.getPets().subscribe((data) => (this.pets = data));
  }

  onGlobalFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.dt?.filterGlobal(inputElement.value, 'contains');
  }

  openNew() {
    this.pet = {} as PetResponse;
    this.submitted = false;
    this.petDialog = true;
  }

  deleteSelectedPets() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir os pets selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedPets?.forEach(pet => {
          this.petService.deletePet(pet.id).subscribe(() => {
            this.pets = this.pets.filter(val => val.id !== pet.id);
          });
        });
        this.selectedPets = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pets Excluídos.',
          life: 3000
        });
      }
    });
  }

  viewPet(pet: PetResponse) {
    this.pet = { ...pet };
    this.petDialog = true;
  }

  editPet(pet: PetResponse) {
    this.pet = { ...pet };
    this.petDialog = true;
  }
  deletePet(pet: PetResponse) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir ' + pet.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.petService.deletePet(pet.id).subscribe(() => {
          this.pets = this.pets.filter(val => val.id !== pet.id);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet Excluído', life: 3000 });
        });
      }
    });
  }

  hideDialog() {
    this.petDialog = false;
    this.submitted = false;
  }

  savePet() {
    this.submitted = true;

    if (this.pet.name?.trim()) {
      if (this.pet.id) {
        this.petService.updatePet(this.pet.id, this.pet).subscribe(updatedPet => {
          this.pets[this.findIndexById(this.pet.id)] = updatedPet;
          this.messageService.add({
            severity: 'success', summary: 'Successful', detail: 'Pet atualizado!', life: 3000
          });
        });
      } else {
        this.petService.createPet(this.pet).subscribe(createdPet => {
          this.pets.push(createdPet);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet cadastrado!', life: 3000 });
        });
      }

      this.pets = [...this.pets];
      this.petDialog = false;
      this.pet = {} as PetResponse;
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.pets.length; i++) {
      if (this.pets[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
