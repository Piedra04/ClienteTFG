import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampeonatoService } from '../../Servicios/campeonato.service';
import { Campeonato } from '../../Modelos/campeonato';

@Component({
  selector: 'app-gestion-campeonatos',
  imports: [FormsModule],
  templateUrl: './gestion-campeonatos.component.html',
  styleUrls: ['./gestion-campeonatos.component.css']
})
export class GestionCampeonatosComponent {
  formCrear: boolean = false;
  formEditar: boolean = false;
  lista: boolean = true;
  campeonatos: Campeonato[] = [];

  constructor(private campeonatoService: CampeonatoService) {}

  ngOnInit(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
    this.campeonatoService.findAll().subscribe((data: Campeonato[]) => {
      this.campeonatos = data;
    });
  }

  showCreate(): void {
    console.log('Mostrar formulario para crear campeonato');
    this.formCrear = true;
    this.lista = false;
  }

  showEdit(id: number): void {
    console.log(`Mostrar formulario para editar campeonato con ID: ${id}`);
    this.formEditar = true;
    this.lista = false;
    const campeonato = this.campeonatos.find(c => c.id === id);
    if (campeonato) {
      (document.getElementById('editId') as HTMLInputElement).value = campeonato.id.toString();
      (document.getElementById('editFechaInicio') as HTMLInputElement).value = new Date(campeonato.fechaInicio).toISOString().split('T')[0];
      (document.getElementById('editFechaFin') as HTMLInputElement).value = new Date(campeonato.fechaFin).toISOString().split('T')[0];
      (document.getElementById('editDescripcion') as HTMLTextAreaElement).value = campeonato.descripcion;
      (document.getElementById('editGanador') as HTMLInputElement).value = campeonato.ganador?.toString() || '';
      (document.getElementById('editJuego') as HTMLInputElement).value = campeonato.juego.toString();
      (document.getElementById('editEstado') as HTMLSelectElement).value = campeonato.estado;
    }
  }

  onCreate(campeonato: Campeonato): void {
    this.campeonatoService.createCampeonato(campeonato).subscribe((newCampeonato: Campeonato) => {
      this.campeonatos.push(newCampeonato);
      this.goBack();
    });
  }

  onEdit(): void {
    console.log('Guardar cambios del campeonato editado');
    // Aquí puedes agregar la lógica para guardar los cambios del campeonato editado
  }

  onRemove(id: number): void {
    this.campeonatoService.deleteCampeonato(id).subscribe(() => {
      this.campeonatos = this.campeonatos.filter(campeonato => campeonato.id !== id);
    });
  }

  goBack(): void {
    this.formCrear = false;
    this.formEditar = false;
    this.lista = true;
  }
}
