import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // HttpClient inyectado correctamente
import { Observable } from 'rxjs';
import { environment } from '../../enviroment';  // Importar variables de entorno

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiLogin;  // Usar la URL del entorno

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}
