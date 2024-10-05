import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngFor and ngIf

interface Animal {
  name: string;
}

interface Caregiver {
  name: string;
}

interface Report {
  animal: Animal;
  caregiver: Caregiver;
  date: string;
  task: string;
  details: string;
}

@Component({
  selector: 'app-incident-report',
  standalone: true,
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.css'],
  imports: [CommonModule]
})
export class IncidentReportComponent {
  reports: Report[] = [
    { animal: { name: 'Max' }, caregiver: { name: 'Juan' }, date: '2024-10-01', task: 'Limpieza', details: 'Limpieza general del área.' },
    { animal: { name: 'Whiskers' }, caregiver: { name: 'Ana' }, date: '2024-09-25', task: 'Baño', details: 'Baño y cepillado.' },
    { animal: { name: 'Buddy' }, caregiver: { name: 'Carlos' }, date: '2024-09-20', task: 'Corte de pelo', details: 'Corte de pelo estilo mediano.' },
    { animal: { name: 'Nibbles' }, caregiver: { name: 'Laura' }, date: '2024-09-15', task: 'Revisión médica', details: 'Chequeo general.' },
    { animal: { name: 'Chirpy' }, caregiver: { name: 'Sofia' }, date: '2024-09-10', task: 'Alimentación especial', details: 'Comida especializada para aves.' },
    { animal: { name: 'Max' }, caregiver: { name: 'Juan' }, date: '2024-08-30', task: 'Vacunación', details: 'Vacuna antirrábica aplicada.' },
    { animal: { name: 'Whiskers' }, caregiver: { name: 'Ana' }, date: '2024-08-20', task: 'Corte de uñas', details: 'Corte de uñas realizado.' },
    { animal: { name: 'Buddy' }, caregiver: { name: 'Carlos' }, date: '2024-08-15', task: 'Ejercicio', details: 'Ejercicio de resistencia.' },
    { animal: { name: 'Max' }, caregiver: { name: 'Juan' }, date: '2024-08-10', task: 'Consulta veterinaria', details: 'Revisión veterinaria mensual.' }
  ];

  // Variables de paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = Math.ceil(this.reports.length / this.itemsPerPage);

  // Reportes paginados en la página actual
  paginatedReports: Report[] = this.reports.slice(0, this.itemsPerPage);

  // Método de búsqueda de reportes
  onSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    const filteredReports = this.reports.filter(report =>
      report.animal.name.toLowerCase().includes(searchValue) ||
      report.caregiver.name.toLowerCase().includes(searchValue) ||
      report.date.includes(searchValue)
    );
  
    this.updatePagination(filteredReports);
  }
  
  // Ensure this method updates the pagination correctly based on the filtered results
  updatePagination(filteredReports?: Report[]) {
    const reportsToPaginate = filteredReports || this.reports;
    this.totalPages = Math.ceil(reportsToPaginate.length / this.itemsPerPage);
    this.paginatedReports = reportsToPaginate.slice(
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

  // Método para regresar
  goBack() {
    window.history.back();
  }

  // Método para ver el reporte completo
  viewReport(report: Report) {
    alert(`Ver detalles del reporte de ${report.animal.name} realizado el ${report.date}`);
  }

  // Método para editar el reporte
  editReport(report: Report) {
    alert(`Editar el reporte de ${report.animal.name}`);
  }

  // Método para eliminar el reporte
  deleteReport(report: Report) {
    if (confirm(`¿Está seguro de que desea eliminar el reporte de ${report.animal.name} del ${report.date}?`)) {
      this.reports = this.reports.filter(r => r !== report);
      this.updatePagination();
    }
  }

  // Método para imprimir el reporte
  printReport(report: Report) {
    alert(`Imprimir reporte de ${report.animal.name} realizado el ${report.date}`);
  }
}
