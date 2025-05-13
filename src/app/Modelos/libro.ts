import { Genero } from "./genero";

export class Libro {

    isbn!: string;
    titulo!: string;
    autor!: string;
    unidadesTotales!: number;
    unidadesDisponibles!: number;
    generos!: Genero[];
    sinopsis!: string;
    
}
