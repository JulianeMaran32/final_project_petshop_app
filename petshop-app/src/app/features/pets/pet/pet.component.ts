import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../../core/services/pet.service';
import { LoggerService } from '../../../core/services/logger.service';
import { Species } from '../../../shared/enums/species.enum';
import { Gender } from '../../../shared/enums/gender.enum';
import { PetRequest } from '../../../shared/models/pet/pet-request.model';
import { PetResponse } from '../../../shared/models/pet/pet-response.model';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  providers: [ PetService, LoggerService],
})
export class PetComponent implements OnInit {

  pets: PetResponse[] = [];
  newPet!: PetRequest;

  genders = Object.values(Gender);
  speciesList = Object.values(Species);

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getPets().subscribe((data: PetResponse[]) => {
      this.pets = data;
    });
  }

  addPet(): void {
    this.petService.createPet(this.newPet).subscribe((pet: PetResponse) => {
      this.pets.push(pet);
      this.newPet = {
        name: '',
        species: Species.DOG,
        breed: '',
        birth_date: new Date(),
        color: '',
        size: '',
        gender: Gender.MALE,
        castrated: false,
        weight: 0,
        health_history: ''
      };
    });
  }

  updatePet(pet: PetResponse): void {
    this.petService.updatePet(pet.id!, pet).subscribe((updatedPet: PetResponse) => {
      const index = this.pets.findIndex(p => p.id === updatedPet.id);
      if (index !== -1) {
        this.pets[index] = updatedPet;
      }
    });
  }

  deletePet(petId: number): void {
    this.petService.deletePet(petId).subscribe(() => {
      this.pets = this.pets.filter(p => p.id !== petId);
    });
  }

}
