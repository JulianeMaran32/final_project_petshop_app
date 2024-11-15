import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { AuthService } from './auth.service';
import { AddressResponse } from '../../shared/models/address/address-response.model';
import { AddressRequest } from '../../shared/models/address/address-request.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = `${environment.apiUrl}/api/addresses`;

  constructor(
    private http: HttpClient, 
    private logger: LoggerService, 
    private authService: AuthService) { }

  getAddressByCep(cep: string): Observable<AddressResponse> {
    this.logger.info('Buscando endereço pelo CEP', { cep });
    return this.http.get<AddressResponse>(`${this.apiUrl}/cep/${cep}`).pipe(
      tap(response => this.logger.debug('Endereço buscado com sucesso', response)),
      catchError(error => this.handleError('getAddressByCep', error))
    );
  }

  getAddressByDetails(uf: string, city: string, street: string): Observable<AddressResponse[]> {
    this.logger.info('Buscando endereço pelos detalhes', { uf, city, street });
    return this.http.get<AddressResponse[]>(`${this.apiUrl}/search`, {
      params: { uf, city, street }
    }).pipe(
      tap(response => this.logger.debug('Endereços buscados com sucesso', response)),
      catchError(error => this.handleError('getAddressByDetails', error))
    );
  }

  createAddress(addressRequest: AddressRequest): Observable<AddressResponse> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Usuário não autenticado.'));
    }
    this.logger.info('Criando endereço', addressRequest);
    return this.http.post<AddressResponse>(this.apiUrl, addressRequest, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }).pipe(
      tap(response => this.logger.debug('Endereço criado com sucesso', response)),
      catchError(error => this.handleError('createAddress', error))
    );
  }

  updateAddress(id: number, addressRequest: AddressResponse): Observable<AddressResponse> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Usuário não autenticado.'));
    }
    this.logger.info('Atualizando endereço', { id, addressRequest });
    return this.http.put<AddressResponse>(`${this.apiUrl}/${id}`, addressRequest, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }).pipe(
      tap(response => this.logger.debug('Endereço atualizado com sucesso', response)),
      catchError(error => this.handleError('updateAddress', error))
    );
  }

  deleteAddress(id: number): Observable<void> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Usuário não autenticado.'));
    }
    this.logger.info('Deletando endereço', { id });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }).pipe(
      tap(() => this.logger.debug('Endereço deletado com sucesso')),
      catchError(error => this.handleError('deleteAddress', error))
    );
  }

  private handleError(operation: string, error: any): Observable<never> {
    this.logger.error(`${operation} falhou`, error);
    return throwError(() => error);
  }

}