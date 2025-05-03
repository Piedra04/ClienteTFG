import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { VistaJuegosComponent } from './vista-juegos/vista-juegos.component';
import { VistaLibrosComponent } from './vista-libros/vista-libros.component';
import { VistaTorneosComponent } from './vista-torneos/vista-torneos.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { GestionJuegosComponent } from './gestion-juegos/gestion-juegos.component';
import { GestionLibrosComponent } from './gestion-libros/gestion-libros.component';
import { GestionCampeonatosComponent } from './gestion-campeonatos/gestion-campeonatos.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RegisterComponent, NavigationMenuComponent, VistaJuegosComponent, VistaLibrosComponent, VistaTorneosComponent, VistaAdminComponent, GestionJuegosComponent, GestionLibrosComponent, GestionCampeonatosComponent, GestionUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
}
