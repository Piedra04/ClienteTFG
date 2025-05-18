import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navigation-menu',
  imports: [],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent implements OnInit{

  constructor(private appComponent: AppComponent) { }
  esAdmin!: boolean;

  ngOnInit(): void {
      this.esAdmin = this.appComponent.isAdmin;
  }

  vista: string = 'dashboard';
  onDashboard(): void {
    this.appComponent.vista = 'dashboard';
    this.vista = 'dashboard';
  }

  onLibros(): void {
    this.appComponent.vista = 'libros';
    this.vista = 'libros';
  }

  onJuegos(): void {
    this.appComponent.vista = 'juegos';
    this.vista = 'juegos';
  }

  onCampeonatos(): void {
    this.appComponent.vista = 'campeonatos';
    this.vista = 'campeonatos';
  }

  onAdministracion(): void {
    this.appComponent.vista = 'administracion';
    this.vista = 'administracion';
  }

  onLogout(): void {
    this.appComponent.isLoggedIn = false;
    this.appComponent.isLogging = true;
    this.appComponent.vista = 'dashboard';
    this.appComponent.gestion = 'usuarios';
  }
}
