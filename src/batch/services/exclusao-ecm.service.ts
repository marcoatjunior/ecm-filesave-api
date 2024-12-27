import { Injectable, Logger } from '@nestjs/common';
import { ArquivoEntity } from 'src/arquivos/entities';
import { SituacaoEcmEnum } from 'src/arquivos/enums';
import { ArquivosService } from 'src/arquivos/services';
import { batch } from 'src/common/resources';
import { AlfrescoNodeService } from 'src/config/alfresco/services';

@Injectable()
export class ExclusaoEcmService {
  private readonly logger = new Logger(ExclusaoEcmService.name);

  constructor(
    private arquivosService: ArquivosService,
    private alfrescoService: AlfrescoNodeService,
  ) {}

  async executa(): Promise<void> {
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaIniciada));
    this.exclui();
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaFinalizada));
  }

  private exclui() {
    this.arquivosService
      .listaPorSituacao(SituacaoEcmEnum.DELETADO)
      .then((arquivos) =>
        arquivos.forEach((arquivo) => this.excluiAlfresco(arquivo)),
      );
  }

  private async excluiAlfresco(arquivo: ArquivoEntity): Promise<void> {
    this.alfrescoService
      .exclui(arquivo.idEcm)
      .then(() => this.arquivosService.exclui(arquivo.id));
    Logger.debug(`Arquivo ${arquivo.id} excluído no repositório ECM.`);
  }

  private criaLogPeriodo(log: string): string {
    return log.replace('{data}', new Date().toLocaleString('pt-BR'));
  }
}
