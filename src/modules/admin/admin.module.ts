import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { OrderModule } from '@modules/order/order.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '@modules/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Statistic]), OrderModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
