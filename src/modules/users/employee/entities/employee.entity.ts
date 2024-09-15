import { UserEntity } from '@global/userEntity';
import { Entity } from 'typeorm';

@Entity({ schema: 'users', name: 'employees', synchronize: false })
export class Employee extends UserEntity {}
