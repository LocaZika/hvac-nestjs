import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ResponseData } from '@global/responseData';
import { PublicRoute } from '@/decorators/route.decorator';
import { ProductSortByEnum } from './types/product.enum';
import { ProductFilterQuery } from './dto/productQuery.dto';
import { RawData } from '@/global/rawData';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @PublicRoute()
  @Get()
  findAll(
    @Query('page') page: string,
    @Query('sortBy') sortBy: ProductSortByEnum,
  ): Promise<ResponseData<Product[]>> {
    try {
      return this.productService.findAll(page, sortBy);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PublicRoute()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseData<RawData>> {
    try {
      return this.productService.findOne(id);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PublicRoute()
  @Get('search')
  findBySearchQuery(
    @Query('q') q: string,
    @Query('page') page: string,
    @Query('sortBy') sortBy: ProductSortByEnum,
  ): Promise<ResponseData<Product[]>> {
    try {
      return this.productService.findBySearchQuery(q, page, sortBy);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PublicRoute()
  @Get('filter')
  findByFilterQuery(
    @Query() productFilterQuery: ProductFilterQuery,
  ): Promise<ResponseData<Product[]>> {
    try {
      return this.productService.findByFilterQuery(productFilterQuery);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @Post()
  create(@Body() productDto: ProductDto): Promise<ResponseData<Product>> {
    try {
      return this.productService.create(productDto);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() productDto: ProductDto) {
    try {
      return this.productService.update(id, productDto);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.productService.remove(id);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }
}
