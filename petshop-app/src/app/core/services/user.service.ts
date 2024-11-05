import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserResponse } from '../../shared/models/user/user-response.model';
import { UserRegistrationRequest } from '../../shared/models/user/user-register-request.model';
import { UserUpdateRequest } from '../../shared/models/user/user-update-request.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  registerUser(userRegistrationRequest: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, userRegistrationRequest)
      .pipe(
        catchError(error => {
          this.logger.error('Error registering user: ' + error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }

  updateUser(id: number, userUpdateRequest: UserUpdateRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, userUpdateRequest)
      .pipe(
        catchError(error => {
          this.logger.error('Error updating user: ' + error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          this.logger.error('Error deleting user: ' + error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }

  searchUsers(name?: string, cpf?: string, email?: string, phone?: string): Observable<UserResponse[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (cpf) params = params.set('cpf', cpf);
    if (email) params = params.set('email', email);
    if (phone) params = params.set('phone', phone);

    return this.http.get<UserResponse[]>(`${this.apiUrl}/search`, { params })
      .pipe(
        catchError(error => {
          this.logger.error('Error searching users: ' + error.message);
          return throwError(() => new Error(error.message));
        })
      );
  }

  unlockAccount(email: string): Observable<string> {
    const body = new HttpParams().set('email', email);
    return this.http.post<string>(`${this.apiUrl}/unlock`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      catchError(error => {
        this.logger.error('Error unlocking account: ' + error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

}
