import { Injectable, Logger } from '@nestjs/common';
import { batch } from 'src/common/resources';
import {
  SolicitacoesArquivoService,
  SolicitacoesService,
} from 'src/solicitacoes/services';

@Injectable()
export class ExpiracaoSolicitacaoService {
  private readonly logger = new Logger(ExpiracaoSolicitacaoService.name);

  constructor(
    private solicitacoesService: SolicitacoesService,
    private arquivosService: SolicitacoesArquivoService,
  ) {}

  async executa(): Promise<void> {
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaIniciada));
    this.exclui();
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaFinalizada));
  }

  private exclui() {
    this.solicitacoesService.listaExpiradas().then((solicitacoes) =>
      solicitacoes.forEach(async (solicitacao) => {
        solicitacao.arquivos.forEach(
          async (arquivo) => await this.arquivosService.exclui(arquivo.id),
        );
        await this.solicitacoesService.exclui(solicitacao.id);
        Logger.debug(
          `Solicitação ${solicitacao.id} excluída por data de expiração.`,
        );
      }),
    );
  }

  private criaLogPeriodo(log: string): string {
    return log.replace('{data}', new Date().toLocaleString('pt-BR'));
  }
}
