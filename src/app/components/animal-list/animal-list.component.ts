import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimalService, Animal } from '../../services/animal/animal.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];
  paginatedAnimals: Animal[] = [];
  selectedAnimal: Animal | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  isLoading: boolean = true;  
  isEditModalVisible = false; // Variable para mostrar u ocultar el modal de edición

  // Definir un array de pesos disponibles (de 1 a 50 kg)
  pesosDisponibles: number[] = Array.from({ length: 50 }, (_, i) => i + 1);

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.fetchAnimals();  
  }

  fetchAnimals() {
    this.animalService.getAllAnimals().subscribe((data: Animal[]) => {
      this.isLoading = false;
      this.animals = data;
      this.updatePagination();
    }, error => {
      console.error('Error fetching animals:', error);
    });
  }

  // Función para eliminar un animal
deleteAnimal(animal: Animal) {
  if (confirm(`¿Está seguro de que desea eliminar a ${animal.nombre}?`)) {
    this.animalService.deleteAnimal(animal.id, animal).subscribe(() => {
      this.animals = this.animals.filter(a => a.id !== animal.id);
      this.updatePagination();
    }, error => {
      console.error('Error eliminando animal:', error);
    });
  }
}

  // Mostrar modal para editar animal
  editAnimal(animal: Animal) {
    this.selectedAnimal = animal;
    this.isEditModalVisible = true; // Mostrar modal
  }


// Guardar los cambios del animal editado
saveEditAnimal() {
  if (this.selectedAnimal) {
    this.animalService.updateAnimal(this.selectedAnimal.id, this.selectedAnimal)
      .subscribe(
        (response) => {
          if (response) {
            alert(`Animal actualizado correctamente: ${response.nombre}`);
          } else {
            alert('Animal actualizado, pero no se recibió una respuesta del servidor.');
          }
          this.isEditModalVisible = false;  // Cierra el modal después de guardar
          this.fetchAnimals();  // Refresca la lista de animales
        },
        (error) => {
          alert('Error al actualizar el animal');
          console.error('Error al actualizar:', error);
        }
      );
  }
}


  
  onSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    const filteredAnimals = this.animals.filter(animal =>
      animal.nombre.toLowerCase().includes(searchValue) ||
      animal.especie.toLowerCase().includes(searchValue)
    );
    this.updatePagination(filteredAnimals);
  }
  
  viewAnimal(animal: Animal) {
    this.selectedAnimal = animal;
  }

  // Funciones de paginación
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

  updatePagination(filteredAnimals?: Animal[]) {
    const animalsToPaginate = filteredAnimals || this.animals;
    this.totalPages = Math.ceil(animalsToPaginate.length / this.itemsPerPage);
    this.paginatedAnimals = animalsToPaginate.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  goBack() {
    window.history.back();
  }

  // Ver historias médicas del animal
  viewMedicalHistory(animal: Animal) {
    alert(`Ver historias médicas de: ${animal.nombre}`);
  }
}
