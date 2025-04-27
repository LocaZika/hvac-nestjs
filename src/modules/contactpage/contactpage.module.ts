import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactPage } from './entities/contactpage.entity';
import { ContactPageController } from './contactpage.controller';
import { ContactPageService } from './contactpage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactPage])],
  controllers: [ContactPageController],
  providers: [ContactPageService],
})
export class ContactPageModule {}
