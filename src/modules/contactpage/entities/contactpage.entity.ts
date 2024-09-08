import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'contactpage' })
export class ContactPage {
  @PrimaryColumn({ type: 'uuid', select: false, insert: false, update: false })
  id: UUID;

  @Column({ type: 'jsonb' })
  contactpage: JSON;
}
