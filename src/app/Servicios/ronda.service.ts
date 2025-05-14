import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ronda } from '../Modelos/ronda';

@Injectable({
  providedIn: 'root'
})
export class RondaService {

  private url: string = 'http://localhost:8080/ronda';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Ronda[]> {
    return this.http.get<Ronda[]>(this.url);
  }

  createRonda(ronda: Ronda): Observable<Ronda> {
    return this.http.post<Ronda>(this.url, ronda);
  }

  updateRonda(ronda: Ronda): Observable<Ronda> {
    return this.http.put<Ronda>(`${this.url}/${ronda.id}`, ronda);
  }

  deleteRonda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}