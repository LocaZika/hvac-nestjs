import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { ResponseData } from '@global/responseData';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('users/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @PublicRoute()
  @Get()
  findAll(): Promise<ResponseData<Employee[]>> {
    try {
      return this.employeeService.findAll();
    } catch {
      throw new InternalServerErrorException();
    }
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseData<Employee>> {
    try {
      return this.employeeService.findOne(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
  @Post()
  create(@Body() employeeDto: EmployeeDto): Promise<ResponseData<Employee>> {
    try {
      return this.employeeService.create(employeeDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
