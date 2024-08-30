import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ResponseData } from 'src/global/responseData';
import { calTotalPages } from 'src/utils/paginate.utils';
import { productValidator } from './validate/product.validate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll(): Promise<ResponseData<Product[]>> {
    const products = await this.productRepository.findAndCount({ take: 9 });
    return {
      page: 1,
      totalPages: calTotalPages(products[1], 9),
      statusCode: 200,
      ok: true,
      data: products[0],
    };
  }

  async findOne(id: number): Promise<ResponseData<Product>> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return {
      statusCode: 200,
      ok: true,
      message: 'Product was created successfully!',
      data: product,
    };
  }

  async create(productDto: ProductDto): Promise<ResponseData<Product>> {
    productValidator(productDto);
    const product = new Product();
    Object.entries(productDto).forEach(
      ([key, value]) => (product[key] = value),
    );
    await this.productRepository.insert(product);
    return {
      statusCode: 201,
      ok: true,
      message: 'Product was created successfully!',
      data: product,
    };
  }

  async update(
    id: number,
    productDto: ProductDto,
  ): Promise<ResponseData<Product>> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    productValidator(productDto);
    const updatedProduct = { ...product, ...productDto };
    delete updatedProduct.id;
    await this.productRepository.update(
      { id, brand: updatedProduct.brand },
      updatedProduct,
    );
    return {
      statusCode: 200,
      ok: true,
      message: 'Product was updated successfully!',
      data: updatedProduct,
    };
  }

  async remove(id: number): Promise<ResponseData<Product>> {
    const isExistedProduct = await this.productRepository.existsBy({ id });
    if (!isExistedProduct) {
      throw new NotFoundException('Product not found!');
    }
    await this.productRepository.delete({ id });
    return {
      statusCode: 200,
      ok: true,
      message: 'Product was removed successfully!',
      data: null,
    };
  }
}
