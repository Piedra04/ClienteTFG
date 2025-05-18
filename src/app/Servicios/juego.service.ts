import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from '../Modelos/juego';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private url: string = 'http://localhost:8080/juego';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.url);
  }

  findById(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.url}/${id}`);
  }

  createGame(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(this.url, juego);
  }

  updateGame(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(`${this.url}/${juego.id}`, juego);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
