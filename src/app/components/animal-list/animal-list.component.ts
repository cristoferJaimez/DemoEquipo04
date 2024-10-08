import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimalService, Animal } from '../../services/animal/animal.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';

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
  vaccinations: any[] = []; // Lista de vacunaciones
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  isLoading: boolean = true;
  isEditModalVisible = false;
  viewModalVisible = false;
  isHistoryModalVisible = false; // Modal para el historial médico
  isVaccinationModalVisible = false; // Modal para añadir vacunación
  newVaccination = { nombre: '', fechaAplicacion: '', fechaProximaDosis: '', animalId: '' }; // Nuevo objeto para vacunación

  constructor(private animalService: AnimalService, private http: HttpClient) {}

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

// Función para obtener el historial de vacunaciones del animal
viewVaccinationHistory(animal: Animal) {
  this.selectedAnimal = animal;
  this.http.get(`${environment.apiGetVacuna}/${animal.id}`).subscribe(
    (data: any) => {
      // Si data es un objeto y no un array, conviértelo en un array
      if (!Array.isArray(data)) {
        this.vaccinations = [data];  // Convierte el objeto en un array con un solo elemento
      } else {
        this.vaccinations = data;  // Si ya es un array, lo usamos directamente
      }
      this.isHistoryModalVisible = true; // Mostrar el modal del historial
    },
    (error) => {
      console.error('Error fetching vaccination history:', error);
    }
  );
}


  // Función para abrir el modal de agregar vacunación
  openVaccinationModal(animal: Animal) {
    this.selectedAnimal = animal;
    this.newVaccination.animalId = animal.id; // Asignar el ID del animal a la nueva vacunación
    this.isVaccinationModalVisible = true; // Mostrar el modal de agregar vacunación
  }

  // Función para agregar una nueva vacunación
  addVaccination() {
    this.http.post(environment.apiPostVacuna, this.newVaccination).subscribe(
      (response) => {
        alert('Vacunación añadida correctamente');
        this.isVaccinationModalVisible = false; // Cerrar el modal después de añadir la vacunación
        this.viewVaccinationHistory(this.selectedAnimal!); // Refrescar el historial de vacunación
      },
      (error) => {
        console.error('Error adding vaccination:', error);
      }
    );
  }

  // Cerrar modales
  closeModals() {
    this.isHistoryModalVisible = false;
    this.isVaccinationModalVisible = false;
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

  // Función para editar un animal
  editAnimal(animal: Animal) {
    this.selectedAnimal = animal;
    this.isEditModalVisible = true;
  }

  saveEditAnimal() {
    if (this.selectedAnimal) {
      this.animalService.updateAnimal(this.selectedAnimal.id, this.selectedAnimal)
        .subscribe(
          (response) => {
            if (response && response.nombre) {
              alert(`Animal actualizado correctamente: ${response.nombre}`);
            } else {
              alert('Animal actualizado correctamente, pero no se recibió la respuesta esperada.');
            }
            this.isEditModalVisible = false;
            this.fetchAnimals(); // Refrescar la lista de animales
          },
          (error) => {
            alert('Error al actualizar el animal');
            console.error('Error al actualizar:', error);
          }
        );
    }
  }

  viewAnimal(animal: Animal) {
    this.selectedAnimal = animal;
    this.viewModalVisible = true;
  }

  closeViewModal() {
    this.viewModalVisible = false;
  }

  // Función para realizar búsqueda de animales
  onSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    const filteredAnimals = this.animals.filter(animal =>
      animal.nombre.toLowerCase().includes(searchValue) ||
      animal.especie.toLowerCase().includes(searchValue)
    );
    this.updatePagination(filteredAnimals);
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
}
