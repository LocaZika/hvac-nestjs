import { Column, Entity, PrimaryColumn } from 'typeorm';
import {
  FuelTypeEnum,
  TradeTypeEnum,
  TransmissionEnum,
} from '../enums/product.enum';
import { ColumnNumericTransformer } from '@utils/transformer.util';

@Entity({ schema: 'products', name: 'cars', synchronize: false })
export class Product {
  @PrimaryColumn({ type: 'smallint', insert: false, update: false })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @PrimaryColumn({ type: 'varchar', length: 15 })
  brand: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
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

  @Column({ type: 'varchar', length: 12 })
  vin: string;

  @Column({ type: 'varchar', length: 12 })
  stock: string;

  @Column({ type: 'jsonb' })
  imgs: JSON;

  @Column({ type: 'jsonb' })
  detailImgs: JSON;
}
