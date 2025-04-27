import { IsValidPhoneNumber } from '@decorators/isValidPhoneNumber.decorator';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address!' })
  email: string;

  @IsOptional()
  @IsStrongPassword({
    minUppercase: 0,
    minLength: 8,
    minLowercase: 3,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @IsOptional()
  @MinLength(3, { message: 'Name must be at least 3 characters!' })
  @MaxLength(50, { message: 'Name must be at most 50 characters!' })
  @IsString({ message: 'Name must be a string!' })
  name: string;

  @IsOptional()
  @IsValidPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string!' })
  @MinLength(8, { message: 'Address must be at least 8 character!' })
  address: string;
}
