import { getCurrentDate } from 'src/utils/date.utils';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AccountTypeEnum } from '../types/customer.enum';

@Entity({ schema: 'users', name: 'customers' })
export class Customer {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'enum', enum: AccountTypeEnum })
  account_type: AccountTypeEnum;

  @Column({ type: 'boolean' })
  is_active: boolean;

  @Column({ type: 'text' })
  code_id: string;

  @Column({ type: 'timestamptz' })
  code_expire: Date;

  @PrimaryColumn({ type: 'timestamptz', default: getCurrentDate() })
  created_at: Date;

  @Column({ type: 'timestamptz', default: getCurrentDate() })
  updated_at: Date;
}
