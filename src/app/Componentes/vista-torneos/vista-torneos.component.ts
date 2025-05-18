import { Component } from '@angular/core';
import { JuegoService } from '../../Servicios/juego.service';
import { CampeonatoService } from '../../Servicios/campeonato.service';
import { Juego } from '../../Modelos/juego';
import { Campeonato } from '../../Modelos/campeonato';
import { ParticipacionCampeonatoService } from '../../Servicios/participacion-campeonato.service';
import { ParticipacionCampeonato } from '../../Modelos/participacion-campeonato';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-vista-torneos',
  imports: [],
  templateUrl: './vista-torneos.component.html',
  styleUrl: './vista-torneos.component.css'
})
export class VistaTorneosComponent {

  juegos: Juego[] = [];
  campeonatos: Campeonato[] = [];
  participacion: ParticipacionCampeonato = new ParticipacionCampeonato();
  participaciones: ParticipacionCampeonato[] = [];
  message: string = '';

  constructor(private appComponent: AppComponent, private juegoService: JuegoService, private campeonatoService: CampeonatoService, private participacionCampeonatoService: ParticipacionCampeonatoService) { }

  ngOnInit(): void {
    this.juegoService.findAll().subscribe((data: any[]) => {
      this.juegos = data;
    });

    this.campeonatoService.findAll().subscribe((data: any[]) => {
      this.campeonatos = data;
    });

    this.participacionCampeonatoService.findAll().subscribe((data: ParticipacionCampeonato[]) => {
      this.participaciones = data;
    });
  }

  get juegosConCampeonatosPendientes(): Juego[] {
    return this.juegos.filter(juego =>
      this.campeonatos.some(c => c.juego?.id === juego.id && c.estado === 'PENDIENTE')
    );
  }

  usuarioApuntado(campeonato: Campeonato): boolean {
    return this.participaciones.some(p =>
      String(p.campeonato?.id) === String(campeonato.id) &&
      String(p.usuario?.id) === String(this.appComponent.currentUser.id)
    );
  }

  apuntarse(campeonato: Campeonato): void {
    this.participacion.campeonato = campeonato;
    this.participacion.usuario = this.appComponent.currentUser;
    this.participacionCampeonatoService.createParticipacion(this.participacion).subscribe({
      next: (reserva: any) => {
        this.message = 'Te has apuntado al campeonato correctamente';
        this.participacion = new ParticipacionCampeonato();
        // Recargar participaciones tras apuntarse
        this.participacionCampeonatoService.findAll().subscribe((data: ParticipacionCampeonato[]) => {
          this.participaciones = data;
        });
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al apuntarse al campeonato';
      }
    })
  }
}
