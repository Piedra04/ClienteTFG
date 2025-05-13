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
    console.log('onUsuarios');
    this.appComponent.gestion = 'usuarios';
  }

  onJuegos(): void {
    console.log('onJuegos');
    this.appComponent.gestion = 'juegos';
  }

  onLibros(): void {
    console.log('onLibros');
    this.appComponent.gestion = 'libros';
  }

  onCampeonatos(): void {
    console.log('onCampeonatos');
    this.appComponent.gestion = 'campeonatos';
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
      default:
        console.log('Seleccione una opción válida');
    }
  }
}
