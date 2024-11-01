import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Scheduling } from '../../shared/models/schedules/scheduling.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceScheduleService {

  private apiUrl = `${environment.apiUrl}/api/schedules/services`;

  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Scheduling[]> {
    return this.http.get<Scheduling[]>(this.apiUrl);
  }

  getScheduleById(id: number): Observable<Scheduling> {
    return this.http.get<Scheduling>(`${this.apiUrl}/${id}`);
  }

  addSchedule(schedule: Scheduling): Observable<Scheduling> {
    return this.http.post<Scheduling>(this.apiUrl, schedule);
  }

  updateSchedule(id: number, schedule: Scheduling): Observable<Scheduling> {
    return this.http.put<Scheduling>(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
