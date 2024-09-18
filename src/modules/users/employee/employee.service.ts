import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { ResponseData } from '@global/responseData';
import { calTotalPages } from '@utils/paginate.utils';
import { EmployeeDto } from './dto/employee.dto';
import { hashPassword } from '@/utils/bcrypt.utils';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<ResponseData<Employee[]>> {
    const employee = await this.employeeRepository.findAndCount({ take: 9 });
    return {
      statusCode: 200,
      ok: true,
      page: 1,
      totalPages: calTotalPages(employee[1], 9),
      data: employee[0],
    };
  }

  async findOne(id: number): Promise<ResponseData<Employee>> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee's id '${id}' not found!`);
    }
    return {
      statusCode: 200,
      ok: true,
      data: employee,
    };
  }

  async findOneByEmail(email: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      select: ['id', 'email', 'address', 'phone', 'name', 'role', 'password'],
      where: { email },
    });
    if (!employee) {
      throw new NotFoundException('Employee was not found!');
    }
    return employee;
  }

  async findOneByEmailSignin(email: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (!employee) {
      throw new NotFoundException('Employee was not found!');
    }
    return employee;
  }

  async create(employeeDto: EmployeeDto): Promise<ResponseData<Employee>> {
    const existEmployeeEmail = await this.employeeRepository.existsBy({
      email: employeeDto.email,
    });
    if (existEmployeeEmail) {
      throw new ConflictException("Employee's email already exists!");
    }
    const existEmployeePhone = await this.employeeRepository.existsBy({
      phone: employeeDto.phone,
    });
    if (existEmployeePhone) {
      throw new ConflictException("Employee's phone already exists!");
    }
    const existEmployeeName = await this.employeeRepository.existsBy({
      name: employeeDto.name,
    });
    if (existEmployeeName) {
      throw new ConflictException("Employee's name already exists!");
    }
    const employee = new Employee();
    Object.assign(employee, employeeDto);
    const encodedPassword = await hashPassword(employeeDto.password);
    employee.password = encodedPassword;
    await this.employeeRepository.insert(employee);
    return {
      statusCode: 201,
      ok: true,
      message: 'Employee added successfully!',
      data: employee,
    };
  }

  async update(
    id: number,
    employeeDto: EmployeeDto,
  ): Promise<ResponseData<Employee>> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException('Employee is not found!');
    }
    await this.employeeRepository.update(employeeDto, employee);
    return {
      statusCode: 200,
      message: 'Employee updated successfully!',
      ok: true,
      data: null,
    };
  }

  async remove(id: number): Promise<ResponseData<null>> {
    const employee = await this.employeeRepository.existsBy({ id });
    if (!employee) {
      throw new NotFoundException('Employee is not found!');
    }
    await this.employeeRepository.delete(id);
    return {
      statusCode: 200,
      ok: true,
      message: 'Employee deleted successfully!',
      data: null,
    };
  }
}
