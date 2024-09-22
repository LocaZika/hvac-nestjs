import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class CustomerStrategy extends PassportStrategy(Strategy, 'customer') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const customer = await this.authService.customerSignin(email, password);
    if (!customer) {
      throw new BadRequestException("Customer's password wrong!");
    }
    if (customer.is_active === false) {
      throw new UnauthorizedException("Customer's account is inactive!");
    }
    return customer;
  }
}
