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
export class GestionJuegosComponent implements OnInit{

  formCrear: boolean = false;
  formEditar: boolean = false;
  lista: boolean = true;
  juegos: Juego[] = [];

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
    console.log('Mostrar formulario para crear juego');
    this.formCrear = true;
    this.lista = false;
  }

  showEdit(id: number): void {
    console.log(`Mostrar formulario para editar juego con ID: ${id}`);
    this.formEditar = true;
    this.lista = false;
    const juego = this.juegos.find(j => j.id === id);
    if (juego) {
      (document.getElementById('idJuego') as HTMLInputElement).value = juego.id.toString();
      (document.getElementById('nombreJuego') as HTMLInputElement).value = juego.nombre;
      (document.getElementById('nUnidades') as HTMLInputElement).value = juego.nUnidades.toString();
    }
  }

  onCreate(juego: Juego): void {
    this.juegoService.createGame(juego).subscribe((newJuego: Juego) => {
      this.juegos.push(newJuego);
      this.goBack();
    });
  }

  onEdit(): void {
   
  }

  onRemove(id: number): void {
    this.juegoService.deleteGame(id).subscribe(() => {
      this.juegos = this.juegos.filter(juego => juego.id !== id);
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
