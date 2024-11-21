import {
  TransmissionEnum,
  TradeTypeEnum,
  FuelTypeEnum,
} from '@/modules/product/types/product.enum';

export class RawData {
  id: number | string;

  name: string;

  brand?: string;

  price?: number;

  discount?: number;

  transmission?: TransmissionEnum;

  tradeType?: TradeTypeEnum;

  fuelType?: FuelTypeEnum;

  type?: string;

  hp?: number;

  model?: number;

  mileage?: number;

  vin?: string;

  stock?: string;

  imgs?: JSON;

  detailImgs?: JSON;

  created_at: Date;

  updated_at: Date;
}
