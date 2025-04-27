import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@auth/auth.module';
import { MailModule } from '@mail/mail.module';
import { AboutPageModule } from '@modules/aboutpage/aboutpage.module';
import { AdminModule } from '@modules/admin/admin.module';
import { CarPageModule } from '@modules/carpage/carpage.module';
import { ContactPageModule } from '@modules/contactpage/contactpage.module';
import { HomePageModule } from '@modules/homepage/homepage.module';
import { LayoutModule } from '@modules/layout/layout.module';
import { OrderModule } from '@modules/order/order.module';
import { ProductModule } from '@modules/product/product.module';
import { UserModule } from '@modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV.trim()}`,
    }),
    DatabaseModule,
    AuthModule,
    MailModule,
    AboutPageModule,
    AdminModule,
    CarPageModule,
    ContactPageModule,
    HomePageModule,
    LayoutModule,
    OrderModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
