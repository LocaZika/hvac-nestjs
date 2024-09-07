import { ValidationArguments } from 'class-validator';

/**
 * Given a message if the value is not in a enums.
 * @param {ValidationArguments} args set args in ValidationArguments.
 * @returns {string} message
 */
export function enumErrorMessage(args: ValidationArguments): string {
  const { value, constraints } = args;
  let constraintValues: string = '';
  for (let i = 1; i < constraints.length; i++) {
    if (constraints.length - 1 > i) {
      constraintValues = constraintValues + constraints[i] + ',';
    } else {
      constraintValues = constraintValues + constraints[i];
    }
  }
  return `The value '${value}' is not in the enums [${constraintValues}]`;
}
