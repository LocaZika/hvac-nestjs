import { BadRequestException } from '@nestjs/common';
import { stringValidator, numberValidator } from '@utils/validation.util';
import { ProductDto } from '../dto/product.dto';

export function productValidator(productDto: ProductDto): void {
  stringValidator(
    /[~!@#$%^&*()_+|}{":?><,.,;'[\]=`]/,
    productDto.name,
    new BadRequestException(
      "Product's name must not contain special characters!",
    ),
  );
  stringValidator(
    /['"=]/,
    productDto.brand,
    new BadRequestException(
      "Product's brand must not contain single quote, quote and equal characters!",
    ),
  );
  numberValidator(productDto.price, { greater: 0 });
  numberValidator(productDto.hp, { greater: 0 });
  numberValidator(productDto.model, { greater: 1990 });
  numberValidator(productDto.mileage, { greater: 0 });
}
