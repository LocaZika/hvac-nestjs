import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePage } from './entities/homepage.entity';
import { HomePageController } from './homepage.controller';
import { HomePageService } from './homepage.service';

@Module({
  imports: [TypeOrmModule.forFeature([HomePage])],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
