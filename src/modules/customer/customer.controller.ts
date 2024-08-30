import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { ResponseData } from 'src/global/responseData';
import { CustomerDto } from './dto/customer.dto';

@Controller('users/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(): Promise<ResponseData<Customer[]>> {
    try {
      return this.customerService.findAll();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseData<Customer>> {
    try {
      return this.customerService.findOne(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  create(@Body() customerDto: CustomerDto): Promise<ResponseData<Customer>> {
    try {
      return this.customerService.create(customerDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  update(@Param('id') id: number): Promise<ResponseData<Customer>> {
    try {
      return this.customerService.update(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<ResponseData<null>> {
    try {
      return this.customerService.remove(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
