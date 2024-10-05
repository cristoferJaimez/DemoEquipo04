import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule para usar *ngIf y *ngFor
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar [(ngModel)]

interface Caregiver {
  id: number;
  name: string;
  experience: number; // años de experiencia
  assignedAnimals: string[];
  tasks: Task[];  // Nueva propiedad para las tareas asignadas
}

interface Task {
  animal: string;
  day: string;
  duration: number;
  reason: string;
}

@Component({
  selector: 'app-task-assignment',
  standalone: true,
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.css'],
  imports: [CommonModule, FormsModule]  // Importar los módulos necesarios
})
export class TaskAssignmentComponent {
  caregivers: Caregiver[] = [
    { id: 1, name: 'Juan', experience: 5, assignedAnimals: ['Max', 'Buddy'], tasks: [] },
    { id: 2, name: 'Ana', experience: 3, assignedAnimals: ['Whiskers'], tasks: [] },
    // Más cuidadores...
  ];

  availableAnimals: string[] = ['Max', 'Whiskers', 'Buddy', 'Chirpy', 'Nibbles'];

  selectedCaregiver: Caregiver | null = null;
  task: Task = {
    animal: '',
    day: '',
    duration: 0,
    reason: ''
  };

  onSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.selectedCaregiver = this.caregivers.find(caregiver =>
      caregiver.name.toLowerCase().includes(searchValue)
    ) || null;
  }

  assignTask() {
    if (this.selectedCaregiver) {
      this.selectedCaregiver.tasks.push({ ...this.task });
      alert(`Tarea asignada a ${this.selectedCaregiver.name} para cuidar a ${this.task.animal}.`);
      // Limpiar el formulario de tarea
      this.task = { animal: '', day: '', duration: 0, reason: '' };
    }
  }

  goBack() {
    window.history.back();
  }
}
