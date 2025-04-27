export class PaginatedResult<T> {
  public readonly items: T;
  public readonly page: number;
  public readonly totalPage: number;
  public readonly lastPaginationValue: string | number;
}
