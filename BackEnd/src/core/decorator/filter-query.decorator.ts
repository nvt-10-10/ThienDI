// paginate-params.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FilterQueryEnum } from '@app/prototype/enum';
import { IFilterQuery } from '@app/prototype/interfaces';
type OrderType = 'ASC' | 'DESC';
interface FilterQueryOptions {
  sortFields?: SortFields;
  statusType?: 'number' | 'string' | 'boolean' | Record<string, any> | string[];
}
type SortFields = string[];

function normalizeOrder(value: any): OrderType {
  const upper = String(value).toUpperCase();
  return upper === 'DESC' ? 'DESC' : 'ASC';
}

function parseCommaList(value: any): string[] {
  return typeof value === 'string' ? value.split(',').map(v => v.trim()) : [];
}

function isPositiveNumber(value: any, defaultValue: number): number {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : defaultValue;
}

function parseStatus(value: any, expectedType: FilterQueryOptions['statusType']): any {
  if (expectedType === 'number') {
    const parsed = Number(value);
    return isNaN(parsed) ? FilterQueryEnum.Status : parsed;
  }

  if (expectedType === 'boolean') {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return FilterQueryEnum.Status;
  }

  if (expectedType === 'string') {
    return typeof value === 'string' ? value : FilterQueryEnum.Status;
  }

  if (typeof expectedType === 'object') {
    const enumValues = Object.values(expectedType);
    return enumValues.includes(value) ? value : FilterQueryEnum.Status;
  }

  return FilterQueryEnum.Status;
}


export const FilterQuery = createParamDecorator(
  (data: FilterQueryOptions | undefined, ctx: ExecutionContext): IFilterQuery => {
    const request = ctx.switchToHttp().getRequest();
    const { page, size, sort, search, status, sort_by, order } = request.query;

    const rawSortBy = parseCommaList(sort_by);
    const safeSortBy = data.sortFields?.length
      ? rawSortBy.filter(field => data.sortFields.includes(field))
      : rawSortBy;

    const finalSortBy = safeSortBy.length > 0 ? safeSortBy : ['id'];

    const rawOrder = parseCommaList(order);
    const finalOrder = rawOrder.length === finalSortBy.length
      ? rawOrder.map(normalizeOrder)
      : Array(finalSortBy.length).fill('DESC');

    return {
      page: isPositiveNumber(page, FilterQueryEnum.Page),
      size: isPositiveNumber(size, FilterQueryEnum.Size),
      sort: (sort as OrderType) || FilterQueryEnum.Sort,
      search: search || FilterQueryEnum.Search,
      status: parseStatus(status, data?.statusType),
      sort_by: finalSortBy,
      order: finalOrder,
    };
  },
);


