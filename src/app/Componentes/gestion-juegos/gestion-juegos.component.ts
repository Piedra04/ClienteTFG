import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Juego } from '../../Modelos/juego';
import { JuegoService } from '../../Servicios/juego.service';

@Component({
  selector: 'app-gestion-juegos',
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-juegos.component.html',
  styleUrl: './gestion-juegos.component.css'
})
export class GestionJuegosComponent implements OnInit {
  formCrear: boolean = false;
  formEditar: boolean = false;
  lista: boolean = true;
  juegos: Juego[] = [];
  juego: Juego = new Juego();
  message: string = '';

  constructor(private juegoService: JuegoService) { }

  ngOnInit(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
    this.juegoService.findAll().subscribe((data: Juego[]) => {
      this.juegos = data;
    });
  }

  showCreate(): void {
    this.formCrear = true;
    this.formEditar = false;
    this.lista = false;
    this.juego = new Juego();
  }

  showEdit(id: number): void {
    this.formEditar = true;
    this.formCrear = false;
    this.lista = false;
    this.juegoService.findById(id).subscribe((juego: Juego) => {
      this.juego = juego;
    });
  }

  onCreate(): void {
    const form = document.getElementById('createGameForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.juegoService.createGame(this.juego).subscribe({
      next: (newJuego: Juego) => {
        this.juegoService.findAll().subscribe((data: Juego[]) => {
          this.juegos = data;
        });
        this.juego = new Juego();
        this.message = 'Juego creado correctamente.';
        this.goBack();
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al crear el juego';
      }
    });
  }

  onEdit(): void {
    const form = document.getElementById('editGameForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.juegoService.updateGame(this.juego).subscribe({
      next: () => {
        this.juegoService.findAll().subscribe((data: Juego[]) => {
          this.juegos = data;
        });
        this.juego = new Juego();
        this.message = 'Juego editado correctamente.';
        this.goBack();
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al editar el juego';
      }
    });
  }

  onRemove(id: number): void {
    this.juegoService.deleteGame(id).subscribe({
      next: () => {
        this.juegos = this.juegos.filter(juego => juego.id !== id);
        this.message = 'Juego eliminado correctamente.';
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al eliminar el juego';
      }
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
