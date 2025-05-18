import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Modelos/usuario';
import { UsuarioService } from '../../Servicios/usuario.service';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message: string = '';
  usuario: Usuario = new Usuario();
  constructor(private appComponent: AppComponent, private usuarioService: UsuarioService) { }


  onLogin(): void {
    this.usuarioService.login(this.usuario).subscribe({
      next: () => {
        this.usuarioService.findByCorreo(this.usuario.correo).subscribe((usuario: Usuario) => {
          this.appComponent.currentUser = usuario;
          if (usuario.rol == 'ADMINISTRADOR') {
            this.appComponent.isAdmin = true;
          }else{
            this.appComponent.isAdmin = false;
           }
          this.appComponent.isLoggedIn = true;
        });
        this.usuario = new Usuario();
      },
      error: (error) => {
        this.message = error.error.message;
      }
    });
  }

  onChange(): void {
    this.appComponent.isLogging = false;
  }
}
