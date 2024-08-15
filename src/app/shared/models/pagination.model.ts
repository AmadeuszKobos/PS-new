export interface PaginationReponse {
  objects: any;
  total: number;
  skip: number
  limit: number
}

export interface Pagination{
  first: number;
  rows: number;
  _page: number;
}