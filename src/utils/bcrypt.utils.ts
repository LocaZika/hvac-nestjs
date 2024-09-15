import { BadRequestException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
const saltOrRounds: number = 10;
export function hashPassword(value: string): void {
  return hash(value, saltOrRounds, function (err, hash) {
    if (err) {
      throw new Error(err.message);
    }
    return hash;
  });
}

export function comparePassword(
  password: string,
  encodedPassword: string,
): void {
  return compare(password, encodedPassword, function (err, result) {
    if (!result) {
      throw new BadRequestException('Wrong password!');
    }
    return result;
  });
}
