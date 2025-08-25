// errors/HttpError.ts
export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

// 400 - Bad Request
export class BadRequestError extends HttpError {
  constructor(message = "Requisição inválida") {
    super(message, 400);
  }
}

// 404 - Not Found
export class NotFoundError extends HttpError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

// 409 - Conflict
export class ConflictError extends HttpError {
  constructor(message = "Conflito de dados") {
    super(message, 409);
  }
}

// 500 - Internal Server Error
export class InternalServerError extends HttpError {
  constructor(message = "Erro interno do servidor") {
    super(message, 500);
  }
}
