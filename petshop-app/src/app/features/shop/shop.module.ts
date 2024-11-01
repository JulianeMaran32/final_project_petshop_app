import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetshopComponent } from './petshop/petshop.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CarouselModule,
    ButtonModule,
    InputTextModule,
    ImageModule,
    TagModule,
    RatingModule,
    PetshopComponent
  ],
  exports: [
    PetshopComponent
  ]
})
export class ShopModule { }
