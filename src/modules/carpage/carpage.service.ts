import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarPage } from './entities/carpage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarPageService {
  constructor(
    @InjectRepository(CarPage)
    private readonly carpageRepository: Repository<CarPage>,
  ) {}

  async findCarpage(): Promise<CarPage> {
    const carpage = await this.carpageRepository.query(
      'SELECT CARPAGE.GET_CARPAGE()',
    );
    return carpage[0].get_carpage.carpage as CarPage;
  }
}
