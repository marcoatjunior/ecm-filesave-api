import { Injectable, Logger } from '@nestjs/common';
import { ArquivoConteudoEntity } from 'src/arquivos/entities';
import { SituacaoEcmEnum } from 'src/arquivos/enums';
import {
  ArquivosConteudoService,
  ArquivosService,
} from 'src/arquivos/services';
import { batch } from 'src/common/resources';

@Injectable()
export class HigienizacaoEcmService {
  private readonly logger = new Logger(HigienizacaoEcmService.name);

  constructor(
    private arquivosService: ArquivosService,
    private conteudosService: ArquivosConteudoService,
  ) {}

  async executa(): Promise<void> {
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaIniciada));
    this.higieniza();
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaFinalizada));
  }

  private higieniza() {
    this.arquivosService
      .listaPorSituacao(SituacaoEcmEnum.ENVIADO)
      .then((arquivos) =>
        arquivos.forEach(({ conteudo }) => this.limpaConteudo(conteudo)),
      );
  }

  private async limpaConteudo(arquivo: ArquivoConteudoEntity): Promise<void> {
    this.conteudosService.exclui(arquivo.id);
    Logger.debug(`Arquivo ${arquivo.id} higienizado na tabela de conteúdo.`);
  }

  private criaLogPeriodo(log: string): string {
    return log.replace('{data}', new Date().toLocaleString('pt-BR'));
  }
}
