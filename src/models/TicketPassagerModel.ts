import { PassagerTypeModel } from "./PassagerTypeModel";

export interface TicketPassagerModel {
    id: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    tipoId: number;
    tipo: PassagerTypeModel;
    passagemId: number;
    precoPagoEmCentavos: number | null;
}