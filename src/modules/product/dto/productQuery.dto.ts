import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductSortByEnum, TransmissionEnum } from '../enums/product.enum';

export class ProductFilterQuery {
  @IsNotEmpty({ message: 'page number is required' })
  page: string;

  @IsEnum(ProductSortByEnum)
  sortBy: ProductSortByEnum;

  @IsOptional()
  brand?: string;

  @IsEnum(TransmissionEnum)
  @IsOptional()
  transmission?: TransmissionEnum;

  @IsOptional()
  model?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  mileage?: string;
}

export class ProductSearchQuery {
  @IsNotEmpty({ message: 'Search query is required' })
  @IsString({ message: 'Search query must be a string' })
  q: string;

  @IsNotEmpty({ message: 'Page number is required' })
  page: string;

  @IsNotEmpty({ message: 'Sort by is required' })
  sortBy: ProductSortByEnum;
}

export class ProductQuery {
  @IsNotEmpty({ message: 'page number is required' })
  page: string;

  @IsEnum(ProductSortByEnum)
  sortBy: ProductSortByEnum;

  @IsOptional()
  lastPrice?: string;

  @IsOptional()
  q?: string;

  @IsOptional()
  brand?: string;

  @IsEnum(TransmissionEnum)
  @IsOptional()
  transmission?: TransmissionEnum;

  @IsOptional()
  model?: string;

  @IsOptional()
  type?: string;
}
