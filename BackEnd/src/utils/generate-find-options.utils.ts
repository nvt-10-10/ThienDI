import { IFilterQuery } from "@app/prototype/interfaces";
import { FindOptions } from "@app/prototype/types";
import { FindOptionsWhere } from "typeorm";

interface GenerateFindOptionsConfig<T> {
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  filter?: IFilterQuery;
  fields?: string[];
  relations?: string[];
  allowedColumns?: string[];
  defaultSort?: string[];
}

export function generateFindOptions<T>({
  where: externalWhere,
  filter,
  fields,
  relations,
  allowedColumns = ["created_at"],
  defaultSort = ["created_at"],
}: GenerateFindOptionsConfig<T>): FindOptions<T> {

  const finalWhere: any = {
    ...(externalWhere || {})
  };

  return {
    where: finalWhere,
    fields,
    paginate: {
      page: filter?.page,
      size: filter?.size,
    },
    relations,
    sort: {
      allowedColumns,
      sort_by: filter?.sort_by ?? defaultSort,
      order: filter?.order ?? ["DESC"],
    },
  };
}
