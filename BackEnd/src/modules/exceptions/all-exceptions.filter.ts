import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
  UnauthorizedException,
  BadRequestException,
  HttpException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppException } from './app.exception';
import { ERRORS } from 'src/common/message';

type BaseResponseType<T> = {
  http_code: number;
  msg: string;
  data?: T | null;
};

type BaseExceptionResponseType<T> = BaseResponseType<unknown> & {
  errors?: T | null;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): BaseExceptionResponseType<any> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    this.logger.error(
      `[${req.method}] ${req.url} - Exception: ${JSON.stringify(exception)}`
    );

    if (exception instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).json({
        http_code: HttpStatus.NOT_FOUND,
        msg: exception.message,
      } satisfies BaseExceptionResponseType<null>);
    }

    if (exception instanceof BadRequestException) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        http_code: HttpStatus.BAD_REQUEST,
        msg: exception.message,
      } satisfies BaseExceptionResponseType<null>);
    }

    if (exception instanceof UnprocessableEntityException) {
      const response = exception.getResponse();
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        http_code: HttpStatus.UNPROCESSABLE_ENTITY,
        msg: typeof response === 'object' && 'message' in response
          ? (response as any).message
          : 'Unprocessable Entity',
        errors: response,
      } satisfies BaseExceptionResponseType<unknown>);
    }

    if (exception instanceof UnauthorizedException) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        http_code: HttpStatus.UNAUTHORIZED,
        msg: ERRORS.SYSTEM.UNAUTHORIZED.msg_code,
      } satisfies BaseExceptionResponseType<null>);
    }

    if (exception instanceof AppException) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        http_code: HttpStatus.BAD_REQUEST,
        msg: 'BAD_REQUEST',
      } satisfies BaseExceptionResponseType<null>);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      return res.status(status).json(
        typeof response === 'object'
          ? { http_code: status, ...(response as object) }
          : { http_code: status, msg: response }
      );
    }

    // Fallback: Unhandled error
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      http_code: HttpStatus.INTERNAL_SERVER_ERROR,
      msg:
        (exception as any)?.message ??
        ERRORS.SYSTEM.SERVER_ERROR.msg_code ??
        'Internal server error',
    } satisfies BaseExceptionResponseType<null>);
  }
}
