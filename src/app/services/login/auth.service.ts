import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // HttpClient inyectado correctamente
import { Observable } from 'rxjs';
import { environment } from '../../enviroment';   // Asegúrate de que la ruta a environment sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiLogin;  // Usar la URL del entorno

  constructor(private http: HttpClient) {}

  // Cambiar username por email, ya que el backend espera "email" y "password"
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };  // El backend espera "email" en lugar de "username"
    return this.http.post(this.apiUrl, loginData);  // Usa la URL directamente sin añadir '/login', ya que está incluida en environment
  }
}
