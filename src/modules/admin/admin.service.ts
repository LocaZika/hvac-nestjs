import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { Repository } from 'typeorm';
import { OrderService } from '@modules/order/order.service';
import AdminResponseData from './adminResponse/adminResponseData';
import { UserService } from '@modules/user/user.service';
import { getCurrentMonth } from '@utils/date.util';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Statistic)
    private readonly statisticRepository: Repository<Statistic>,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  async getStatistic(): Promise<AdminResponseData> {
    const getStatistic = await this.statisticRepository.query(
      'SELECT * FROM PUBLIC.GET_SALES_RESULT() AS RESULT',
    );
    const orderCount = await this.orderService.count();
    const customerCount = await this.userService.countCustomer();
    const lastMonthEarningDifference =
      await this.orderService.lastMonthEarningDifference();
    const lastMonthGrowthDifference =
      await this.userService.lastMonthGrowthDifference();
    const data: AdminResponseData = {
      customerCount,
      lastMonthEarningDifference,
      lastMonthGrowthDifference,
      orderCount,
      statistic: getStatistic[0].result ?? [{ month: getCurrentMonth() }],
    };
    return data;
  }
}
