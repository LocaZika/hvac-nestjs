import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { PaginatedResult } from '@global/paginatedResult';
import { calTotalPages } from '@utils/pagination.util';
import { productValidator } from './validation/product.validation';
import { ProductQuery } from './dto/productQuery.dto';
import { getOrderByPrice } from '@utils/orderByPrice.util';
import { Discount } from './entities/discount.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async findAll(
    productQuery: ProductQuery,
  ): Promise<PaginatedResult<Product[]>> {
    const { page, sortBy, brand, model, q, transmission, type, lastPrice } =
      productQuery;
    const orderByPrice = getOrderByPrice(sortBy);
    //price, name, brand, transmission, type, model, order
    const products = await this.productRepository.query(
      `SELECT * FROM products.get_filtered_products($1,$2,$3,$4,$5,$6,$7)`,
      [
        lastPrice ?? 0,
        q ?? null,
        brand ?? null,
        transmission ?? null,
        type ?? null,
        model ?? null,
        orderByPrice,
      ],
    );
    const count = await this.productRepository.count();
    return {
      page: +page,
      totalPage: calTotalPages(count, 9),
      items: products,
      lastPaginationValue: products[products.length - 1].price,
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      select: [
        'id',
        'name',
        'price',
        'vin',
        'stock',
        'imgs',
        'detailImgs',
        'tradeType',
      ],
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    const discount = await this.discountRepository.findOne({
      select: ['percent_discount'],
      where: { product_id: id },
    });
    const result: Product & { discount: number } = Object.assign(
      { discount: 0 },
      product,
    );
    if (discount)
      result.discount = (product.price * discount.percent_discount) / 100;
    return result;
  }

  async create(productDto: ProductDto): Promise<Product> {
    productValidator(productDto);
    const product = new Product();
    Object.assign<Product, ProductDto>(product, productDto);
    delete (product as Partial<Product>).imgs;
    delete (product as Partial<Product>).detailImgs;
    await this.productRepository.insert(product);
    return product;
  }

  async update(id: number, productDto: ProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    productValidator(productDto);
    const updatedProduct = { ...product, ...productDto };
    delete (updatedProduct as Partial<Product>).id;
    delete (updatedProduct as Partial<Product>).imgs;
    delete (updatedProduct as Partial<Product>).detailImgs;
    await this.productRepository.update(
      { id, brand: updatedProduct.brand },
      updatedProduct,
    );
    return updatedProduct;
  }

  async remove(id: number): Promise<null> {
    const isExistedProduct = await this.productRepository.existsBy({ id });
    if (!isExistedProduct) {
      throw new NotFoundException('Product not found!');
    }
    await this.productRepository.delete({ id });
    return null;
  }
}
