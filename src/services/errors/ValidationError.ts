export type ValidationResponseDataType = {
  field: 'email' | 'cpf' | 'phone' | 'password';
  message: string;
};

export class ValidationError extends Error {
  public field: 'email' | 'cpf' | 'phone' | 'password';

  constructor({ field, message }: ValidationResponseDataType) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}