import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CustomerDto {
  @IsEmail({}, { message: 'Invalid email address!' })
  email: string;

  @IsStrongPassword({ minUppercase: 0 })
  password: string;

  @MinLength(3, { message: 'Name must be at least 3 characters!' })
  @MaxLength(50, { message: 'Name must be at most 50 characters!' })
  @IsString({ message: 'Name must be a string!' })
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsString({ message: "Customer's address must be a string!" })
  @MinLength(8, { message: "Customer's address must be at least 8 character!" })
  address: string;
}
