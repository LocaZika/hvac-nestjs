import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarPage } from './entities/carpage.entity';
import { CarPageController } from './carpage.controller';
import { CarPageService } from './carpage.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarPage])],
  controllers: [CarPageController],
  providers: [CarPageService],
})
export class CarPageModule {}
