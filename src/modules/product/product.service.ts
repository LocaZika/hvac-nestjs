import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ResponseData } from '@global/responseData';
import { calTotalPages } from '@utils/paginate.utils';
import { productValidator } from './validate/product.validate';
import { ProductSortByEnum } from './types/product.enum';
import { ProductFilterQuery } from './dto/productQuery.dto';
import { getOrderByPrice } from '@/utils/orderByPrice.utils';
import { Discount } from './entities/discount.entity';
import { RawData } from '@/global/rawData';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}
  async findAll(
    page: string,
    sortBy: string,
  ): Promise<ResponseData<Product[]>> {
    let orderByPrice: ProductSortByEnum = ProductSortByEnum.asc;
    if (ProductSortByEnum.descending === sortBy) {
      orderByPrice = ProductSortByEnum.desc;
    }
    const products = await this.productRepository.findAndCount({
      select: [
        'id',
        'name',
        'brand',
        'price',
        'tradeType',
        'fuelType',
        'hp',
        'mileage',
        'transmission',
        'type',
        'model',
        'imgs',
      ],
      order: { price: orderByPrice },
      take: 9,
      skip: 9 * (+page - 1),
    });
    return {
      page: +page,
      totalPages: calTotalPages(products[1], 9),
      statusCode: 200,
      ok: true,
      data: products[0],
    };
  }

  async findOne(id: number): Promise<ResponseData<RawData>> {
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
    const data = new RawData();
    Object.assign(data, product);
    const discount = await this.discountRepository.findOne({
      select: ['percent_discount'],
      where: { product_id: id },
    });
    if (discount) {
      data.discount = (product.price * discount.percent_discount) / 100;
    } else {
      data.discount = 0;
    }
    return {
      statusCode: 200,
      ok: true,
      data,
    };
  }

  async findBySearchQuery(
    name: string,
    page: string,
    sortBy: ProductSortByEnum,
  ): Promise<ResponseData<Product[]>> {
    const orderByPrice = getOrderByPrice(sortBy);
    const products = await this.productRepository.findAndCount({
      select: [
        'id',
        'name',
        'brand',
        'price',
        'tradeType',
        'fuelType',
        'hp',
        'mileage',
        'transmission',
        'type',
        'model',
        'imgs',
      ],
      where: [{ name: ILike(`%${name}%`) }, { brand: ILike(`%${name}%`) }],
      order: { price: orderByPrice },
      take: 9,
      skip: 9 * (+page - 1),
    });
    return {
      statusCode: 200,
      ok: true,
      page: +page,
      totalPages: calTotalPages(products[1], 9),
      data: products[0],
    };
  }

  async findByFilterQuery(
    productFilterQuery: ProductFilterQuery,
  ): Promise<ResponseData<Product[]>> {
    const {
      page,
      sortBy,
      brand,
      mileage,
      model,
      transmission,
      type,
      priceRange,
    } = productFilterQuery;
    const orderByPrice = getOrderByPrice(sortBy);
    const products = await this.productRepository.findAndCount({
      select: [
        'id',
        'name',
        'brand',
        'price',
        'tradeType',
        'fuelType',
        'hp',
        'mileage',
        'transmission',
        'type',
        'model',
        'imgs',
      ],
      where: {
        brand: brand ?? null,
        transmission: transmission ?? null,
        type: type ?? null,
        ...(model ? { model: parseInt(model) } : null),
        ...(mileage ? { mileage: parseInt(mileage) } : null),
      },
      order: { price: orderByPrice },
      take: 9,
      skip: 9 * (+page - 1),
    });
    return {
      statusCode: 200,
      ok: true,
      page: +page,
      totalPages: calTotalPages(products[1], 9),
      data: products[0],
    };
  }

  async create(productDto: ProductDto): Promise<ResponseData<Product>> {
    productValidator(productDto);
    const product = new Product();
    Object.assign<Product, ProductDto>(product, productDto);
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
