import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "Employee's email must be a valid email address" })
  email: string;

  @IsString({ message: "Employee's password must be a string" })
  password: string;
}
