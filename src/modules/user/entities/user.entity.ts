import { PrimaryColumn, Column, Entity } from 'typeorm';
import { ROLES } from '@auth/roles/roles.enum';
import { AccountTypeEnum } from '../enums/accountType.enum';

@Entity({ schema: 'users', name: 'users', synchronize: false })
export class User {
  @PrimaryColumn({ type: 'int', insert: false, update: false })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 12 })
  password: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'enum', enum: ROLES, enumName: 'user_role' })
  role: ROLES;

  @Column({ type: 'enum', enum: AccountTypeEnum, enumName: 'account_type' })
  account_type: AccountTypeEnum;

  @Column({ type: 'boolean' })
  is_active: boolean;

  @Column({ type: 'text' })
  code_id: string;

  @Column()
  code_expire: Date;

  @Column({ type: 'timestamptz', insert: false, update: false })
  created_at: Date;

  @Column({ type: 'timestamptz', insert: false, update: false })
  updated_at: Date;
}
