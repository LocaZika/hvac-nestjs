import { ROLES } from '@auth/roles/roles.enum';

type TCustomerCount = [{ count: number }];

type TUserQuery = {
  id?: string;
  email?: string;
  role?: ROLES;
  page: string;
};
