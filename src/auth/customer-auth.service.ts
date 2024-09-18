import { ResponseData } from '@/global/responseData';
import { CustomerService } from '@modules/users/customer/customer.service';
import { Customer } from '@modules/users/customer/entities/customer.entity';
import { comparePassword } from '@/utils/bcrypt.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerAuthService {
  constructor(private readonly customerService: CustomerService) {}

  async customerSignin(
    email: string,
    password: string,
  ): Promise<ResponseData<Customer>> {
    const customer = await this.customerService.findOneByEmail(email);
    const isCorrectPassword = await comparePassword(
      password,
      customer.password,
    );
    if (!isCorrectPassword) {
      return null;
    }
    delete customer.password;
    return { statusCode: 200, ok: true, data: customer };
  }
}
