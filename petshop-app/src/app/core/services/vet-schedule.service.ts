import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VetSchedule {
  id?: number;
  customer: string;
  pet: string;
  serviceType: string;
  date: string;
  time: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class VetScheduleService {

  private apiUrl = `${environment.apiUrl}/api/schedules/vets`;

  constructor(private http: HttpClient) { }

  getAllSchedules(): Observable<VetSchedule[]> {
    return this.http.get<VetSchedule[]>(`${this.apiUrl}/list`);
  }

  getScheduleById(id: number): Observable<VetSchedule> {
      return this.http.get<VetSchedule>(`${this.apiUrl}/${id}`);
  }

  createSchedule(schedule: VetSchedule): Observable<VetSchedule> {
      return this.http.post<VetSchedule>(this.apiUrl, schedule);
  }

  updateSchedule(id: number, schedule: VetSchedule): Observable<VetSchedule> {
      return this.http.put<VetSchedule>(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
