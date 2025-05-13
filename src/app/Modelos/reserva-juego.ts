import { Juego } from "./juego";
import { Usuario } from "./usuario";

export class ReservaJuego {

    id!: number;
    fecha!: Date;
    juegoId!: number;
    usuario!: Usuario;
    juego!: Juego;
}
