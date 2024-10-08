import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';

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
  isUser = false;

  userPhotoTouched = false; // Add this flag

  // Data object for cuidador
  cuidador = { nombre: '', correo: '', telefono: '', turno: '' };

  // Data object for animal
  animal = { especie: '', nombre: '', tipoComida: '', estadoSalud: '', peso: 0 };

  // Data object for user registration
  user = { name: '', username: '', urlPhoto: '', email: '', password: '', phoneNumber: '' };

  constructor(private http: HttpClient) {}

  onUserTypeChange(event: any) {
    const userType = event.target.value;
    this.iscuidador = userType === 'cuidador';
    this.isAnimal = userType === 'animal';
    this.isUser = userType === 'user';
  }

  onSubmit() {
    if (this.iscuidador) {
      this.registerCuidador();
    } else if (this.isAnimal) {
      this.registerAnimal();
    } else if (this.isUser) {
      this.registerUser();
    }
  }

  // Register cuidador
  registerCuidador() {
    this.http.post(`${environment.apiPostCuidador}`, this.cuidador, { responseType: 'text' }).subscribe(
      (response) => {
        alert(`Cuidador registrado correctamente: ${this.cuidador.nombre}`);
        this.resetCuidadorForm();
      },
      (error) => {
        alert('Error al registrar el cuidador');
        console.error(error);
      }
    );
  }

  // Register animal
  registerAnimal() {
    this.http.post(`${environment.apiPostAnimal}`, this.animal, { responseType: 'text' }).subscribe(
      (response) => {
        alert(`Animal registrado correctamente: ${this.animal.nombre}`);
        this.resetAnimalForm();
      },
      (error) => {
        alert('Error al registrar el animal');
        console.error(error);
      }
    );
  }

  // Register user, including photo in base64
  registerUser() {
    this.http.post(`${environment.apiRegister}`, this.user, { responseType: 'text' }).subscribe(
      (response) => {
        alert(`Usuario registrado correctamente: ${this.user.username}`);
        this.resetUserForm();
      },
      (error) => {
        alert('Error al registrar el usuario');
        console.error(error);
      }
    );
  }

  onFileSelected(event: any) {
    this.userPhotoTouched = true; // Set the flag to true when the file is selected
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.urlPhoto = e.target.result; // Store the base64 image string in urlPhoto
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  }
  

  resetCuidadorForm() {
    this.cuidador = { nombre: '', correo: '', telefono: '', turno: '' };
  }

  resetAnimalForm() {
    this.animal = { especie: '', nombre: '', tipoComida: '', estadoSalud: '', peso: 0 };
  }

  resetUserForm() {
    this.user = { name: '', username: '', urlPhoto: '', email: '', password: '', phoneNumber: '' };
  }

  goBack() {
    window.history.back();
  }
}
