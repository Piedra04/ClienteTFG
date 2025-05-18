import { Component } from '@angular/core';
import { ReservaLibroService } from '../../Servicios/reserva-libro.service';
import { ReservaLibro } from '../../Modelos/reserva-libro';
import { LibroService } from '../../Servicios/libro.service';

@Component({
  selector: 'app-devolucion-libros',
  imports: [],
  templateUrl: './devolucion-libros.component.html',
  styleUrl: './devolucion-libros.component.css'
})
export class DevolucionLibrosComponent {
  reservasLibrosPendientes: ReservaLibro[] = [];

  constructor(private reservaLibroService: ReservaLibroService, private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarReservasPendientes();
  }

  // Metodo para cargar las reservas pendientes, es decir, las que aun no tienen fecha de devolucion
  cargarReservasPendientes(): void {
    this.reservaLibroService.findAll().subscribe((reservas: ReservaLibro[]) => {
      this.reservasLibrosPendientes = reservas.filter(r => r.fechaDevolucion == null);
    });
  }

  // Asigna la fecha de hoy a una reserva
  marcarDevuelto(reserva: ReservaLibro): void {
    reserva.fechaDevolucion = new Date();
    
    this.reservaLibroService.updateReserva(reserva).subscribe(() => {
      this.cargarReservasPendientes();
      reserva.libro.unidadesDisponibles += 1;
      this.libroService.updateBook(reserva.libro).subscribe();
    });
  }
}
