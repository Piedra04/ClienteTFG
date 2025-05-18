import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Usuario } from '../../Modelos/usuario';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../Servicios/usuario.service';
import { ReservaLibroService } from '../../Servicios/reserva-libro.service';
import { ReservaLibro } from '../../Modelos/reserva-libro';
import { ParticipacionCampeonatoService } from '../../Servicios/participacion-campeonato.service';
import { ParticipacionCampeonato } from '../../Modelos/participacion-campeonato';
import { Campeonato } from '../../Modelos/campeonato';
import { ReservaJuegoService } from '../../Servicios/reserva-juego.service';
import { ReservaJuego } from '../../Modelos/reserva-juego';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  usuario: Usuario = new Usuario();
  mostrarFormulario: boolean = false;
  reservasLibrosActivas: ReservaLibro[] = [];
  participacionesActivas: ParticipacionCampeonato[] = [];
  reservasJuegosActivas: ReservaJuego[] = [];
  message: string = '';

  constructor(
    private appComponent: AppComponent,
    private usuarioService: UsuarioService,
    private reservaLibroService: ReservaLibroService,
    private participacionCampeonatoService: ParticipacionCampeonatoService,
    private reservaJuegoService: ReservaJuegoService
  ) { }

  ngOnInit(): void {
    this.usuario = this.appComponent.currentUser;
    // Cargar reservas activas de libros del usuario
    this.reservaLibroService.findAll().subscribe((reservas: ReservaLibro[]) => {
      this.reservasLibrosActivas = reservas.filter(r =>
        r.usuario.id === this.usuario.id && r.fechaDevolucion == null
      );
    });
    // Cargar participaciones activas en campeonatos (EN_CURSO o PENDIENTE)
    this.participacionCampeonatoService.findAll().subscribe((participaciones: ParticipacionCampeonato[]) => {
      this.participacionesActivas = participaciones.filter(p =>
        p.usuario.id === this.usuario.id &&
        (p.campeonato.estado === 'EN_CURSO' || p.campeonato.estado === 'PENDIENTE')
      );
    });
    // Cargar reservas activas de juegos (fecha >= hoy)
    this.reservaJuegoService.findAll().subscribe((reservas: ReservaJuego[]) => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      this.reservasJuegosActivas = reservas.filter(r =>
        r.usuario.id === this.usuario.id && new Date(r.fecha) >= hoy
      );
    });
  }

  // Para mostrar el formulario o ver los datos
  verFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.usuario.contrasena='';
  }

  // Para actualizar los datos de quien entra
  guardarCambios(): void {
    if (this.usuario.contrasena != this.usuario.contrasena2) {
      this.message = 'Las contraseñas no coinciden';
      return;
    }
    this.mostrarFormulario = false;
    this.usuarioService.updateUser(this.usuario).subscribe({
      next: (response: any) => {
        this.message = response.message;
        this.appComponent.currentUser = this.usuario;
      },
      error: () => {
        this.message = 'Error al editar el usuario';
      }
    })
  }
}
