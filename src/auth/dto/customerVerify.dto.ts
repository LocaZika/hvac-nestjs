import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CustomerVerifyDto {
  @IsNotEmpty({ message: "Customer's id is not empty" })
  @IsNumber({}, { message: "Customer's id must be a number" })
  id: number;

  @IsNotEmpty({ message: "Customer's email is not empty" })
  @IsString({ message: "Customer's email must be a string" })
  email: string;

  @IsNotEmpty({ message: "Customer's activition code is not empty" })
  @IsString({ message: "Customer's activation code must be a string" })
  activationCode: string;
}
