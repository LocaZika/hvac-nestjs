import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ORDERSTATUS } from '../enums/orderStatus.enum';
import { ColumnNumericTransformer } from '@utils/transformer.util';

@Entity({ schema: 'users', name: 'orders' })
export class Order {
  @PrimaryColumn({ type: 'smallint', insert: false, update: false })
  id: number;

  @Column({ type: 'int' })
  customer_id: number;

  @Column({ type: 'smallint' })
  product_id: number;

  @Column({ type: 'smallint' })
  quantity: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  paid: number;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  sale_off: number;

  @Column({
    type: 'enum',
    enum: ORDERSTATUS,
    enumName: 'order_status',
    default: ORDERSTATUS.PROCESSING,
  })
  status: ORDERSTATUS;

  @Column({
    type: 'timestamptz',
    insert: false,
    update: false,
    default: () => 'CURRENT_DATE',
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    insert: false,
    update: false,
    default: () => 'NOW()',
  })
  updated_at: Date;
}
