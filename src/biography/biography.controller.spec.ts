import { Test, TestingModule } from '@nestjs/testing';
import { BiographyController } from './biography.controller';
import { BiographyService } from './biography.service';

describe('BiographyController', () => {
  let controller: BiographyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiographyController],
      providers: [BiographyService],
    }).compile();

    controller = module.get<BiographyController>(BiographyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
