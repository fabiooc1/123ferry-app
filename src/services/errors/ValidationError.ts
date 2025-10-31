export type ValidationResponseDataType = {
  field: 'email' | 'cpf' | 'phone';
  message: string;
};

export class ValidationError extends Error {
  public field: 'email' | 'cpf' | 'phone';

  constructor({ field, message }: ValidationResponseDataType) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}