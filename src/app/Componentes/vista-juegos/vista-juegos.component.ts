import { Component } from '@angular/core';
import { Usuario } from '../../Modelos/usuario';
import { Juego } from '../../Modelos/juego';
import { AppComponent } from '../../app.component';
import { JuegoService } from '../../Servicios/juego.service';
import { ReservaJuegoService } from '../../Servicios/reserva-juego.service';
import { ReservaJuego } from '../../Modelos/reserva-juego';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vista-juegos',
  imports: [FormsModule],
  templateUrl: './vista-juegos.component.html',
  styleUrl: './vista-juegos.component.css'
})
export class VistaJuegosComponent {

  juegos!: Juego[];
  usuario!: Usuario;
  reserva: ReservaJuego = new ReservaJuego();
  mensaje: string = '';

  constructor(private appComponent: AppComponent, private juegoService: JuegoService, private reservaJuegoService: ReservaJuegoService) { }

  ngOnInit(): void {
   this.juegoService.findAll().subscribe((data: Juego[]) => {
      this.juegos = data;
    });
    this.usuario = this.appComponent.currentUser;
  }

  reservarJuego(): void {
    const form = document.getElementById('reservarJuego') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.reserva.usuario = this.usuario;
    this.mensaje = '';
    this.reservaJuegoService.createReserva(this.reserva).subscribe({
      next: (reserva: ReservaJuego) => {
        this.mensaje = 'Reserva creada correctamente';
        this.reserva = new ReservaJuego();
      },
      error: (error) => {
        this.mensaje = error.error?.message || 'Error al crear la reserva';
      }
    });
  }

  
}
