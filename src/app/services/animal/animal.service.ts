import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroment';

export interface Animal {
  id: string;
  nombre: string;
  especie: string;
  tipoComida: string;
  estadoSalud: string;
  peso: number;
  fechaRegistro: string;
}

export interface Vaccination {
  nombre: string;
  fechaAplicacion: string;
  fechaProximaDosis: string;
  animalId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = environment.apiAllAnimal;

  constructor(private http: HttpClient) {}

  // Obtener todos los animales
  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl).pipe(
      catchError(this.handleError<Animal[]>('getAllAnimals', []))
    );
  }

  // Eliminar un animal enviando el cuerpo con los datos del animal
  deleteAnimal(id: string, animal: Animal): Observable<void> {
    const deleteUrl = `${environment.apiDeleteAnimal}/${id}`;
    return this.http.delete<void>(deleteUrl, {
      body: animal  // Aquí se pasa el cuerpo que contiene los datos del animal
    }).pipe(
      catchError(this.handleError<void>('deleteAnimal'))
    );
  }

  // Para editar un animal
  updateAnimal(id: string, animal: Animal): Observable<Animal> {
    const putUrl = `${environment.apiPutAnimal}/${id}`;  // Agregar el ID dinámicamente
    return this.http.put<Animal>(putUrl, animal).pipe(
      catchError(this.handleError<Animal>('updateAnimal'))
    );
  }

// Obtener el historial de vacunaciones de un animal (usando GET con id en la ruta)
getVaccinationHistory(animalId: string): Observable<Vaccination[]> {
  const url = `${environment.apiGetVacuna}/${animalId}`;  // El ID ahora es parte de la ruta
  return this.http.get<Vaccination[]>(url).pipe(
    catchError(this.handleError<Vaccination[]>('getVaccinationHistory', []))
  );
}



  // Agregar una nueva vacunación
  addVaccination(vaccination: Vaccination): Observable<any> {
    return this.http.post(environment.apiPostVacuna, vaccination).pipe(
      catchError(this.handleError<any>('addVaccination'))
    );
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falló: ${error.message}`);
      return of(result as T);
    };
  }
}
