import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Modelos/usuario';
import { UsuarioService } from '../../Servicios/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  formCrear!: boolean;
  formEditar!: boolean;
  lista!: boolean;

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
    console.log('showCreate');
    this.formCrear = true;
    this.lista = false;

  }

  showEdit(id: number): void {
    console.log('showEdit');
    this.formEditar = true;
    this.lista = false;
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      console.log("usuario");
      (document.getElementById('editId') as HTMLInputElement).value = usuario.id.toString();
      (document.getElementById('editNombre') as HTMLInputElement).value = usuario.nombre;
      (document.getElementById('editApellidos') as HTMLInputElement).value = usuario.apellidos;
      (document.getElementById('editFechaNacimiento') as HTMLInputElement).value = usuario.fechaNacimiento.toISOString().split('T')[0];
      (document.getElementById('editCorreo') as HTMLInputElement).value = usuario.correo;
      (document.getElementById('editRol') as HTMLSelectElement).value = usuario.rol;
      (document.getElementById('editCurso') as HTMLInputElement).value = usuario.curso;
    }
  }

  onCreate(): void {
    console.log('onCreate');
  }

  onEdit(): void {
    console.log('onEdit');
  }

  onRemove(id: number): void {
    this.usuarioService.deleteUser(id).subscribe(() => {
      // Esto quitará el usuario de la lista en la vista
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    })
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
