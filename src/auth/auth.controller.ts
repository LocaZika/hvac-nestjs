import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserLocalGuard } from './guards/user-local.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ILoginResponse, IVerifyUserResponse } from '@auth/types/userResponse';
import { UserVerifyDto } from './dto/userVerify.dto';
import { User } from '@modules/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Customer Auth */
  @UseGuards(UserLocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    try {
      return this.authService.login(loginDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      return this.authService.register(userDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify/:id')
  verify(
    @Param('id') id: number,
    @Body() userVerifyDto: UserVerifyDto,
  ): Promise<IVerifyUserResponse> {
    try {
      return this.authService.verify(id, userVerifyDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('resendcode')
  resendCode(@Body('email') email: string): Promise<{ id: number }> {
    try {
      return this.authService.resendActivationCode(email);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
