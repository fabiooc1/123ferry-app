import { PassagerTypeModel } from "./PassagerTypeModel";

export interface TicketPassagerModel {
    id: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    tipo: PassagerTypeModel;
    precoPagoEmCentavos: number | null;
}