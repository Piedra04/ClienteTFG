import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipacionCampeonato } from '../Modelos/participacion-campeonato';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionCampeonatoService {

  private url: string = 'http://localhost:8080/participacion-campeonato';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ParticipacionCampeonato[]> {
    return this.http.get<ParticipacionCampeonato[]>(this.url);
  }

  createParticipacion(participacion: ParticipacionCampeonato): Observable<ParticipacionCampeonato> {
    return this.http.post<ParticipacionCampeonato>(this.url, participacion);
  }

  updateParticipacion(participacion: ParticipacionCampeonato): Observable<ParticipacionCampeonato> {
    return this.http.put<ParticipacionCampeonato>(`${this.url}/${participacion.id}`, participacion);
  }

  deleteParticipacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}