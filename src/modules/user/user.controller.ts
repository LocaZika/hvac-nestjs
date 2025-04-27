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
import { UserService } from './user.service';
import { TUserQuery } from './types/user';
import { Paginated } from '@decorators/pagination.decorator';
import { PaginatedResult } from '@global/paginatedResult';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrivateRoute } from '@decorators/route.decorator';
import { ROLES } from '@auth/roles/roles.enum';
import { Roles } from '@decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PrivateRoute()
  @Roles(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Paginated()
  @Get()
  findAll(@Query() userQuery: TUserQuery): Promise<PaginatedResult<User[]>> {
    try {
      return this.userService.findAll(userQuery);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @PrivateRoute()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.findOne(parseInt(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    try {
      return this.userService.create(userDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @PrivateRoute()
  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    try {
      return this.userService.update(parseInt(id), userDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @PrivateRoute()
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(parseInt(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
