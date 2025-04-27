import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'homepage' })
export class HomePage {
  @PrimaryColumn({ type: 'uuid', select: false, insert: false, update: false })
  id: string;

  @Column({ type: 'jsonb' })
  homepage: JSON;
}
