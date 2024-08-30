import { getCurrentDate } from 'src/utils/date.utils';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'products', name: 'cars' })
export class Product {
  @PrimaryColumn({ type: 'smallint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @PrimaryColumn({ type: 'varchar', length: 15 })
  brand: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: ['auto', 'manual', 'mixed'] })
  transmission: 'auto' | 'manual' | 'mixed';

  @Column({ type: 'enum', enum: ['sale', 'rent'] })
  tradeType: 'sale' | 'rent';

  @Column({ type: 'enum', enum: ['gasoline', 'electric', 'mixed'] })
  fuelType: 'gasoline' | 'electric';

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ type: 'smallint' })
  hp: number;

  @Column({ type: 'smallint' })
  model: number;

  @Column({ type: 'smallint' })
  mileage: number;

  @Column({ type: 'date', default: getCurrentDate() })
  created_at: Date;
}
