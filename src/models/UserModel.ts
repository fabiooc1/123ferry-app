import { PerfilModel } from "./PerfilModel";

export interface UserModel {
  id: number,
  nomeCompleto: string,
  email: string,
  cpf: string,
  dataNascimento: string,
  registradoEm: string,
  atualizadoEm: string,
  perfil: PerfilModel
}