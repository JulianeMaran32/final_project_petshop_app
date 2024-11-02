import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetComponent } from './pet/pet.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    PetComponent,
    PetFormComponent,
    PetListComponent
  ],
  exports: [
    PetComponent,
    PetFormComponent,
    PetListComponent
  ]
})
export class PetsModule { }
