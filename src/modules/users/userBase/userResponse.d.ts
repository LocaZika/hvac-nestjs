import { Customer } from '../customer/entities/customer.entity';
import { Employee } from '../employee/entities/employee.entity';

interface ISignInResponse {
  user: Partial<Customer & Employee>;
  access_token: string;
}

interface IVerifyCustomerResponse {
  id: number;
  name: string;
  email: string;
}
