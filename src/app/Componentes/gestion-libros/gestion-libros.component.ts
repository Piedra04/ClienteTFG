import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../Servicios/libro.service';
import { Libro } from '../../Modelos/libro';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gestion-libros',
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {
  
  formCrear: boolean = false;
  formEditar: boolean = false;
  lista: boolean = true;
  libros: Libro[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
    this.libroService.findAll().subscribe((data: Libro[]) => {
      this.libros = data;
    });
  }

  showCreate(): void {
    console.log('Mostrar formulario para crear libro');
    this.formCrear = true;
    this.lista = false;
  }

  showEdit(isbn: string): void {
    console.log(`Mostrar formulario para editar libro con ISBN: ${isbn}`);
    this.formEditar = true;
    this.lista = false;
    const libro = this.libros.find(l => l.isbn === isbn);
    if (libro) {
      (document.getElementById('editIsbn') as HTMLInputElement).value = libro.isbn;
      (document.getElementById('editTitulo') as HTMLInputElement).value = libro.titulo;
      (document.getElementById('editAutor') as HTMLInputElement).value = libro.autor;
      (document.getElementById('editSinopsis') as HTMLTextAreaElement).value = libro.sinopsis;
      (document.getElementById('editCurso') as HTMLSelectElement).value = libro.generos[0]?.nombre || '';
      (document.getElementById('editEstado') as HTMLSelectElement).value = libro.unidadesDisponibles > 0 ? 'Disponible' : 'NoDisponible';
    }
  }

  onCreate(libro: Libro): void {
    
  }

  onEdit(): void {
   
  }

  onRemove(isbn: string): void {
    this.libroService.deleteBook(isbn).subscribe(() => {
      this.libros = this.libros.filter(libro => libro.isbn !== isbn);
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
