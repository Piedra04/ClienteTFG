import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Modelos/usuario';
import { UsuarioService } from '../../Servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  message: string = '';
  usuario: Usuario = new Usuario();
  constructor(private appComponent: AppComponent, private usuarioService: UsuarioService) { }



  onRegister(): void {
    const form = document.getElementById('createGameForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (this.usuario.contrasena != this.usuario.contrasena2) {
      this.message = 'Las contraseñas no coinciden';
      return;
    }

    this.usuarioService.register(this.usuario).subscribe({
      next: () => {
        this.usuarioService.findByCorreo(this.usuario.correo).subscribe((usuario: Usuario) => {
          this.appComponent.currentUser = usuario;
          this.appComponent.isLoggedIn = true;
          this.appComponent.vista = 'dashboard';
          this.appComponent.isAdmin = false;
        });
        this.usuario = new Usuario();

      },
      error: (error) => {
        this.message = error.error.message;
      }
    });
  }

  onChange(): void {
    this.appComponent.isLogging = true;
  }
}
