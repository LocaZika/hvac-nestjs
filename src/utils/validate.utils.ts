import { UserEntity } from '@userBase/userEntity.base';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDto } from '@/modules/users/userBase/userDto.base';

/**
 * Checks if the value matches the pattern.
 * @param {RegExp} regex Set pattern to match.
 * @param {string} value Set value to match.
 * @returns {boolean} true if value match.
 */
export function isValid(regex: RegExp, value: string): boolean {
  if (regex.test(value) == true) {
    return true;
  }
  return false;
}
/**
 * Checks if the value matches the pattern. If true, it throws an exception.
 * @param {RegExp} regex Set pattern to match.
 * @param {string} value Set value to match.
 * @param {any} exception Set the exception class.
 */
export function stringValidator(
  regex: RegExp,
  value: string,
  exception?: any,
): void {
  if (isValid(regex, value) == true) {
    throw exception;
  }
}
type TNumberValidator = {
  greater?: number;
  smaller?: number;
  equal?: number;
  greaterOrEqual?: number;
  smallerOrEqual?: number;
};
/**
 * Checks if a number is not satisfy the condition, throw BadRequest exception
 * @param {number} value Set value to validate
 * @param {TNumberValidator} options Set options to validate
 */
export function numberValidator(
  value: number,
  options: TNumberValidator,
): void {
  if (options.greater) {
    if (value < options.greater) {
      throw new BadRequestException(
        `Value must be greater than ${options.greater}`,
      );
    }
  }
  if (options.smaller) {
    if (value > options.smaller) {
      throw new BadRequestException(
        `Value must be smaller than ${options.greater}`,
      );
    }
  }
  if (options.greaterOrEqual) {
    if (value <= options.greaterOrEqual) {
      throw new BadRequestException(
        `Value must be greater or equal than ${options.greater}`,
      );
    }
  }
  if (options.smallerOrEqual) {
    if (value >= options.smallerOrEqual) {
      throw new BadRequestException(
        `Value must be smaller or equal than ${options.smallerOrEqual}`,
      );
    }
  }
}

/**
 * Check if the user existed.
 * @param userDto Set user dto.
 * @param repository Set user repository
 */
export function checkExistedUser(
  userDto: UserDto,
  repository: Repository<UserEntity>,
): void {
  const isExistedEmail = repository.existsBy({ email: userDto.email });
  if (isExistedEmail) {
    throw new ConflictException("User's email already exists");
  }
  const isExistedPhone = repository.existsBy({ phone: userDto.phone });
  if (isExistedPhone) {
    throw new ConflictException("User's phone number already exists");
  }
}
