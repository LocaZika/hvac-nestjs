import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutPage } from './entities/aboutpage.entity';
import { AboutPageController } from './aboutpage.controller';
import { AboutPageService } from './aboutpage.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutPage])],
  controllers: [AboutPageController],
  providers: [AboutPageService],
})
export class AboutPageModule {}
