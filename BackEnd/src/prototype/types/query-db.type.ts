import { FindOptionsWhere } from "typeorm";

export type SelectTree = {
  [key: string]: true | SelectTree;
};

export type FindOptions<T> = {
  fields?: string[];
  relations?: (string)[];
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  paginate?: PaginationDto,
  sort?: SortDto
};

export interface PaginationDto {
  page: number;
  size?: number;
}

export interface SortDto {
  sort_by?: string[];
  order?: ('ASC' | 'DESC')[];
  allowedColumns?: string[]
}