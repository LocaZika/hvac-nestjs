import { ValidationArguments } from 'class-validator';

export function enumErrorMessage(args: ValidationArguments): string {
  const { value, constraints } = args;
  const correctValue = constraints.toString();
  return `Value ${value} is not of ${correctValue}`;
}
