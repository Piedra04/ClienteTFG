import { Juego } from "./juego";
import { Usuario } from "./usuario";

export class Campeonato {

    id!: number;
    nombre!: string;
    fechaInicio!: Date;
    fechaFin!: Date;
    descripcion!: string;
    estado!: string;
    ganador!: Usuario;
    juego!: Juego;
    
}
