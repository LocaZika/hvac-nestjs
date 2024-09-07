import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'layout' })
export class Layout {
  @PrimaryColumn({ type: 'uuid', insert: false, update: false, select: false })
  id: string;

  @Column({ type: 'jsonb' })
  layout: JSON;
}
