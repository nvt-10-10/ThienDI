export class BaseResponse {
  http_code: number;
  msg: string;
}

export class HttpResponse<T> extends BaseResponse {
  data: T | null;
  errors?: T | null;

  constructor(http_code: number, msg: string, data?: T, errors?: T) {
    super();
    this.http_code = http_code;
    this.msg = msg;
    if (data !== undefined) this.data = data;
    if (errors !== undefined) this.errors = errors;
  }

  static success<T>(
    msg: string,
    data?: T,
    http_code: number = 200,
  ): HttpResponse<T> {
    return new HttpResponse<T>(http_code, msg, data);
  }

  static error<T>(
    msg: string,
    http_code: number = 500,
    errors?: T,
  ): HttpResponse<T> {
    return new HttpResponse<T>(http_code, msg, undefined, errors);
  }
}


export class ErrorResponse<T> extends BaseResponse {
  errors?: T | null;

  constructor(http_code: number, msg: string, errors?: T) {
    super();
    this.http_code = http_code;
    this.msg = msg;
    this.errors = errors || null;
  }

  static create<T>(
    msg: string,
    http_code: number = 500,
    errors?: T,
  ): ErrorResponse<T> {
    return new ErrorResponse<T>(http_code, msg, errors);
  }
}
