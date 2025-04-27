import { IsEnum, IsInt, IsNumber, IsString, Length } from 'class-validator';
import {
  FuelTypeEnum,
  TradeTypeEnum,
  TransmissionEnum,
} from '../enums/product.enum';

export class ProductDto {
  @IsString({ message: "Product's name must be a string!" })
  @Length(10, 50, {
    message:
      'Product name must greater than 10 characters and less than 50 characters',
  })
  name: string;

  @IsString({ message: "Product's name must be a string!" })
  brand: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Product's price must be a number with 2 decimal places" },
  )
  price: number;

  @IsEnum(TransmissionEnum)
  transmission: TransmissionEnum;

  @IsEnum(TradeTypeEnum)
  tradeType: TradeTypeEnum;

  @IsEnum(FuelTypeEnum)
  fuelType: FuelTypeEnum;

  @IsString({ message: "Product's type must be a string!" })
  type: string;

  @IsInt({ message: "Product's hp must be a integer!" })
  hp: number;

  @IsInt({ message: "Product's model must be a integer!" })
  model: number;

  @IsInt({ message: "Product's mileage must be a integer!" })
  mileage: number;

  @IsString({ message: "Product's vin must be a string!" })
  @Length(10, 17, {
    message: 'Product vin must be at least 17 characters',
  })
  vin: string;

  @IsString({ message: "Product's stock must be a string!" })
  @Length(10, 17, {
    message: 'Product stock must be at least 17 characters',
  })
  stock: string;
}
