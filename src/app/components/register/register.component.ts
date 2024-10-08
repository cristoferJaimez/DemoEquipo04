import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { environment } from '../../enviroment'; // Import environment variables

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  iscuidador = false;
  isAnimal = false;

  // Data object for cuidador
  cuidador = { nombre: '', correo: '', telefono: '', turno: '' };

  // Data object for animal
  animal = { especie: '', nombre: '', tipoComida: '', estadoSalud: '', peso: 0 };

  constructor(private http: HttpClient) {}

  onUserTypeChange(event: any) {
    const userType = event.target.value;
    this.iscuidador = userType === 'cuidador';
    this.isAnimal = userType === 'animal';
  }

  onSubmit() {
    if (this.iscuidador) {
      this.registercuidador();
    } else if (this.isAnimal) {
      this.registerAnimal();
    }
  }

  // Method to register cuidador
  registercuidador() {
    this.http.post(`${environment.apiPostCuidador}`, this.cuidador).subscribe(
      (response) => {
        alert(`Cuidador registrado correctamente: ${this.cuidador.nombre}`);
        this.resetCuidadorForm();  // Llamada para limpiar el formulario
      },
      (error) => {
        alert('Error al registrar el cuidador');
        console.error(error);
      }
    );
  }

   // Método para registrar animal
   registerAnimal() {
    this.http.post(`${environment.apiPostAnimal}`, this.animal, { responseType: 'text' }).subscribe(
      (response) => {
        alert(`Animal registrado correctamente: ${this.animal.nombre}`);
      },
      (error) => {
        alert('Error al registrar el animal');
        console.error(error);
      }
    );
  }

  // Método para limpiar el formulario del cuidador
  resetCuidadorForm() {
    this.cuidador = { nombre: '', correo: '', telefono: '', turno: '' };
  }

  // Método para limpiar el formulario del animal
  resetAnimalForm() {
    this.animal = { especie: '', nombre: '', tipoComida: '', estadoSalud: '', peso: 0 };
  }

  goBack() {
    window.history.back();
  }
}
