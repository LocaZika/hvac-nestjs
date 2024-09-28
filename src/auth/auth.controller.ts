import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
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
import { CustomerDto } from '@/modules/users/customer/dto/customer.dto';
import {
  ISignInResponse,
  IVerifyCustomerResponse,
} from '@/modules/users/userBase/userResponse';
import { CustomerVerifyDto } from './dto/customerVerify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Employee Auth */
  @UseGuards(EmployeeLocalGuard)
  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('employee/signin')
  employeeSignin(@Request() req: IExpressRequest): Promise<ResponseData<any>> {
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
  @PublicRoute()
  @Post('customer/signin')
  customerSignin(
    @Request() req: IExpressRequest,
  ): Promise<ResponseData<ISignInResponse>> {
    try {
      return this.authService.signin(req.user);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @PublicRoute()
  @Post('customer/signup')
  customerSignup(
    @Body() customerDto: CustomerDto,
  ): Promise<ResponseData<CustomerDto>> {
    try {
      return this.authService.customerSignup(customerDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  @Post('customer/verify/:id')
  customerVerify(
    @Param('id') id: number,
    @Body() customerVerifyDto: CustomerVerifyDto,
  ): Promise<ResponseData<IVerifyCustomerResponse>> {
    try {
      return this.authService.customerVerify(id, customerVerifyDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  @Post('customer/resendcode')
  customerResendCode(
    @Body('email') email: string,
  ): Promise<ResponseData<{ id: number }>> {
    try {
      return this.authService.resendActivationCode(email);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
