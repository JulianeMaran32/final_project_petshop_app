import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../../core/services/pet.service';
import { LoggerService } from '../../../core/services/logger.service';
import { Species } from '../../../shared/enums/species.enum';
import { Gender } from '../../../shared/enums/gender.enum';
import { PetRequest } from '../../../shared/models/pet/pet-request.model';
import { PetResponse } from '../../../shared/models/pet/pet-response.model';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
  ],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
  providers: [ PetService, LoggerService],
})
export class PetFormComponent implements OnInit {

  @Input() pet: PetResponse | null = null;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  petForm: FormGroup;
  genders = Object.values(Gender);
  speciesList = Object.values(Species);

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: [''],
      birth_date: [''],
      color: [''],
      size: [''],
      gender: ['', Validators.required],
      castrated: [false],
      weight: [0],
      health_history: ['']
    });
  }

  ngOnInit(): void {
    if (this.pet) {
      this.petForm.patchValue(this.pet);
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const petRequest: PetRequest = this.petForm.value;
      if ((petRequest as any).id) {
        this.petService.updatePet((petRequest as any).id, petRequest).subscribe({
          next: response => {
            this.save.emit();
          },
          error: error => {
            console.error('Erro ao atualizar o pet', error);
          }
        });
      } else {
        this.petService.createPet(petRequest).subscribe({
          next: response => {
            this.save.emit();
          },
          error: error => {
            console.error('Erro ao cadastrar o pet', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.petForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}
