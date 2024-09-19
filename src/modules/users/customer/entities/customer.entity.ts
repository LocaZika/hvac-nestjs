import { Column, Entity } from 'typeorm';
import { AccountTypeEnum } from '../types/customer.enum';
import { UserEntity } from '@userBase/userEntity.base';
import dayjs from 'dayjs';

@Entity({ schema: 'users', name: 'customers' })
export class Customer extends UserEntity {
  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    enumName: 'account_type',
    default: AccountTypeEnum.local,
  })
  account_type: AccountTypeEnum;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'text' })
  code_id: string;

  @Column({ type: 'timestamptz' })
  code_expire: Date;

  @Column({ type: 'timestamptz', default: dayjs().toDate() })
  updated_at: Date;
}
