import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipacionRonda } from '../Modelos/participacion-ronda';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionRondaService {

  private url: string = 'http://localhost:8080/participacion-ronda';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ParticipacionRonda[]> {
    return this.http.get<ParticipacionRonda[]>(this.url);
  }

  createParticipacion(participacion: ParticipacionRonda): Observable<ParticipacionRonda> {
    return this.http.post<ParticipacionRonda>(this.url, participacion);
  }

  updateParticipacion(participacion: ParticipacionRonda): Observable<ParticipacionRonda> {
    return this.http.put<ParticipacionRonda>(`${this.url}/${participacion.id}`, participacion);
  }

  deleteParticipacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}