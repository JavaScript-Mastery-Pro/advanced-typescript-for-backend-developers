export class ApiError extends Error {
  statusCode: number;
  errorCode?: string;

  constructor(statusCode: number, message: string, errorCode?: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, ApiError);
  }
}

export class NotFoundError extends ApiError {
  constructor(entity: string, errorCode?: string) {
    super(404, `${entity} Not Found`, errorCode || "NOT_FOUND");
  }
}

export class BadRequestError extends ApiError {
  constructor(detail: string, errorCode?: string) {
    super(400, `Bad Request: ${detail}`, errorCode || "BAD_REQUEST");
  }
}

export class UnauthorizedError extends ApiError {
  constructor(detail?: string, errorCode?: string) {
    super(401, detail || "Unauthorized", errorCode || "UNAUTHORIZED");
  }
}

export class ForbiddenError extends ApiError {
  constructor(detail?: string, errorCode?: string) {
    super(403, detail || "Forbidden", errorCode || "FORBIDDEN");
  }
}
