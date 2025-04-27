import { Test, TestingModule } from '@nestjs/testing';
import { AboutpageController } from './aboutpage.controller';
import { AboutpageService } from './aboutpage.service';

describe('AboutpageController', () => {
  let controller: AboutpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutpageController],
      providers: [AboutpageService],
    }).compile();

    controller = module.get<AboutpageController>(AboutpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
