import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePassword } from '@utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ILoginResponse, IVerifyUserResponse } from '@auth/types/userResponse';
import { UserVerifyDto } from './dto/userVerify.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    const isCorrectPassword = await comparePassword(
      loginDto.password,
      user.password,
    );
    if (isCorrectPassword === false) {
      throw new BadRequestException("User's password wrong!");
    }
    if (user.is_active === false) {
      throw new UnauthorizedException("User's account is inactive!");
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
        role: user.role,
      },
      access_token,
    };
  }

  async register(userDto: CreateUserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  async verify(
    id: number,
    userVerifyDto: UserVerifyDto,
  ): Promise<IVerifyUserResponse> {
    return await this.userService.verifyAccount(id, userVerifyDto);
  }

  async resendActivationCode(email: string): Promise<{ id: number }> {
    return await this.userService.resendActivationCode(email);
  }
}
