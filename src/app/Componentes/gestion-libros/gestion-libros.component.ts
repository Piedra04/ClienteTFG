import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../Servicios/libro.service';
import { Libro } from '../../Modelos/libro';
import { CommonModule } from '@angular/common';
import { Genero } from '../../Modelos/genero';
import { GeneroService } from '../../Servicios/genero.service';


@Component({
  selector: 'app-gestion-libros',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {

  formCrear: boolean = false;
  formEditar: boolean = false;
  lista: boolean = true;
  libros: Libro[] = [];
  libro: Libro = new Libro();

  generos: Genero[] = [];
  message: string = '';
 

  constructor(private libroService: LibroService, private generoService: GeneroService) { }

  ngOnInit(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;

    this.libroService.findAll().subscribe((data: Libro[]) => {
      this.libros = data;
    });

    this.generoService.findAll().subscribe((data: Genero[]) => {
      this.generos = data;
    });
  }

  showCreate(): void {
    this.formCrear = true;
    this.formEditar = false;
    this.lista = false;
  }

  showEdit(isbn: string): void {
    this.libroService.findByIsbn(isbn).subscribe((libro: Libro) => {
      this.libro = libro;
      this.formEditar = true;
      this.formCrear = false;
      this.lista = false;
    });
  }

  onCreate(): void {
    const form = document.getElementById('createLibroForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (this.libro.unidadesDisponibles > this.libro.unidadesTotales) {
      this.message = 'Las unidades disponibles no pueden ser mayores que las unidades totales.';
      return;
    }
    if (this.libro.unidadesDisponibles === 0) {
      this.libro.estado = 'NO DISPONIBLE';
    } else {
      this.libro.estado = 'DISPONIBLE';
    }
    this.libroService.createBook(this.libro).subscribe({
      next: () => {
        this.libroService.findAll().subscribe((data: Libro[]) => {
          this.libros = data;
          this.libro = new Libro();
          this.message = 'Libro creado correctamente.';
          this.goBack();
        });
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al crear el libro';
      }
    });
  }

  onEdit(): void {
    const form = document.getElementById('editLibroForm') as HTMLFormElement;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (this.libro.unidadesDisponibles > this.libro.unidadesTotales) {
      this.message = 'Las unidades disponibles no pueden ser mayores que las unidades totales.';
      return;
    }
    if (this.libro.unidadesDisponibles === 0) {
      this.libro.estado = 'NO DISPONIBLE';
    } else {
      this.libro.estado = 'DISPONIBLE';
    }
    this.libroService.updateBook(this.libro).subscribe({
      next: () => {
        this.libroService.findAll().subscribe((data: Libro[]) => {
          this.libros = data;
          this.libro = new Libro();
          this.message = 'Libro editado correctamente.';
          this.goBack();
        });
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al editar el libro';
      }
    });
  }

  onRemove(isbn: string): void {
    this.libroService.deleteBook(isbn).subscribe({
      next: () => {
        this.libros = this.libros.filter(libro => libro.isbn !== isbn);
        this.message = 'Libro eliminado correctamente.';
      },
      error: (error) => {
        this.message = error.error?.message || 'Error al eliminar el libro';
      }
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }

  isGeneroSeleccionado(genero: Genero): boolean {
    return this.libro.generos && this.libro.generos.some(g => g.id === genero.id);
  }

  toggleGeneroSeleccionado(genero: Genero, event: any): void {
    if (!this.libro.generos) {
      this.libro.generos = [];
    }
    if (event.target.checked) {
      if (!this.libro.generos.some(g => g.id === genero.id)) {
        this.libro.generos.push(genero);
      }
    } else {
      this.libro.generos = this.libro.generos.filter(g => g.id !== genero.id);
      
    }
  }
}
