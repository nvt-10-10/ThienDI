// filter-query-swagger.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function FilterQuerySwagger(sortFields: string[] = ['id']) {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      schema: { default: 1, type: 'number', minimum: 1 },
      required: false,
      description: 'Page number (default: 1)',
    }),
    ApiQuery({
      name: 'size',
      schema: { default: 20, type: 'number' },
      required: false,
      description: 'Items per page (default: 20)',
    }),
    ApiQuery({
      name: 'sort_by',
      schema: { type: 'string', example: sortFields.join(',') },
      required: false,
      description: `Comma-separated fields to sort by. Allowed: ${sortFields.join(', ')}`,
    }),
    ApiQuery({
      name: 'order',
      schema: { type: 'string', example: 'DESC,ASC' },
      required: false,
      description: 'Comma-separated sort order for each field (ASC/DESC)',
    }),
    ApiQuery({
      name: 'search',
      schema: { type: 'string' },
      required: false,
      description: 'Search keyword',
    })
  );
}
