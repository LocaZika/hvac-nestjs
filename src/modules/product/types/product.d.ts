import { FindOperator } from 'typeorm';
import { ProductSortByEnum, TransmissionEnum } from './product.enum';

type TProductConditions = {
  name: FindOperator<string>;
  brand: string;
  transmission: TransmissionEnum;
  type: string;
  model: number;
  lastPrice: number;
  sortBy: ProductSortByEnum;
};
