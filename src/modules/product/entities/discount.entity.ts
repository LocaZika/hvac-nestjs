import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ColumnNumericTransformer } from '@utils/transformer.util';

@Entity({ schema: 'products', name: 'discount', synchronize: false })
export class Discount {
  @PrimaryColumn({ type: 'smallint', insert: false, update: false })
  id: number;

  @Column({ type: 'int' })
  product_id: number;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  percent_discount: number;
}
