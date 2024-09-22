export class ResponseData<T> {
  public readonly data: T;
  public readonly message?: string;
  public readonly statusCode?: number;
  public readonly ok?: boolean;
  public readonly page?: number;
  public readonly count?: number;
  public readonly totalPages?: number;
}
