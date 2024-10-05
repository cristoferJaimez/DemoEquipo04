import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Animal {
  id: number;
  name: string;
  species: string;
  age: number;
  owner: string;
  caregiver: string;
  currentProcedure: string;
}

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent {
  animals: Animal[] = [
    { id: 1, name: 'Max', species: 'Perro', age: 5, owner: 'Carlos', caregiver: 'Juan', currentProcedure: 'Vacunación' },
    { id: 2, name: 'Whiskers', species: 'Gato', age: 3, owner: 'Lucía', caregiver: 'Ana', currentProcedure: 'Examen' },
    { id: 3, name: 'Buddy', species: 'Perro', age: 2, owner: 'Pedro', caregiver: 'María', currentProcedure: 'Baño' },
    { id: 4, name: 'Chirpy', species: 'Pájaro', age: 1, owner: 'Marcos', caregiver: 'Carla', currentProcedure: 'Desparasitación' },
    { id: 5, name: 'Nibbles', species: 'Conejo', age: 4, owner: 'Daniel', caregiver: 'Esteban', currentProcedure: 'Control' },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = Math.ceil(this.animals.length / this.itemsPerPage);
  paginatedAnimals: Animal[] = this.animals.slice(0, this.itemsPerPage);
  selectedAnimal: Animal | null = null;

  viewAnimal(animal: Animal) {
    this.selectedAnimal = animal;
  }

  editAnimal(animal: Animal) {
    alert(`Editar el animal: ${animal.name}`);
  }

  deleteAnimal(animal: Animal) {
    if (confirm(`¿Está seguro de que desea eliminar a ${animal.name}?`)) {
      this.animals = this.animals.filter(a => a.id !== animal.id);
      this.updatePagination();
    }
  }

  onSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    const filteredAnimals = this.animals.filter(animal =>
      animal.name.toLowerCase().includes(searchValue) ||
      animal.species.toLowerCase().includes(searchValue) ||
      animal.owner.toLowerCase().includes(searchValue)
    );
    this.updatePagination(filteredAnimals);
  }

  updatePagination(filteredAnimals?: Animal[]) {
    const animalsToPaginate = filteredAnimals || this.animals;
    this.totalPages = Math.ceil(animalsToPaginate.length / this.itemsPerPage);
    this.paginatedAnimals = animalsToPaginate.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goBack() {
    window.history.back();
  }

  viewMedicalHistory(animal: Animal) {
    alert(`Ver historias médicas de: ${animal.name}`);
  }
}
