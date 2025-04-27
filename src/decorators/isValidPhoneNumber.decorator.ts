import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [/^\+84[1-9]{9}$/, /^0[1-9]{9}$/],
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [regex1, regex2]: RegExp[] = args.constraints;
          if (typeof value === 'string' && regex1.test(value)) {
            return true;
          }
          if (typeof value === 'string' && regex2.test(value)) {
            return true;
          }
          return false;
        },
        defaultMessage: () => 'Invalid phone number!',
      },
    });
  };
}
