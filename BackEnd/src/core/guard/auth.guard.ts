import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ERRORS } from '@app/common/message';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { HttpExceptionHandler } from '@app/common/error';
import { ErrorResponse } from '@app/common/response';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class UserGuard extends JwtAuthGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    const parts = authHeader?.split(' ');

    const token = parts?.length === 2 ? parts[1] : undefined;

    if (!token) {
      throw new UnauthorizedException(ERRORS.SYSTEM.UNAUTHORIZED.msg_code);
    }

    const result = await super.canActivate(context);
    return result as boolean;
  }

  handleRequest(err: unknown, user: any, info: unknown): any {
    const errors: { name?: string }[] = info
      ? Array.isArray(info)
        ? info
        : [info as { name?: string }]
      : [];

    const tokenExpired = errors.find(e => e?.name === 'TokenExpiredError');

    if (tokenExpired) {
      throw new HttpExceptionHandler(
        ErrorResponse.create(
          ERRORS.SYSTEM.THIS_ACCESS_TOKEN_EXPIRED.msg_code,
          HttpStatus.UNAUTHORIZED,
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (err || !user) {
      throw new HttpExceptionHandler(
        ErrorResponse.create(
          ERRORS.SYSTEM.UNAUTHORIZED.msg_code,
          HttpStatus.UNAUTHORIZED,
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
