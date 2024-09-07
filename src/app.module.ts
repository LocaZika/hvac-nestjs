import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './modules/database/database.module';
import { CustomerModule } from './modules/customer/customer.module';
import { LayoutModule } from './modules/layout/layout.module';
import { HomePageModule } from './modules/homepage/homepage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV.trim()}`,
    }),
    DatabaseModule,
    LayoutModule,
    HomePageModule,
    ProductModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
