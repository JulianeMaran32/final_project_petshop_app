import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    ButtonModule
  ],
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>(); // Adicionar @Output para displayChange
  @Input() event: any = {};
  @Input() mode: 'add' | 'edit' = 'add'; // Propriedade para diferenciar entre os modos
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>(); // Evento para deletar

  save() {
    this.onSave.emit(this.event);
    this.display = false;
    this.displayChange.emit(this.display); // Emitir displayChange
  }

  cancel() {
    this.onCancel.emit();
    this.display = false;
    this.displayChange.emit(this.display); // Emitir displayChange
  }

  delete() {
    this.onDelete.emit();
    this.display = false;
    this.displayChange.emit(this.display); // Emitir displayChange
  }

}
