import { PaginationDto, SortDto } from "@app/prototype/types";

/**
 * @class Paginate
 * @output
 * {
 *     "items": [],
 *     "meta": {
 *          "page": 5
 *          "size": 10,
 *          "total_items": 100,
 *          "total_pages": 10
 *     }
 * }
 * @usage
 *  return new Paginate(items, totalItems, page, size);
 */
type MetaType = {
  page: number;
  size: number;
  total_items: number;
  total_pages: number;
}
export class Paginate<T> {
  private meta: MetaType;

  constructor(
    private items: T[],
    private total: number = 0,
    private page: number = 1,
    private size: number = 10,
  ) {
    this.meta = this.initMeta();
    this.delete();
  }

  private initMeta(): {
    page: number;
    size: number;
    total_items: number;
    total_pages: number;
  } {
    const size = this.size;
    const page = this.page;
    const pages = Math.ceil(this.total / this.size);

    return {
      page,
      size,
      total_items: this.total,
      total_pages: pages,
    };
  }

  public updateItems(items: T[]): void {
    this.items = items;
  }

  public updateMeta(meta: MetaType) {
    this.meta = meta
  }

  public getItems(): T[] {
    return this.items;
  }

  public getMeta(): MetaType {
    return this.meta;
  }

  private delete(): void {
    delete this.total;
    delete this.page;
    delete this.size;
  }
}


export interface PaginationOptions {
  page: number;
  take: number;
  skip: number;
  orderBy?: Record<string, 'ASC' | 'DESC'>;
}

export interface PaginateQueryOptions {
  page: number;
  take: number;
  skip: number;
  orderBy: Record<string, 'ASC' | 'DESC'>;
}

export function buildPaginationOptions(paginate: PaginationDto, sort: SortDto): PaginationOptions {
  const page = paginate.page ?? 1
  const take = paginate.size ?? 10;
  const skip = (page - 1) * take;
  const orderBy: Record<string, 'ASC' | 'DESC'> = {};

  sort.sort_by.forEach((column, index) => {
    if (sort?.allowedColumns?.includes(column)) {
      orderBy[column] = sort.order[index] === 'ASC' ? 'ASC' : 'DESC';
    }
  });

  const isEmptyOrder = !orderBy || Object.keys(orderBy).length === 0;

  return { take, skip, orderBy: isEmptyOrder ? { 'created_at': 'DESC' } : orderBy, page };
}