import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ORDERSTATUS } from '../enums/orderStatus.enum';
import IsNumeric from '@decorators/isNumeric.decorator';

export class OrderDto {
  @IsOptional()
  @IsNumber()
  customer_id: number;

  @IsOptional()
  @IsNumber()
  product_id: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumeric({ max: 9999999, precision: 10, scale: 2 })
  paid: number;

  @IsOptional()
  @IsNumeric({ max: 99, precision: 4, scale: 2 })
  sale_off: number;

  @IsOptional()
  @IsEnum(ORDERSTATUS)
  status?: ORDERSTATUS;
}
