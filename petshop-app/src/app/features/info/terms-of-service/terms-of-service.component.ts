import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule
  ],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.scss'
})
export class TermsOfServiceComponent {
  
  lastUpdatedDate: string = this.getLastUpdatedDate(); 
  author: string = 'Juliane Maran'; 
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  private getLastUpdatedDate(): string {
    const date = new Date();
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

}
