import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ProductSortByEnum, TransmissionEnum } from '../types/product.enum';

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

  @IsOptional()
  priceRange?: Array<number>;
}
