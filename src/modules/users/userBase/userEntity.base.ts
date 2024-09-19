import { PrimaryColumn, Column } from 'typeorm';
import { User_Roles } from './userRole.enum';
import dayjs from 'dayjs';

export class UserEntity {
  @PrimaryColumn({ type: 'int', insert: false, update: false })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'enum', enum: User_Roles, enumName: 'user_roles' })
  role: User_Roles;

  @PrimaryColumn({
    type: 'timestamptz',
    insert: false,
    update: false,
    default: dayjs().toDate(),
  })
  created_at: Date;
}
