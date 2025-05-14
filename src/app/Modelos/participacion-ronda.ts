import { Ronda } from "./ronda";
import { Usuario } from "./usuario";

export class ParticipacionRonda {

    id!: number;
    resultado!: string;
    ronda!: Ronda;
    usuario!: Usuario;
}
