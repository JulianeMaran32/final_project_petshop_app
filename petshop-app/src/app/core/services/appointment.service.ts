import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppointmentRequest } from '../../shared/models/appointment/appointment-request.model';
import { AppointmentResponse } from '../../shared/models/appointment/appointment-response.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = `${environment.apiUrl}/api/appointments`;

  constructor(private http: HttpClient) { }

  createAppointment(appointment: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(this.apiUrl, appointment);
  }

  getAppointments(): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(this.apiUrl);
  }

}
