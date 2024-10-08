import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class EmployeeStrategy extends PassportStrategy(Strategy, 'employee') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const employee = await this.authService.employeeSignin(email, password);
    if (!employee) {
      throw new UnauthorizedException("Employee's password wrong!");
    }
    return employee;
  }
}
