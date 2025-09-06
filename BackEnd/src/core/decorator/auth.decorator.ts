import { RoleEnum } from '@app/prototype/enum';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthPayload {
  id: number;
  email: string;
  role: RoleEnum;
}

export const Auth = createParamDecorator(
  (data: keyof AuthPayload | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<{ user?: AuthPayload }>();
    return data ? req.user?.[data] : req.user;
  },
);
