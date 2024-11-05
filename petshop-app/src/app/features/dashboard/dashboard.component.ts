import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../core/services/logger.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { TranslateModule } from '@ngx-translate/core';
import { PetService } from '../../core/services/pet.service';
import { PetStatisticsResponse } from '../../shared/models/pet/pet-statistics-response.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ChartModule,
    RippleModule,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoggerService],
})
export class DashboardComponent {

  salesData: any;
  appointmentsData: any;
  clientsData: any;
  petsData: any;
  chartOptions: any;

  constructor(
    private logger: LoggerService,
    private petService: PetService,
  ) { }

  ngOnInit() {
    this.logger.info('Inicializando o DashboardComponent');
    this.loadPetsData();

    this.salesData = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Vendas',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#4CAF50',
          backgroundColor: '#4CAF50',
        }
      ]
    };

    this.appointmentsData = {
      labels: ['Serviços', 'Consultas'],
      datasets: [
        {
          label: 'Agendamentos de Serviços',
          backgroundColor: ['#FF6F61', '#4CAF50'],
          data: [250, 0],
        },
      ]
    };

    this.clientsData = {
      labels: ['Clientes Ativos', 'Clientes Inativos'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['#FF6F61', '#4CAF50']
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom'
      }
    };

    this.logger.info('Dados de vendas, agendamentos e clientes carregados');
  }

  loadPetsData() {
    this.logger.debug('Carregando dados de pets');
    this.petService.getPetStatistics().subscribe({
      next: (statistics) => {
        this.logger.debug('Dados de pets recebidos', statistics);
        const speciesCountMap = new Map<string, number>();
  
        statistics.forEach((stat: PetStatisticsResponse) => {
          if (speciesCountMap.has(stat.category)) {
            speciesCountMap.set(stat.category, speciesCountMap.get(stat.category)! + stat.count);
          } else {
            speciesCountMap.set(stat.category, stat.count);
          }
        });
  
        const petLabels = Array.from(speciesCountMap.keys());
        const petData = Array.from(speciesCountMap.values());
        const petColors = ['#FF6F61', '#4CAF50', '#FFC107', '#36A2EB', '#FFCE56']; // Ajuste as cores conforme necessário
  
        this.petsData = {
          labels: petLabels,
          datasets: [
            {
              data: petData,
              backgroundColor: petColors
            }
          ]
        };
      },
      error: (err) => {
        this.logger.error('Erro ao carregar dados de pets', err);
      }
    });
  }

}
