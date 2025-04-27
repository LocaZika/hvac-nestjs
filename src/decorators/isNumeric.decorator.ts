import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

type TNumericOptions = {
  precision: number;
  scale: number;
  min: number;
  max: number;
};
/**
 * Checks if a number is numeric
 * @param numericOptions Set precision, scale, min and max for the number. Default {precision: 5, scale: 3, min: 0, max: 9999}
 * @param validationOptions Set validation options for the number
 */
export default function IsNumeric(
  numericOptions?: Partial<TNumericOptions>,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    const options: TNumericOptions = {
      precision: 5,
      scale: 3,
      min: 0,
      max: 9999,
    };
    if (numericOptions) {
      Object.assign(options, numericOptions);
    }
    registerDecorator({
      name: 'IsNumeric',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options.precision, options.scale, options.min, options.max],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'number' || isNaN(value)) {
            return false;
          }
          if (value <= options.min || value >= options.max) {
            return false;
          }
          const [intPart, decimalPart] = value.toString().split('.');
          return (
            intPart.length <= options.precision - options.scale &&
            (!decimalPart || decimalPart.length <= options.scale)
          );
        },
        defaultMessage(args) {
          const { value } = args as ValidationArguments;
          if (typeof value !== 'number' || isNaN(value)) {
            return 'Value must be a valid number';
          }
          if (value < options.min || value > options.max) {
            return `Value must be between ${options.min} and ${options.max}`;
          }
          return `Value must have at most ${options.precision} total digits and ${options.scale} decimal places`;
        },
      },
    });
  };
}
