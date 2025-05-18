import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Modelos/usuario';
import { UsuarioService } from '../../Servicios/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  formCrear!: boolean;
  formEditar!: boolean;
  lista!: boolean;
  message: string = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
    this.usuarioService.findAll().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  showCreate(): void {
    this.usuario = new Usuario();
    this.formCrear = true;
    this.lista = false;

  }

  showEdit(id: number): void {
    this.usuarioService.findById(id).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      this.usuario.contrasena = ''; // Limpiar el campo de contraseña
      this.formEditar = true;
      this.lista = false;
    });
  }

  onCreate(): void {
    this.usuario.contrasena = '';
    const form = document.getElementById('createUsuarioForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.usuarioService.createUser(this.usuario).subscribe({
      next: () => {
        this.usuarioService.findAll().subscribe((data: Usuario[]) => {
          this.usuarios = data;
          this.usuario = new Usuario();
          this.message = 'Usuario creado correctamente.';
          this.goBack();
        });
      },
      error: () => {
        this.message = 'Error al crear el usuario';
      }
    });
  }

  onEdit(): void {
    const form = document.getElementById('editUsuarioForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.usuarioService.updateUser(this.usuario).subscribe({
      next: () => {
        this.usuarioService.findAll().subscribe((data: Usuario[]) => {
          this.usuarios = data;
          this.usuario = new Usuario();
          this.message = 'Usuario editado correctamente.';
          this.goBack();
        });
      },
      error: () => {
        this.message = 'Error al editar el usuario';
      }
    });
  }

  onRemove(id: number): void {
    this.usuarioService.deleteUser(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        this.message = 'Usuario eliminado correctamente.';
      },
      error: () => {
        this.message = 'Error al eliminar el usuario';
      }
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
