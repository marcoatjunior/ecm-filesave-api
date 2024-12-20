import { Test, TestingModule } from '@nestjs/testing';
import { ArquivosController } from './arquivos.controller';
import { ArquivosService } from './arquivos.service';

describe('ArquivosController', () => {
  let controller: ArquivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArquivosController],
      providers: [ArquivosService],
    }).compile();

    controller = module.get<ArquivosController>(ArquivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
