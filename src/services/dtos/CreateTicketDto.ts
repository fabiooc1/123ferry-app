export interface CreateTicketDto {
    viagemId: number
    passageiros: {
        tipoId: number,
        nomeCompleto: string
        cpf: string
        dataNascimento: string
    }[],
    veiculos: {
        placa: string
        veiculoId: number
        motoristaCpf: string
    }[]
}