import { Injectable } from '@angular/core';
import { Usuario } from '../Modelos/usuario';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private url: string = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  findByCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/correo/${correo}`);
  }

  createUser(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  updateUser(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/${usuario.id}`, usuario);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/registro`, usuario);
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, usuario);
  }

}
