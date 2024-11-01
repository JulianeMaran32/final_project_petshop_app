import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDeliveryInfo } from '../../shared/models/delivery/user-delivery-info.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = `${environment.apiUrl}/api/addresses`;

  constructor(private http: HttpClient) { }

  findUserDeliveryInfo(name?: string, phone?: string, zipCode?: string): Observable<UserDeliveryInfo[]> {
    const params: any = {};
    if (name) params.name = name;
    if (phone) params.phone = phone;
    if (zipCode) params.zipCode = zipCode;

    return this.http.get<UserDeliveryInfo[]>(`${this.apiUrl}/info`, { params });
  }

}
