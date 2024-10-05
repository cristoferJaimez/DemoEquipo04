import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-animales',
  standalone: true,
  imports: [],
  templateUrl: './gestion-animales.component.html',
  styleUrl: './gestion-animales.component.css'
})
export class GestionAnimalesComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();  // Retrocede a la página anterior
  }

}
