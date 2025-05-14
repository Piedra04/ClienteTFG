import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaLibro } from '../Modelos/reserva-libro';

@Injectable({
  providedIn: 'root'
})
export class ReservaLibroService {

  private url: string = 'http://localhost:8080/reserva-libro';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ReservaLibro[]> {
    return this.http.get<ReservaLibro[]>(this.url);
  }

  createReserva(reserva: ReservaLibro): Observable<ReservaLibro> {
    return this.http.post<ReservaLibro>(this.url, reserva);
  }

  updateReserva(reserva: ReservaLibro): Observable<ReservaLibro> {
    return this.http.put<ReservaLibro>(`${this.url}/${reserva.id}`, reserva);
  }

  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}