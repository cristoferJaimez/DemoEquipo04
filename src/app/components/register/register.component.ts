import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

// Interface for pets to ensure the structure is clear
interface Pet {
  name: string;
  species: string;
  age: number;
  vet: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  isCaregiver = false;
  isUser = false;
  isVet = false;
  isUserRegistered = false;
  showPetForm = false;
  
  // Veterinarios disponibles para selección de mascota
  vets = [
    { name: 'Dr. Perez' },
    { name: 'Dra. Martinez' },
    { name: 'Dr. Lopez' }
  ];

  // Data objects for user types
  user = { name: '', id: '', address: '' };
  caregiver = { name: '', id: '', phone: '', experience: 0 };
  vet = { name: '', id: '', phone: '', specialty: '' };

  // Array to store pets
  pets: Pet[] = [];

  // Defining the pet object
  pet: Pet = {
    name: '',
    species: '',
    age: 0,
    vet: ''
  };

  onUserTypeChange(event: any) {
    const userType = event.target.value;
    this.isCaregiver = userType === 'caregiver';
    this.isUser = userType === 'user';
    this.isVet = userType === 'vet';
  }

  onSubmit() {
    if (this.isCaregiver) {
      alert(`Cuidador registrado: ${this.caregiver.name}`);
    } else if (this.isUser) {
      this.isUserRegistered = true;
      alert(`Usuario registrado: ${this.user.name}`);
    } else if (this.isVet) {
      alert(`Veterinario registrado: ${this.vet.name}`);
    }
  }

  addPet() {
    this.showPetForm = true;
  }

  savePet() {
    this.pets.push({ ...this.pet });
    this.showPetForm = false;

    // Resetting the pet form after saving
    this.pet = { name: '', species: '', age: 0, vet: '' };
  }

  goBack() {
    window.history.back();
  }
}
