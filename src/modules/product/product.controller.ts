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
import { ProductQuery } from './dto/productQuery.dto';
import { Paginated } from '@decorators/pagination.decorator';
import { PaginatedResult } from '@global/paginatedResult';
import { PrivateRoute } from '@decorators/route.decorator';
import { Roles } from '@decorators/roles.decorator';
import { ROLES } from '@auth/roles/roles.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Paginated()
  @Get()
  findAll(
    @Query() productQuery: ProductQuery,
  ): Promise<PaginatedResult<Product[]>> {
    try {
      return this.productService.findAll(productQuery);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    try {
      return this.productService.findOne(id);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PrivateRoute()
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  @Post()
  create(@Body() productDto: ProductDto): Promise<Product> {
    try {
      return this.productService.create(productDto);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PrivateRoute()
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() productDto: ProductDto) {
    try {
      return this.productService.update(id, productDto);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }

  @PrivateRoute()
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.productService.remove(id);
    } catch {
      throw new InternalServerErrorException('Internal Server Error!');
    }
  }
}
