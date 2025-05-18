import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campeonato } from '../Modelos/campeonato';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private url: string = 'http://localhost:8080/campeonato';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Campeonato[]> {
    return this.http.get<Campeonato[]>(this.url);
  }

  findById(id: number): Observable<Campeonato> {
    return this.http.get<Campeonato>(`${this.url}/${id}`);
  }

  createCampeonato(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(this.url, campeonato);
  }

  updateCampeonato(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(`${this.url}/${campeonato.id}`, campeonato);
  }

  deleteCampeonato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
