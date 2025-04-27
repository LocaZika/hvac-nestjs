import { Test, TestingModule } from '@nestjs/testing';
import { CarpageController } from './carpage.controller';
import { CarpageService } from './carpage.service';

describe('CarpageController', () => {
  let controller: CarpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarpageController],
      providers: [CarpageService],
    }).compile();

    controller = module.get<CarpageController>(CarpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
