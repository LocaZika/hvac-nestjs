import { getCurrentDate } from '@utils/date.utils';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
  FuelTypeEnum,
  TradeTypeEnum,
  TransmissionEnum,
} from '../types/product.enum';

@Entity({ schema: 'products', name: 'cars', synchronize: false })
export class Product {
  @PrimaryColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @PrimaryColumn({ type: 'varchar', length: 15 })
  brand: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: TransmissionEnum })
  transmission: TransmissionEnum;

  @Column({ type: 'enum', enum: TradeTypeEnum })
  tradeType: TradeTypeEnum;

  @Column({ type: 'enum', enum: FuelTypeEnum })
  fuelType: FuelTypeEnum;

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ type: 'smallint' })
  hp: number;

  @Column({ type: 'smallint' })
  model: number;

  @Column({ type: 'smallint' })
  mileage: number;

  @Column({ type: 'jsonb' })
  imgs: JSON;

  @Column({ type: 'jsonb' })
  detailImgs: JSON;

  @Column({ type: 'date', default: getCurrentDate() })
  created_at: Date;
}
