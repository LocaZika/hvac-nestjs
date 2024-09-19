import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerLocalGuard } from './guards/customer-local.guard';
import { EmployeeLocalGuard } from './guards/employee-local.guard';
import { AuthService } from './auth.service';
import { ResponseData } from '@/global/responseData';
import { IExpressRequest } from './types/userRequest';
import { JwtGuard } from './guards/jwt.guard';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Employee Auth */
  @UseGuards(EmployeeLocalGuard)
  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('employee/signin')
  employeeSignin(
    @Request() req: IExpressRequest,
  ): Promise<ResponseData<string>> {
    try {
      return this.authService.signin(req.user);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtGuard)
  @Get('employee/profile')
  employeeProfile(
    @Request() req: IExpressRequest,
  ): Promise<ResponseData<string>> {
    try {
      return req.user;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /** Customer Auth */
  @UseGuards(CustomerLocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('customer/signin')
  CustomerSignin(
    @Request() req: IExpressRequest,
  ): Promise<ResponseData<string>> {
    try {
      return this.authService.signin(req.user);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
