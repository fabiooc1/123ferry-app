export interface TicketPassagerModel {
    id: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: Date;
    tipoId: number;
    passagemId: number;
    precoPagoEmCentavos: number | null;
}