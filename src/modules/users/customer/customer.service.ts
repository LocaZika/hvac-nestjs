import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { ResponseData } from '@global/responseData';
import { calTotalPages } from '@utils/paginate.utils';
import { CustomerDto } from './dto/customer.dto';
import { User_Roles } from '../userBase/userRole.enum';
import { hashPassword } from '@/utils/bcrypt.utils';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async checkExistedCustomer(customerDto: CustomerDto): Promise<void> {
    const isExistedEmail = await this.customerRepository.existsBy({
      email: customerDto.email,
    });
    if (isExistedEmail) {
      throw new ConflictException("Customer's email already exists");
    }
    const isExistedPhone = await this.customerRepository.existsBy({
      phone: customerDto.password,
    });
    if (isExistedPhone) {
      throw new ConflictException("Customer's phone number already exists");
    }
  }

  async findAll(): Promise<ResponseData<Customer[]>> {
    const customers = await this.customerRepository.findAndCount({ take: 10 });
    return {
      page: 1,
      totalPages: calTotalPages(customers[1], 10),
      statusCode: 200,
      ok: true,
      data: customers[0],
    };
  }

  async findOne(id: number): Promise<ResponseData<Customer>> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found!');
    }
    return {
      statusCode: 200,
      ok: true,
      data: customer,
    };
  }

  async findOneByEmail(email: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      select: ['id', 'email', 'address', 'phone', 'name', 'role', 'password'],
      where: { email },
    });
    if (!customer) {
      throw new NotFoundException('Customer was not found!');
    }
    return customer;
  }

  async findOneByEmailSignin(email: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (!customer) {
      throw new NotFoundException('Customer was not found! auth');
    }
    return customer;
  }

  async create(customerDto: CustomerDto): Promise<ResponseData<Customer>> {
    await this.checkExistedCustomer(customerDto);
    const customer = new Customer();
    Object.assign<Customer, CustomerDto>(customer, customerDto);
    customer.role = User_Roles.customer;
    customer.password = await hashPassword(customerDto.password);
    customer.code_id = uuid();
    customer.code_expire = dayjs().add(1, 'day').toDate();
    // customer.account_type
    await this.customerRepository.insert(customer);
    delete customer.password;
    return {
      statusCode: 201,
      ok: true,
      data: customer,
    };
  }

  async update(id: number): Promise<ResponseData<null>> {
    if (!id) {
      throw new NotFoundException();
    }
    return null;
  }

  async remove(id: number): Promise<ResponseData<null>> {
    if (!id) {
      throw new NotFoundException();
    }
    return null;
  }
}
