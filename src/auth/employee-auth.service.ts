import { ResponseData } from '@/global/responseData';
import { EmployeeService } from '@/modules/users/employee/employee.service';
import { Employee } from '@/modules/users/employee/entities/employee.entity';
import { comparePassword } from '@/utils/bcrypt.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeAuthService {
  constructor(private readonly employeeService: EmployeeService) {}

  async employeeSignin(
    email: string,
    password: string,
  ): Promise<ResponseData<Employee>> {
    const employee = await this.employeeService.findOneByEmail(email);
    const isCorrectPassword = await comparePassword(
      password,
      employee.password,
    );
    if (!isCorrectPassword) {
      return null;
    }
    delete employee.password;
    return { statusCode: 200, ok: true, data: employee };
  }
}
