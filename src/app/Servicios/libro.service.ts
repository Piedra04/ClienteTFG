import { Injectable } from '@angular/core';
import { Libro } from '../Modelos/libro';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private url: string = 'http://localhost:8080/libro';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url);
  }

  createBook(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.url, libro);
  }

  updateBook(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.url}/${libro.isbn}`, libro);
  }

  deleteBook(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${isbn}`);
  }
}
