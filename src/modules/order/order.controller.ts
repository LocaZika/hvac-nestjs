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
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/order.dto';
import { PrivateRoute } from '@decorators/route.decorator';
import { Paginated } from '@decorators/pagination.decorator';
import { PaginatedResult } from '@global/paginatedResult';
import { Roles } from '@decorators/roles.decorator';
import { ROLES } from '@auth/roles/roles.enum';

@PrivateRoute()
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  /* GET Routes */
  // https://localhost:8080/api/order?customerId=1
  // https://localhost:8080/api/order?status=processing
  // https://localhost:8080/api/order?customerEmail=abc@mail.com&status=processing
  // https://localhost:8080/api/order

  @Roles(ROLES.ADMIN, ROLES.EMPLOYEE)
  @Paginated()
  @Get()
  findAll(@Query('q') q: string): Promise<PaginatedResult<Order[]>> {
    try {
      return this.orderService.findAll(q);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /* POST Routes */

  @Roles(ROLES.ADMIN, ROLES.EMPLOYEE, ROLES.CUSTOMER)
  @Post() // https://localhost:8080/api/order
  create(@Body() orderDto: OrderDto): Promise<Order> {
    try {
      return this.orderService.create(orderDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Roles(ROLES.ADMIN, ROLES.EMPLOYEE)
  @Patch(':id') // https://localhost:8080/api/order/1
  update(
    @Param('id') orderId: number,
    @Body() orderDto: OrderDto,
  ): Promise<Order> {
    try {
      return this.orderService.update(orderId, orderDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /* DELETE Routes */

  @Roles(ROLES.ADMIN, ROLES.EMPLOYEE)
  @Delete(':id') //
  delete(@Param('id') orderId: number): Promise<null> {
    try {
      return this.orderService.delete(orderId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
