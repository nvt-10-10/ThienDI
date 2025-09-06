export interface IFilterQuery {
  page: number;
  size: number;
  search?: string;
  sort?: 'ASC' | 'DESC';
  status?: any;
  sort_by?: string[],
  order?: ('ASC' | 'DESC')[]
}
