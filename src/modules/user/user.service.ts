import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { TCustomerCount, TUserQuery } from './types/user';
import { PaginatedResult } from '@global/paginatedResult';
import { calTotalPages } from '@utils/pagination.util';
import { ROLES } from '@auth/roles/roles.enum';
import { TLastMonthData } from '@modules/admin/adminResponse/adminResponseData';
import { UserVerifyDto } from '@auth/dto/userVerify.dto';
import { IVerifyUserResponse } from '@auth/types/userResponse';
import { isExpired } from '@utils/validation.util';
import { MailService } from '@mail/mail.service';
import { v4 as uuid } from 'uuid';
import { expireDate } from '@utils/date.util';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '@utils/bcrypt.util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly LIMIT_TAKE_USER = 10;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  // Utilities //
  async checkDuplicate(
    userDto: CreateUserDto | UpdateUserDto,
    fields: { key: keyof typeof userDto; message: string }[],
  ): Promise<void> {
    for (const field of fields) {
      const isDuplicate = await this.userRepository.existsBy({
        [field.key]: userDto[field.key],
      });
      if (isDuplicate) {
        throw new ConflictException(field.message);
      }
    }
    return;
  }
  //---------//

  async findAll(userQuery: TUserQuery): Promise<PaginatedResult<User[]>> {
    let options = {};
    if (userQuery.email) {
      options = { email: userQuery.email };
    }
    if (userQuery.role) {
      options = { role: userQuery.role };
    }
    const user = await this.userRepository.findAndCount({
      select: [
        'id',
        'email',
        'name',
        'phone',
        'role',
        'address',
        'created_at',
        'updated_at',
      ],
      where: {
        id: MoreThan(parseInt(userQuery.id || '0')),
        ...options,
      },
      order: { id: 'ASC' },
      take: this.LIMIT_TAKE_USER,
    });
    return {
      page: 1,
      totalPage: calTotalPages(user[1], this.LIMIT_TAKE_USER),
      items: user[0],
      lastPaginationValue: user[0][user[0].length - 1].id,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      select: [
        'id',
        'email',
        'name',
        'phone',
        'role',
        'address',
        'created_at',
        'updated_at',
      ],
      where: { id },
    });
    if (!user) throw new NotFoundException(`Not found user with id: ${id}`);
    return user;
  }

  // For auth handle //
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'name', 'role'],
      where: { email },
    });
    if (!user)
      throw new NotFoundException(`Not Found User With Email: "${email}"`);
    return user;
  }

  async verifyAccount(
    id: number,
    userVerifyDto: UserVerifyDto,
  ): Promise<IVerifyUserResponse> {
    const user = await this.userRepository.findOne({
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
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    if (user.is_active) {
      throw new ConflictException("User's account was active");
    }
    if (isExpired(user.code_expire)) {
      throw new BadRequestException("User's activation code is expired");
    }
    if (userVerifyDto.activationCode !== user.code_id) {
      throw new BadRequestException("User's activation code is incorrect");
    }
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        is_active: true,
      },
    );
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async resendActivationCode(email: string): Promise<{ id: number }> {
    const user = await this.userRepository.findOne({
      select: ['id', 'created_at', 'name', 'email'],
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('user was not found');
    }
    const activationCode = uuid();
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        code_id: activationCode,
        code_expire: expireDate.toDate(),
      },
    );
    await this.mailService.resendActivationCode({
      name: user.name,
      email: user.email,
      activationCode,
    });
    return { id: user.id };
  }
  //-----------------//

  // For admin statistic //
  async countCustomer(): Promise<number> {
    return await this.userRepository.countBy({ role: ROLES.CUSTOMER });
  }

  async lastMonthGrowthDifference(): Promise<TLastMonthData> {
    let value: number = 0,
      percent: number = 0,
      valueDifference: number = 0;
    const hasCustomers = await this.userRepository.countBy({
      role: ROLES.CUSTOMER,
    });
    if (hasCustomers > 0) {
      const lastMonthValue: TCustomerCount = await this.userRepository.query(
        "SELECT COUNT(*) FROM users.users WHERE role = $1 created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' AND created_at < DATE_TRUNC('month', CURRENT_DATE);",
        [ROLES.CUSTOMER],
      );
      const thisMonthValue: TCustomerCount = await this.userRepository.query(
        "SELECT COUNT(*) FROM users.users WHERE role = $1 created_at >= DATE_TRUNC('month', CURRENT_DATE);",
        [ROLES.CUSTOMER],
      );
      valueDifference = thisMonthValue[0].count - lastMonthValue[0].count;
      value = Math.abs(valueDifference);
      percent =
        parseFloat(
          Math.abs(thisMonthValue[0].count - lastMonthValue[0].count).toFixed(
            2,
          ),
        ) * 100;
    }
    return { value, percent, growth: valueDifference >= 0 ? 'up' : 'down' };
  }
  //---------------------//

  async create(userDto: CreateUserDto): Promise<User> {
    await this.checkDuplicate(userDto, [
      { key: 'email', message: "User's email was existed" },
      { key: 'phone', message: "User's phone was existed" },
    ]);
    const user = new User();
    Object.assign<User, CreateUserDto>(user, userDto);
    user.role = ROLES.CUSTOMER;
    user.password = await hashPassword(userDto.password);
    user.code_id = uuid();
    user.code_expire = expireDate.toDate();
    await this.userRepository.insert(user);
    await this.mailService.sendActivationCode({
      name: user.name,
      email: user.email,
      activationCode: user.code_id,
    });
    delete (user as Partial<User>).password;
    delete (user as Partial<User>).code_id;
    delete (user as Partial<User>).code_expire;
    return user;
  }

  async update(id: number, userDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Not Found User With ID: ${id}`);
    await this.checkDuplicate(userDto, [
      { key: 'email', message: "User's email was existed" },
      { key: 'phone', message: "User's phone was existed" },
    ]);
    const updatedUser = await this.userRepository.update({ id }, userDto);
    return updatedUser.raw as User;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Not Found User With ID: ${id}`);
    await this.userRepository.delete({ id });
    return;
  }
}
