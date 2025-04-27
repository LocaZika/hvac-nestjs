import { Test, TestingModule } from '@nestjs/testing';
import { CarpageService } from './carpage.service';

describe('CarpageService', () => {
  let service: CarpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarpageService],
    }).compile();

    service = module.get<CarpageService>(CarpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
