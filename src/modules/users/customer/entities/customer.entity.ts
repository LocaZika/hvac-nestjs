import { getCurrentDate } from '@utils/date.utils';
import { Column, Entity } from 'typeorm';
import { AccountTypeEnum } from '../types/customer.enum';
import { UserEntity } from '@global/userEntity';

@Entity({ schema: 'users', name: 'customers' })
export class Customer extends UserEntity {
  @Column({ type: 'enum', enum: AccountTypeEnum, enumName: 'account_type' })
  account_type: AccountTypeEnum;

  @Column({ type: 'boolean' })
  is_active: boolean;

  @Column({ type: 'text' })
  code_id: string;

  @Column({ type: 'timestamptz' })
  code_expire: Date;

  @Column({ type: 'timestamptz', default: getCurrentDate() })
  updated_at: Date;
}