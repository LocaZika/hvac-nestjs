import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ResponseData } from '@global/responseData';
import { calTotalPages } from '@utils/paginate.utils';
import { productValidator } from './validate/product.validate';
import { ProductQuery } from './dto/productQuery.dto';
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

  async findAll(productQuery: ProductQuery): Promise<ResponseData<Product[]>> {
    const { page, sortBy, brand, model, q, transmission, type } = productQuery;
    const orderByPrice = getOrderByPrice(sortBy);
    const options: FindManyOptions<Product> = {
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
    };
    const searchOrFilter = q || brand || transmission || model || type;
    if (searchOrFilter) {
      options.where = {};

      if (q) {
        options.where.name = ILike(`%${q}%`);
      }

      if (brand) {
        options.where.brand = brand;
      }

      if (transmission) {
        options.where.transmission = transmission;
      }

      if (type) {
        options.where.type = type;
      }

      if (model) {
        options.where.model = parseInt(model);
      }
    }
    const products = await this.productRepository.findAndCount(options);
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
