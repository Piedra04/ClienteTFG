import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../Modelos/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private url: string = 'http://localhost:8080/genero';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.url);
  }

  findById(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.url}/${id}`);
  }

  createGenero(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.url, genero);
  }

  updateGenero(genero: Genero): Observable<Genero> {
    return this.http.put<Genero>(`${this.url}/${genero.id}`, genero);
  }

  deleteGenero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}