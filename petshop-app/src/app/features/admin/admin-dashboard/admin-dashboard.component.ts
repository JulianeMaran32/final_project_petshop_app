import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { UserResponse } from '../../../shared/models/user/user-response.model';
import { LoggerService } from '../../../core/services/logger.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ 
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule, 
    TableModule, 
    ChartModule, 
    CalendarModule 
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [AuthService, LoggerService]
})
export class AdminDashboardComponent implements OnInit {

  user!: UserResponse; 
  salesData: any;
  stockData: any[] = [];
  appointmentsData: any[] = [];
  employeesData: any[] = [];
  clientsData: any[] = [];
  veterinariansData: any[] = [];
  selectedDate!: Date;

  // New properties for additional metrics
  activeUsers: number = 0;
  inactiveUsers: number = 0;
  totalProductsInStock: number = 0;
  totalCashPerDay: number = 0;
  totalBathAppointments: number = 0;
  totalGroomingAppointments: number = 0;
  totalBathAndGroomingAppointments: number = 0;
  totalVetAppointments: number = 0;
  totalVaccinesAdministered: number = 0;
  totalPetsRegistered: number = 0;
  totalCustomers: number = 0;
  totalEmployees: number = 0;
  totalVeterinarians: number = 0;

  constructor(private authService: AuthService, 
    private logger: LoggerService,
    private router: Router) { } 

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadSalesData();
    this.loadStockData();
    this.loadAppointmentsData();
    this.loadEmployeesData();
    this.loadClientsData();
    this.loadVeterinariansData();
    this.loadAdditionalMetrics(); // Load additional metrics
  }

  loadUserProfile(): void {
    this.authService.getCurrentUser().subscribe({
      next: (userResponse: UserResponse) => {
        this.user = userResponse;
        this.logger.info('Dados do usuário carregados', this.user); 
      },
      error: (error) => {
        this.logger.error('Erro ao carregar dados do usuário', error); 
      }
    });
  }

  loadSalesData() {
    this.salesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Vendas',
          data: [300, 500, 200, 400],
          backgroundColor: '#FF6F61'
        }
      ]
    };
  }

  loadStockData() {
    this.stockData = [
      { product: 'Ração', quantity: 50 },
      { product: 'Coleiras', quantity: 100 }
    ];
    this.totalProductsInStock = this.stockData.reduce((total, item) => total + item.quantity, 0);
  }

  loadAppointmentsData() {
    this.appointmentsData = [
      // Dados dos agendamentos (por exemplo, veterinários e clientes)
    ];
    // Calculate total appointments
    this.totalBathAppointments = this.appointmentsData.filter(a => a.type === 'Banho').length;
    this.totalGroomingAppointments = this.appointmentsData.filter(a => a.type === 'Tosa').length;
    this.totalBathAndGroomingAppointments = this.appointmentsData.filter(a => a.type === 'Banho e Tosa').length;
    this.totalVetAppointments = this.appointmentsData.filter(a => a.type === 'Consulta Veterinária').length;
  }

  loadEmployeesData() {
    this.employeesData = [
      { name: 'João', role: 'Atendente' },
      { name: 'Maria', role: 'Tosadora' }
    ];
    this.totalEmployees = this.employeesData.length;
  }

  loadClientsData() {
    this.clientsData = [
      { name: 'Carlos', contact: '(11) 99999-9999' },
      { name: 'Ana', contact: '(11) 98888-8888' }
    ];
    this.totalCustomers = this.clientsData.length;
  }

  loadVeterinariansData() {
    this.veterinariansData = [
      { name: 'Dr. Silva', specialty: 'Cirurgião' },
      { name: 'Dra. Lima', specialty: 'Dermatologista' }
    ];
    this.totalVeterinarians = this.veterinariansData.length;
  }

  loadAdditionalMetrics() {
    // Load additional metrics logic here
    // Example:
    this.activeUsers = 10; // Replace with actual logic
    this.inactiveUsers = 5; // Replace with actual logic
    this.totalCashPerDay = 1000; // Replace with actual logic
    this.totalVaccinesAdministered = 50; // Replace with actual logic
    this.totalPetsRegistered = 200; // Replace with actual logic
  }
}
