import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaJuego } from '../Modelos/reserva-juego';

@Injectable({
  providedIn: 'root'
})
export class ReservaJuegoService {

  private url: string = 'http://localhost:8080/reserva-juego';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ReservaJuego[]> {
    return this.http.get<ReservaJuego[]>(this.url);
  }

  findById(id: number): Observable<ReservaJuego> {
    return this.http.get<ReservaJuego>(`${this.url}/${id}`);
  }

  createReserva(reserva: ReservaJuego): Observable<ReservaJuego> {
    return this.http.post<ReservaJuego>(this.url, reserva);
  }

  updateReserva(reserva: ReservaJuego): Observable<ReservaJuego> {
    return this.http.put<ReservaJuego>(`${this.url}/${reserva.id}`, reserva);
  }

  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}