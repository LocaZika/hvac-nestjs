import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarPage } from './entities/carpage.entity';
import { Repository } from 'typeorm';
import { ResponseData } from '@global/responseData';

@Injectable()
export class CarPageService {
  constructor(
    @InjectRepository(CarPage)
    private readonly carpageRepository: Repository<CarPage>,
  ) {}

  async findCarpage(): Promise<ResponseData<CarPage>> {
    const carpage = await this.carpageRepository.query(
      'SELECT * FROM CARPAGE.GET_CARPAGE()',
    );
    return {
      statusCode: 200,
      ok: true,
      data: carpage[0].get_carpage.carpage,
    };
  }
}
