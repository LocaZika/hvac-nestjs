import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from '@modules/users/employee/employee.module';
import { CustomerModule } from '@modules/users/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { EmployeeStrategy } from './passports/employee-local.strategy';
import { CustomerStrategy } from './passports/customer-local.strategy';
import { EmployeeJwtStrategy } from './passports/jwt.strategy';

@Module({
  imports: [
    EmployeeModule,
    CustomerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log('>>Initializing JWT');
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule.registerAsync({
      useFactory: () => ({ session: true }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmployeeStrategy,
    CustomerStrategy,
    EmployeeJwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
