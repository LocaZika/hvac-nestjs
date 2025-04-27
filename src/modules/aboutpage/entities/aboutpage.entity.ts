import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'aboutpage' })
export class AboutPage {
  @PrimaryColumn({ type: 'uuid', select: false, insert: false, update: false })
  id: string;

  @Column({ type: 'jsonb' })
  aboutpage: JSON;
}
