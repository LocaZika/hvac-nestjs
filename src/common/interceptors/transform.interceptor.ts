import { IS_PAGINATED } from '@decorators/pagination.decorator';
import { PaginatedResult } from '@global/paginatedResult';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const isPaginated = this.reflector.getAllAndOverride<boolean>(
      IS_PAGINATED,
      [context.getHandler(), context.getClass()],
    );
    return next.handle().pipe(
      map((data: any) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        if (isPaginated && data.items) {
          const { page, totalPage, items, lastPaginationValue } =
            data as PaginatedResult<any>;
          return {
            ok: true,
            statusCode,
            page,
            totalPage,
            lastPaginationValue,
            data: items,
          };
        }
        return {
          ok: true,
          statusCode,
          data,
        };
      }),
    );
  }
}
