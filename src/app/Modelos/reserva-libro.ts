import { Libro } from "./libro";
import { Usuario } from "./usuario";

export class ReservaLibro {

    id!: number;
    fechaAdquisicion!: Date;
    fechaDevolucion!: Date;
    libro!: Libro;
    usuario!: Usuario;

}
