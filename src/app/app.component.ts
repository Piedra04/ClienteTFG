import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './Componentes/login/login.component';
import { RegisterComponent } from './Componentes/register/register.component';
import { NavigationMenuComponent } from './Componentes/navigation-menu/navigation-menu.component';
import { VistaJuegosComponent } from './Componentes/vista-juegos/vista-juegos.component';
import { VistaLibrosComponent } from './Componentes/vista-libros/vista-libros.component';
import { VistaTorneosComponent } from './Componentes/vista-torneos/vista-torneos.component';
import { VistaAdminComponent } from './Componentes/vista-admin/vista-admin.component';
import { GestionJuegosComponent } from './Componentes/gestion-juegos/gestion-juegos.component';
import { GestionLibrosComponent } from './Componentes/gestion-libros/gestion-libros.component';
import { GestionCampeonatosComponent } from './Componentes/gestion-campeonatos/gestion-campeonatos.component';
import { GestionUsuariosComponent } from './Componentes/gestion-usuarios/gestion-usuarios.component';


@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegisterComponent, NavigationMenuComponent, VistaJuegosComponent, VistaLibrosComponent, VistaTorneosComponent, VistaAdminComponent, GestionJuegosComponent, GestionLibrosComponent, GestionCampeonatosComponent, GestionUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  
  isLoggedIn!: boolean;
  isLogging!: boolean;
  isAdmin!: boolean;
  vista!: string;
  gestion!: string;

  ngOnInit() {
    this.isLoggedIn = true;
    this.isLogging = true;
    this.vista = 'libros';
    this.gestion = 'usuarios';
  }
}
