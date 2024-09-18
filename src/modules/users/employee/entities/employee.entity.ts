import { UserEntity } from '@userBase/userEntity.base';
import { Entity } from 'typeorm';

@Entity({ schema: 'users', name: 'employees', synchronize: false })
export class Employee extends UserEntity {}
