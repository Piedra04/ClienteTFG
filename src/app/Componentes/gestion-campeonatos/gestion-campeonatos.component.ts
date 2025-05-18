import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampeonatoService } from '../../Servicios/campeonato.service';
import { Campeonato } from '../../Modelos/campeonato';
import { Juego } from '../../Modelos/juego';
import { Usuario } from '../../Modelos/usuario';
import { UsuarioService } from '../../Servicios/usuario.service';
import { JuegoService } from '../../Servicios/juego.service';

@Component({
  selector: 'app-gestion-campeonatos',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './gestion-campeonatos.component.html',
  styleUrls: ['./gestion-campeonatos.component.css']
})
export class GestionCampeonatosComponent {
  formCrear: boolean = false;
  formEditar: boolean = false;
  lista: boolean = true;
  campeonatos: Campeonato[] = [];
  usuarios: Usuario[] = [];
  juegos: Juego[] = [];
  campeonato: Campeonato = new Campeonato();
  message: string = '';

  constructor(private campeonatoService: CampeonatoService, private usuarioService: UsuarioService, private juegoService: JuegoService) { }

  ngOnInit(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;

    this.campeonatoService.findAll().subscribe((data: Campeonato[]) => {
      this.campeonatos = data;
    });

    this.usuarioService.findAll().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });

    this.juegoService.findAll().subscribe((data: Juego[]) => {
      this.juegos = data;
    });

  }

  showCreate(): void {
    this.formCrear = true;
    this.lista = false;
  }

  showEdit(id: number): void {

    this.formEditar = true;
    this.lista = false;

    this.campeonatoService.findById(id).subscribe((campeonato: Campeonato) => {
      this.campeonato = campeonato;
      this.campeonato.juego = this.juegos.find(j => j.id === campeonato.juego.id) || new Juego();
      this.campeonato.ganador = this.usuarios.find(u => u.id === campeonato.ganador.id) || new Usuario();
      
    });
  }

  onCreate(): void {
    this.campeonatoService.createCampeonato(this.campeonato).subscribe({
      next: () => {
        this.campeonatoService.findAll().subscribe((data: Campeonato[]) => {
          this.campeonatos = data;
        });
        this.campeonato = new Campeonato();
        this.message = 'Campeonato creado correctamente.';
        this.goBack();
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al crear el campeonato';
      }
    });
  }

  onEdit(): void {
    this.campeonatoService.updateCampeonato(this.campeonato).subscribe({
      next: () => {
        this.campeonatoService.findAll().subscribe((data: Campeonato[]) => {
          this.campeonatos = data;
        });
        this.campeonato = new Campeonato();
        this.message = 'Campeonato editado correctamente.';
        this.goBack();
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al editar el campeonato';
      }
    });
  }

  onRemove(id: number): void {
    this.campeonatoService.deleteCampeonato(id).subscribe({
      next: () => {
        this.campeonatos = this.campeonatos.filter(campeonato => campeonato.id !== id);
        this.message = 'Campeonato eliminado correctamente.';
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al eliminar el campeonato';
      }
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
