import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@modules/user/user.module';
import { UserLocalStrategy } from './passports/user-local.strategy';
import { JwtStrategy } from './passports/jwt.strategy';

@Module({
  imports: [
    UserModule,
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
  providers: [AuthService, UserLocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
