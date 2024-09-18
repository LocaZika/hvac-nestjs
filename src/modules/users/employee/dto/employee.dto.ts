import { IsValidPhoneNumber } from '@/decorators/isValidPhoneNumber.decorator';
import { IsEmail, IsString } from 'class-validator';

export class EmployeeDto {
  @IsEmail()
  email: string;

  @IsString({ message: "Employee's password must be a string!" })
  password: string;

  @IsValidPhoneNumber()
  phone: string;

  @IsString({ message: "Employee's name must be a string!" })
  name: string;

  @IsString({ message: "Employee's address must be a string!" })
  address: string;
}
