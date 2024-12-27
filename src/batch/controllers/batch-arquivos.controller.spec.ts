import { Test } from '@nestjs/testing';
import {
  ExclusaoEcmService,
  HigienizacaoEcmService,
  TransmissaoEcmService,
} from '../services';
import { BatchArquivosController } from './batch-arquivos.controller';

describe('BatchArquivosController', () => {
  let controller: BatchArquivosController;
  let transmissaoService = {
    executa: jest.fn().mockReturnValue(() => Promise.resolve()),
  };
  let higienizacaoService = {
    executa: jest.fn().mockReturnValue(() => Promise.resolve()),
  };
  let exclusaoService = {
    executa: jest.fn().mockReturnValue(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BatchArquivosController],
    })
      .useMocker((token) => {
        if (token === TransmissaoEcmService) {
          return transmissaoService;
        }
        if (token === HigienizacaoEcmService) {
          return higienizacaoService;
        }
        if (token === ExclusaoEcmService) {
          return exclusaoService;
        }
      })
      .compile();

    controller = moduleRef.get(BatchArquivosController);
  });

  describe('Deve realizar chamadas de rotinas batch', () => {
    it('Deve transmitir arquivos ao ECM', async () => {
      controller.transmite();
      expect(transmissaoService.executa).toHaveBeenCalled();
    });

    it('Deve higienizar conteúdo de arquivos', async () => {
      controller.higieniza();
      expect(higienizacaoService.executa).toHaveBeenCalled();
    });

    it('Deve excluir arquivos no ECM', async () => {
      controller.exclui();
      expect(exclusaoService.executa).toHaveBeenCalled();
    });
  });
});
