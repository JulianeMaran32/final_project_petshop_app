import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment.service';
import { CommonModule } from '@angular/common';
import { PetService } from '../../../core/services/pet.service';
import { PetResponse } from '../../../shared/models/pet/pet-response.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  providers: [AppointmentService]
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm: FormGroup;
  pets: PetResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      petId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      veterinarian: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getPets().subscribe((pets) => {
      this.pets = pets;
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe({
        next: (response) => {
          console.log('Appointment saved successfully', response);
        },
        error: (error) => {
          console.error('Error saving appointment', error);
        }
      });
    }
  }

}