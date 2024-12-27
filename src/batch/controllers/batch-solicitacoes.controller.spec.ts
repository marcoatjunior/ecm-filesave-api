import { Test } from '@nestjs/testing';
import { ExpiracaoSolicitacaoService } from '../services';
import { BatchSolicitacoesController } from './batch-solicitacoes.controller';

describe('BatchSolicitacoesController', () => {
  let controller: BatchSolicitacoesController;
  let expiracacaoService = {
    executa: jest.fn().mockReturnValue(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BatchSolicitacoesController],
    })
      .useMocker((token) => {
        if (token === ExpiracaoSolicitacaoService) {
          return expiracacaoService;
        }
      })
      .compile();

    controller = moduleRef.get(BatchSolicitacoesController);
  });

  describe('Deve realizar chamadas de rotinas batch', () => {
    it('Deve remover solicitações expiradas', async () => {
      controller.transmite();
      expect(expiracacaoService.executa).toHaveBeenCalled();
    });
  });
});
