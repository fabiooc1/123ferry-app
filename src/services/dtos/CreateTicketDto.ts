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
        veiculoCategoriaId: number
        motoristaCpf: string
    }[]
}