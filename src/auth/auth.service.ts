import { CustomerService } from '@/modules/users/customer/customer.service';
import { EmployeeService } from '@/modules/users/employee/employee.service';
import { Injectable } from '@nestjs/common';
import { comparePassword } from '@/utils/bcrypt.utils';
import { ResponseData } from '@/global/responseData';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '@/modules/users/customer/entities/customer.entity';
import { Employee } from '@/modules/users/employee/entities/employee.entity';
import { UserEntity } from '@/global/userEntity';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async employeeSignin(email: string, password: string): Promise<Employee> {
    const employee = await this.employeeService.findOneByEmailSignin(email);
    const isCorrectPassword = await comparePassword(
      password,
      employee.password,
    );
    if (!isCorrectPassword) {
      return null;
    }
    delete employee.password;
    return employee;
  }

  async customerSignin(email: string, password: string): Promise<Customer> {
    const customer = await this.customerService.findOneByEmail(email);
    const isCorrectPassword = await comparePassword(
      password,
      customer.password,
    );
    if (!isCorrectPassword) {
      return null;
    }
    delete customer.password;
    return customer;
  }

  async signin(user: UserEntity): Promise<ResponseData<string>> {
    const payload = { id: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { statusCode: 200, ok: true, data: access_token };
  }
}
