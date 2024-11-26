export class ApiSuccess<T = null> {
  statusCode: number;
  data: T;
  message: string;

  constructor(statusCode: number, data: T, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export class OkResponse<T> extends ApiSuccess<T> {
  constructor(data: T, message: string = "Request succeeded") {
    super(200, data, message);
  }
}

export class CreatedResponse<T> extends ApiSuccess<T> {
  constructor(data: T, message: string = "Resource created successfully") {
    super(201, data, message);
  }
}

export class NoContentResponse extends ApiSuccess<null> {
  constructor(message: string = "No content") {
    super(204, null, message);
  }
}
