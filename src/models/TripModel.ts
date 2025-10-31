export interface TripModel {
  id: bigint;
  ferryId: bigint;
  rotaId: bigint;
  dataPartida: string;
  dataChegada: string;
  criadaPorId: bigint;
  criadaEm: string;
  atualizadaEm: string;
  ferry: {
    id: bigint;
    nome: string;
    maximoDePessoas: number;
    maximoDeVeiculosEmM2: number;
    registradoEm: string;
    atualizadoEm: string;
  };
  rota: {
    id: number;
    nome: string;
    origemId: bigint;
    destinoId: bigint;
  };
  quantidadeDePassageiros: number;
};
