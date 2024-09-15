import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '@modules/product/product.module';
import { DatabaseModule } from '@modules/database/database.module';
import { CustomerModule } from '@modules/users/customer/customer.module';
import { LayoutModule } from '@modules/layout/layout.module';
import { HomePageModule } from '@modules/homepage/homepage.module';
import { CarPageModule } from '@modules/carpage/carpage.module';
import { AboutPageModule } from '@modules/aboutpage/aboutpage.module';
import { ContactPageModule } from '@modules/contactpage/contactpage.module';
import { EmployeeModule } from '@modules/users/employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV.trim()}`,
    }),
    DatabaseModule,
    LayoutModule,
    HomePageModule,
    CarPageModule,
    AboutPageModule,
    ContactPageModule,
    ProductModule,
    CustomerModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
