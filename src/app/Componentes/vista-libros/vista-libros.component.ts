import { Component } from '@angular/core';
import { LibroService } from '../../Servicios/libro.service';
import { Libro } from '../../Modelos/libro';
import { Genero } from '../../Modelos/genero';
import { GeneroService } from '../../Servicios/genero.service';
import { FormsModule } from '@angular/forms';
import { ReservaLibroService } from '../../Servicios/reserva-libro.service';
import { ReservaLibro } from '../../Modelos/reserva-libro';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-vista-libros',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './vista-libros.component.html',
  styleUrl: './vista-libros.component.css'
})
export class VistaLibrosComponent {

  libros: Libro[] = [];
  generos: Genero[] = [];
  cursos: String[] = ['1ESO', '2ESO', '3ESO', '4ESO', '1Bachillerato', '2Bachillerato', 'GradoMedio', 'GradoSuperior'];
  generosSeleccionados: Genero[] = [];
  cursoSeleccionado: string = '';
  reservaLibro: ReservaLibro = new ReservaLibro();
  reservasUsuario: ReservaLibro[] = [];
  message: string = '';

  constructor(private appComponent: AppComponent, private libroService: LibroService, private generoService: GeneroService, private reservaLibroService: ReservaLibroService) { }

  ngOnInit(): void {
    this.libroService.findAll().subscribe((data: Libro[]) => {
      this.libros = data;
    });

    this.generoService.findAll().subscribe((data: Genero[]) => {
      this.generos = data;
    });

    // Cargar reservas del usuario actual
    this.reservaLibroService.findAll().subscribe((reservas: ReservaLibro[]) => {
      if (this.appComponent.currentUser) {
        this.reservasUsuario = reservas.filter(r =>
          r.usuario.id === this.appComponent.currentUser.id && r.fechaDevolucion == null
        );
      }
    });
  }

  isGeneroSeleccionado(genero: Genero): boolean {
    return this.generosSeleccionados.some(g => g.id === genero.id);
  }

  toggleGeneroSeleccionado(genero: Genero, event: any): void {
    if (event.target.checked) {
      this.generosSeleccionados.push(genero);
    } else {
      this.generosSeleccionados = this.generosSeleccionados.filter(g => g.id !== genero.id);
    }
  }

  get librosFiltrados(): Libro[] {
    let filtrados = this.libros;
    if (this.generosSeleccionados.length > 0) {
      filtrados = filtrados.filter(libro =>
        libro.generos && libro.generos.some((g: Genero) =>
          this.generosSeleccionados.some(gs => gs.id === g.id)
        )
      );
    }
    if (this.cursoSeleccionado) {
      filtrados = filtrados.filter(libro => libro.curso === this.cursoSeleccionado);
    }
    return filtrados;
  }

  tieneReservaActiva(libro: Libro): boolean {
    return this.reservasUsuario.some(r => r.libro.isbn === libro.isbn);
  }

  reservar(libro: Libro): void {
    if (this.tieneReservaActiva(libro)) {
      this.message = 'Ya tienes una reserva activa de este libro.';
      return;
    }
    this.reservaLibro.libro = libro;
    this.reservaLibro.usuario = this.appComponent.currentUser;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    this.reservaLibro.fechaAdquisicion = hoy;
    this.reservaLibroService.createReserva(this.reservaLibro).subscribe({
      next: (reserva: ReservaLibro) => {
        this.reservaLibro = new ReservaLibro();
        // CAmbios para la vista
        libro.unidadesDisponibles--;
        this.reservasUsuario.push({ ...reserva, libro: libro, usuario: this.appComponent.currentUser });
        // Actualizar en base de datos
        this.libroService.updateBook(libro).subscribe();
      },
      error: () => {
      }
    });
  }
}
