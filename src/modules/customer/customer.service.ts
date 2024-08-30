import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { ResponseData } from 'src/global/responseData';
import { calTotalPages } from 'src/utils/paginate.utils';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

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

  async create(customerDto: CustomerDto): Promise<ResponseData<Customer>> {
    const existedCustomer = await this.customerRepository.existsBy({
      email: customerDto.email,
      phone: customerDto.phone,
    });
    if (existedCustomer) {
      throw new ConflictException("Customer's email or phone already exists!");
    }
    const customer = new Customer();
    Object.assign<Customer, CustomerDto>(customer, customerDto);
    // customer.account_type
    // customer.code_id
    // customer.code_expire
    return null;
  }

  async update(id: number): Promise<ResponseData<null>> {
    return null;
  }

  async remove(id: number): Promise<ResponseData<null>> {
    return null;
  }
}
