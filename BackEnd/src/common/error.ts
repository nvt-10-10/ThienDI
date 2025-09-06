import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './response';

export class HttpExceptionHandler<T> extends HttpException {
    constructor(error: ErrorResponse<T>, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(
            error,
            status,
        );
    }
}
