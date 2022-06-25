export class BusinessException extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, status = 400) {
    super();
    this.message = message;
    this.statusCode = status;
  }
}
