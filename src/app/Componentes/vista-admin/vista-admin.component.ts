import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-vista-admin',
  imports: [],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent {

  constructor(private appComponent: AppComponent) { }

  onUsuarios(): void {
    this.appComponent.gestion = 'usuarios';
  }

  onJuegos(): void {
    this.appComponent.gestion = 'juegos';
  }

  onLibros(): void {
    this.appComponent.gestion = 'libros';
  }

  onCampeonatos(): void {
    this.appComponent.gestion = 'campeonatos';
  }

  onReserva(): void {
    this.appComponent.gestion = 'reservas';
  }

  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    switch (value) {
      case 'usuarios':
        this.onUsuarios();
        break;
      case 'libros':
        this.onLibros();
        break;
      case 'juegos':
        this.onJuegos();
        break;
      case 'campeonatos':
        this.onCampeonatos();
        break;
      case 'reservas':
        this.onReserva();
        break;
    }
  }
}
