import { Test, TestingModule } from '@nestjs/testing';
import { BiographyfolderController } from './biographyfolder.controller';
import { BiographyfolderService } from './biographyfolder.service';

describe('BiographyfolderController', () => {
  let controller: BiographyfolderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiographyfolderController],
      providers: [BiographyfolderService],
    }).compile();

    controller = module.get<BiographyfolderController>(BiographyfolderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
