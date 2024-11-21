import {
  BadRequestException,
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
import { hashPassword } from '@utils/bcrypt.utils';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { expireDate } from '@utils/date.utils';
import { CustomerVerifyDto } from '@auth/dto/customerVerify.dto';
import { isExpired } from '@utils/validate.utils';
import { IVerifyCustomerResponse } from '../userBase/userResponse';
import { MailerService } from '@/mail/mailer.service';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly mailerService: MailerService,
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
      statusCode: 200,
      ok: true,
      page: 1,
      totalPages: calTotalPages(customers[1], 10),
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
      select: ['id', 'email', 'password', 'name', 'role', 'is_active'],
      where: { email },
    });
    if (!customer) {
      throw new NotFoundException('Customer was not found!');
    }
    return customer;
  }

  async create(customerDto: CustomerDto): Promise<ResponseData<CustomerDto>> {
    await this.checkExistedCustomer(customerDto);
    const customer = new Customer();
    Object.assign<Customer, CustomerDto>(customer, customerDto);
    customer.role = User_Roles.customer;
    customer.password = await hashPassword(customerDto.password);
    customer.code_id = uuid();
    customer.code_expire = expireDate.toDate();
    await this.customerRepository.insert(customer);
    this.mailerService.sendActivationCode({
      name: customer.name,
      email: customer.email,
      activationCode: customer.code_id,
    });
    delete customerDto.password;
    return {
      statusCode: 201,
      ok: true,
      data: customerDto,
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

  async verifyAccount(
    id: number,
    customerVerifyDto: CustomerVerifyDto,
  ): Promise<ResponseData<IVerifyCustomerResponse>> {
    const customer = await this.customerRepository.findOne({
      select: [
        'id',
        'email',
        'is_active',
        'code_id',
        'code_expire',
        'created_at',
      ],
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException('Customer was not found');
    }
    if (customer.is_active) {
      throw new ConflictException("Customer's account was active");
    }
    if (isExpired(customer.code_expire)) {
      throw new BadRequestException("Customer's activation code is expired");
    }
    if (customerVerifyDto.activationCode !== customer.code_id) {
      throw new BadRequestException("Customer's activation code is incorrect");
    }
    await this.customerRepository.update(
      {
        id: customer.id,
        created_at: customer.created_at,
      },
      {
        is_active: true,
      },
    );
    return {
      statusCode: 200,
      ok: true,
      data: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      },
    };
  }

  async resendActivationCode(
    email: string,
  ): Promise<ResponseData<{ id: number }>> {
    const customer = await this.customerRepository.findOne({
      select: ['id', 'created_at', 'name', 'email'],
      where: { email },
    });
    if (!customer) {
      throw new NotFoundException('Customer was not found');
    }
    const activationCode = uuid();
    await this.customerRepository.update(
      {
        id: customer.id,
        created_at: customer.created_at,
      },
      {
        code_id: activationCode,
        code_expire: expireDate.toDate(),
      },
    );
    this.mailerService.resendActivationCode({
      name: customer.name,
      email: customer.email,
      activationCode,
    });
    return {
      statusCode: 200,
      ok: true,
      data: { id: customer.id },
    };
  }
}
