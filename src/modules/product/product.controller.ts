import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ResponseData } from '@global/responseData';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @PublicRoute()
  @Get()
  findAll(): Promise<ResponseData<Product[]>> {
    try {
      return this.productService.findAll();
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PublicRoute()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseData<Product>> {
    try {
      return this.productService.findOne(id);
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
