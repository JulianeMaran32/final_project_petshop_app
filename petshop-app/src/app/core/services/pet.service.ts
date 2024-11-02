import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PetResponse } from '../../shared/models/pet/pet-response.model';
import { PetRequest } from '../../shared/models/pet/pet-request.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = `${environment.apiUrl}/api/pets`;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  getPets(filterParams?: any): Observable<PetResponse[]> {
    this.logger.info('Buscando pets com parâmetros de filtro', filterParams);
    return this.http.get<PetResponse[]>(`${this.apiUrl}/filter`, { params: filterParams }).pipe(
      tap(pets => this.logger.info('Pets buscados', pets))
    );
  }
  createPet(pet: PetRequest): Observable<PetResponse> {
    this.logger.info('Criando pet', pet);
    return this.http.post<PetResponse>(this.apiUrl, pet).pipe(
      tap(createdPet => this.logger.info('Pet criado', createdPet))
    );
  }

  createPetForCustomer(pet: PetRequest): Observable<PetResponse> {
    this.logger.info('Criando pet para cliente', pet);
    return this.http.post<PetResponse>(`${this.apiUrl}/admin`, pet).pipe(
      tap(createdPet => this.logger.info('Pet criado para cliente', createdPet))
    );
  }

  updatePet(petId: number, pet: PetRequest): Observable<PetResponse> {
    this.logger.info(`Atualizando pet com ID ${petId}`, pet);
    return this.http.put<PetResponse>(`${this.apiUrl}/${petId}`, pet).pipe(
      tap(updatedPet => this.logger.info(`Pet atualizado com ID ${petId}`, updatedPet))
    );
  }

  updatePetForCustomer(petId: number, pet: PetRequest): Observable<PetResponse> {
    this.logger.info(`Atualizando pet para cliente com ID ${petId}`, pet);
    return this.http.put<PetResponse>(`${this.apiUrl}/admin/${petId}`, pet).pipe(
      tap(updatedPet => this.logger.info(`Pet atualizado para cliente com ID ${petId}`, updatedPet))
    );
  }

  deletePet(petId: number): Observable<void> {
    this.logger.info(`Deletando pet com ID ${petId}`);
    return this.http.delete<void>(`${this.apiUrl}/${petId}`).pipe(
      tap(() => this.logger.info(`Pet deletado com ID ${petId}`))
    );
  }

  deletePetForCustomer(petId: number): Observable<void> {
    this.logger.info(`Deletando pet para cliente com ID ${petId}`);
    return this.http.delete<void>(`${this.apiUrl}/admin/${petId}`).pipe(
      tap(() => this.logger.info(`Pet deletado para cliente com ID ${petId}`))
    );
  }
  
}
