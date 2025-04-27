import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Statistic {
  @PrimaryColumn({ type: 'text' })
  month: string;

  @Column({ type: 'jsonb' })
  result: JSON;
}
