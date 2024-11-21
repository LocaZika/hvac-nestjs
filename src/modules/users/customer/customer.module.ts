import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { MailerService } from '@/mail/mailer.service';
import { MailerModule } from '@/mail/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), MailerModule],
  controllers: [CustomerController],
  providers: [CustomerService, MailerService],
  exports: [CustomerService],
})
export class CustomerModule {}
