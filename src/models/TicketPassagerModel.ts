export interface TicketPassagerModel {
    id: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    tipoId: number;
    passagemId: number;
    precoPagoEmCentavos: number | null;
}