export class HttpException extends Error {
  statusCode: number;
  status: number;
  message: string;
  error: string | null;

  constructor(statusCode: number, status: number, message: string, error: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.error = error;

  }

}