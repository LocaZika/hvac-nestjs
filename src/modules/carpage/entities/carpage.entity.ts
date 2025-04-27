import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'carpage' })
export class CarPage {
  @PrimaryColumn({ type: 'uuid', select: false, update: false, insert: false })
  id: string;

  @Column({ type: 'jsonb' })
  carpage: JSON;
}
