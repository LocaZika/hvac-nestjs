import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ORDERSTATUS } from './enums/orderStatus.enum';
import { OrderDto } from './dto/order.dto';
import { TLastMonthData } from '@modules/admin/adminResponse/adminResponseData';
import { calTotalPages } from '@utils/pagination.util';
import { Product } from '@modules/product/entities/product.entity';
import { User } from '@modules/user/entities/user.entity';
import { PaginatedResult } from '@global/paginatedResult';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async queryBuilder(where: {
    q?: string;
    lastPaginationValue: string;
  }): Promise<[any[], number]> {
    let whereOptions:
      | [string, { customer_email?: string; lastPaginationValue: string }]
      | undefined = undefined;
    if (where?.q) {
      whereOptions = [
        'c.email ILIKE :customer_email AND o.created_at > :lastPaginationValue',
        {
          customer_email: where.q,
          lastPaginationValue: where.lastPaginationValue,
        },
      ];
    }
    const baseQuery = this.orderRepository
      .createQueryBuilder('o')
      .select([
        'o.id AS id',
        'c.email AS customer_email',
        'p.name AS product_name',
        'o.quantity AS quantity',
        'o.sale_off AS sale_off',
        'o.paid AS paid',
        'o.status AS status',
        'o.created_at AS created_at',
        'o.updated_at AS updated_at',
      ])
      .leftJoin(User, 'u', 'o.customer_id = u.id')
      .leftJoin(Product, 'p', 'o.product_id = p.id')
      .orderBy('o.created_at', 'ASC')
      .take(9);

    const rawQuery = whereOptions
      ? baseQuery.where(...whereOptions)
      : baseQuery;

    const data = await rawQuery.getRawMany();

    const countQuery = this.orderRepository
      .createQueryBuilder('o')
      .leftJoin(User, 'u', 'o.customer_id = u.id')
      .leftJoin(Product, 'p', 'o.product_id = p.id');

    const count = await (whereOptions
      ? countQuery.where(...whereOptions).getCount()
      : countQuery.getCount());

    return [data, count];
  }

  async findAll(
    lastPaginationValue: string,
    q?: string,
  ): Promise<PaginatedResult<Order[]>> {
    const orders = await this.queryBuilder({ q, lastPaginationValue });
    return {
      page: 1,
      totalPage: calTotalPages(orders[1], 9),
      items: orders[0],
      lastPaginationValue: orders[0][orders[0].length - 1].created_at,
    };
  }

  async count(): Promise<number> {
    return await this.orderRepository.countBy({
      status: ORDERSTATUS.PROCESSING,
    });
  }

  async lastMonthEarningDifference(): Promise<TLastMonthData> {
    let value: number = 0,
      percent: number = 0;
    const hasOrders = await this.orderRepository.count();
    if (hasOrders > 0) {
      const lastMonthValue: TEarningValue = await this.orderRepository.query(
        "SELECT SUM(PAID) FROM users.orders WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' AND created_at < DATE_TRUNC('month', CURRENT_DATE);",
      );
      const thisMonthValue: TEarningValue = await this.orderRepository.query(
        "SELECT SUM(PAID) FROM users.orders WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE);",
      );
      if (lastMonthValue && thisMonthValue) {
        value = Math.abs(thisMonthValue[0].sum - lastMonthValue[0].sum);
        percent =
          parseFloat(
            Math.abs(thisMonthValue[0].sum / lastMonthValue[0].sum).toFixed(2),
          ) * 100;
      }
    }
    return { value, percent, growth: value >= 0 ? 'up' : 'down' };
  }

  async create(orderDto: OrderDto): Promise<Order> {
    const newOrder = Object.assign<Order, OrderDto>(new Order(), orderDto);
    await this.orderRepository.insert(newOrder);
    return newOrder;
  }

  async update(orderId: number, orderDto: OrderDto): Promise<Order> {
    const existedOrder = await this.orderRepository.findOneBy({ id: orderId });
    if (!existedOrder) {
      throw new NotFoundException('Order not found!');
    }
    const updatedOrder = { ...existedOrder, ...orderDto };
    await this.orderRepository.update({ id: orderId }, updatedOrder);
    return updatedOrder;
  }

  async delete(orderId: number): Promise<null> {
    const existedOrder = await this.orderRepository.findOneBy({ id: orderId });
    if (!existedOrder) {
      throw new NotFoundException('Order not found!');
    }
    await this.orderRepository.delete({ id: orderId });
    return null;
  }
}
