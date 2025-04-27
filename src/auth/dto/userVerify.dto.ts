import { IsNotEmpty, IsString } from 'class-validator';

export class UserVerifyDto {
  @IsNotEmpty({ message: "Customer's activition code is not empty" })
  @IsString({ message: "Customer's activation code must be a string" })
  activationCode: string;
}
