import { Juego } from "./juego";
import { Usuario } from "./usuario";

export class ReservaJuego {

    id!: number;
    fecha!: Date;
    usuario!: Usuario;
    juego!: Juego;
    recreo!: String;
}
