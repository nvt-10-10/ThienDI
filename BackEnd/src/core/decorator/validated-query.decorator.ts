import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common';

export const ValidatedQuery = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const queryParams = request.query;

    const dtoInstance = plainToInstance(value, queryParams, {
      enableImplicitConversion: true,
    });

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints),
      }));
      throw new UnprocessableEntityException({
        http_code: 422,
        msg: 'Validation failed',
        errors: formattedErrors,
      });
    }

    return dtoInstance;
  },
);
