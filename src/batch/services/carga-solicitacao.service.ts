// import * as faker from 'faker';
import { Injectable, Logger } from '@nestjs/common';
import { batch } from 'src/common/resources';
// import { criaSolicitacoes } from 'src/config/database/factories';
import { SolicitacaoEntity } from 'src/solicitacoes/entities';
import { SolicitacoesService } from 'src/solicitacoes/services';

@Injectable()
export class CargaSolicitacaoService {
  private readonly logger = new Logger(CargaSolicitacaoService.name);

  constructor(private solicitacoesService: SolicitacoesService) {}

  async executa(): Promise<void> {
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaIniciada));

    // const solicitacoes = faker.helpers.multiple(criaSolicitacoes, {
    //   count: {
    //     min: 5,
    //     max: 20,
    //   },
    // });

    // solicitacoes.forEach((solicitacao: SolicitacaoEntity) =>
    //   this.solicitacoesService.salva(solicitacao),
    // );

    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaFinalizada));
  }

  private criaLogPeriodo(log: string): string {
    return log.replace('{data}', new Date().toLocaleString('pt-BR'));
  }
}
