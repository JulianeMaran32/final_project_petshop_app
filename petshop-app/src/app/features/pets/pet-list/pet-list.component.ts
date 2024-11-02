import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../../core/services/pet.service';
import { LoggerService } from '../../../core/services/logger.service';
import { Species } from '../../../shared/enums/species.enum';
import { Gender } from '../../../shared/enums/gender.enum';
import { PetRequest } from '../../../shared/models/pet/pet-request.model';
import { PetResponse } from '../../../shared/models/pet/pet-response.model';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    PetFormComponent,
    DialogModule,
    ConfirmDialogModule
  ],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  providers: [ PetService, LoggerService, ConfirmationService, MessageService],
})
export class PetListComponent implements OnInit {

  pets: PetResponse[] = [];
  searchTerm: string = '';
  displayPetForm: boolean = false;
  selectedPet: PetResponse | null = null;

  constructor(
    private petService: PetService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getPets().subscribe((data: PetResponse[]) => {
      this.pets = data;
    });
  }

  showPetFormDialog(): void {
    this.selectedPet = null;
    this.displayPetForm = true;
  }

  searchPets(): void {
    if (this.searchTerm) {
      this.pets = this.pets.filter(pet => pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.loadPets();
    }
  }

  editPet(pet: PetResponse): void {
    this.selectedPet = pet;
    this.displayPetForm = true;
  }

  confirmDeletePet(pet: PetResponse): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o pet ${pet.name}?`,
      accept: () => {
        this.deletePet(pet.id);
      }
    });
  }

  deletePet(petId: number): void {
    this.petService.deletePet(petId).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet excluído com sucesso' });
      this.loadPets();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o pet' });
    });
  }

  onSavePet(event: any): void {
    this.displayPetForm = false;
    this.loadPets();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pet salvo com sucesso' });
  }

  onCancelPet(): void {
    this.displayPetForm = false;
  }

}
