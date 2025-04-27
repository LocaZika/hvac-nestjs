import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Layout } from './entities/layout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LayoutService {
  constructor(
    @InjectRepository(Layout)
    private readonly layoutRepository: Repository<Layout>,
  ) {}
  async findLayout(): Promise<Layout> {
    const layout = await this.layoutRepository.query(
      'SELECT * FROM LAYOUT.GET_LAYOUT()',
    );
    return layout[0].get_layout as Layout;
  }
}
