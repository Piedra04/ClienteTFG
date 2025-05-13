import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navigation-menu',
  imports: [],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {

  constructor(private appComponent: AppComponent) { }
  esAdmin: boolean = true;

  onDashboard(): void {
    console.log('onDashboard');
  }

  onLibros(): void {
    console.log('onLibros');
    this.appComponent.vista = 'libros';
  }

  onJuegos(): void {
    console.log('onJuegos');
    this.appComponent.vista = 'juegos';
  }

  onCampeonatos(): void {
    console.log('onCampeonatos');
    this.appComponent.vista = 'campeonatos';
  }

  onAdministracion(): void {
    console.log('onAdministracion');
    this.appComponent.vista = 'administracion';
  }

  onLogout(): void {
    console.log('onLogout');
    this.appComponent.isLoggedIn = false;
  }
}
