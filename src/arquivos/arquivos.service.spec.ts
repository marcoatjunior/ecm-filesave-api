import { Test, TestingModule } from '@nestjs/testing';
import { ArquivosService } from './arquivos.service';

describe('ArquivosService', () => {
  let service: ArquivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArquivosService],
    }).compile();

    service = module.get<ArquivosService>(ArquivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
