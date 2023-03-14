export interface Pagination<T> {
  current_page: number;
  per_page: number;
  total: null;
  data: Array<T>
}