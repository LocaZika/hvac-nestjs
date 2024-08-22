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

  @Column({ type: 'varchar', length: 6 })
  transmission: 'auto' | 'manual';

  @Column({ type: 'varchar', length: 4 })
  tradeType: 'sale' | 'rent';

  @Column({ type: 'varchar', length: 10 })
  fuelType: 'gasoline' | 'electric';

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ type: 'smallint' })
  hp: number;

  @Column({ type: 'smallint' })
  model: number;

  @Column({ type: 'smallint' })
  mileage: number;
}
