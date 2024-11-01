import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetshopCalendarComponent } from './petshop-calendar/petshop-calendar.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    PetshopCalendarComponent,
    EventDialogComponent
  ]
})
export class CalendarModule { }
