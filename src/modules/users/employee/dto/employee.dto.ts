import { IsEmail, IsString, IsPhoneNumber } from 'class-validator';

export class EmployeeDto {
  @IsEmail()
  email: string;

  @IsString({ message: "Employee's password must be a string!" })
  password: string;

  @IsPhoneNumber('VN')
  phone: string;

  @IsString({ message: "Employee's name must be a string!" })
  name: string;
}
