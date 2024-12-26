import { Injectable, Logger } from '@nestjs/common';
import { ArquivoEntity } from 'src/arquivos/entities';
import { SituacaoEcmEnum } from 'src/arquivos/enums';
import { ArquivosService } from 'src/arquivos/services';
import { batch } from 'src/common/resources';
import { NodeEntry } from 'src/config/alfresco/interfaces';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { BatchConstants } from '../constants';

@Injectable()
export class TransmissaoEcmService {
  private readonly logger = new Logger(TransmissaoEcmService.name);

  constructor(
    private arquivosService: ArquivosService,
    private alfrescoService: AlfrescoNodeService,
  ) {}

  async executa(): Promise<void> {
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaIniciada));
    this.transmite();
    this.logger.warn(this.criaLogPeriodo(batch.execucaoRotinaFinalizada));
  }

  private transmite() {
    this.arquivosService
      .listaPorSituacao(SituacaoEcmEnum.PENDENTE)
      .then((arquivos) =>
        arquivos.forEach((arquivo) => this.incluiAlfresco(arquivo)),
      );
  }

  private async incluiAlfresco(arquivo: ArquivoEntity): Promise<void> {
    const { conteudo } = arquivo;
    const { nome, tipo } = conteudo.informacoes;

    this.alfrescoService
      .upload(`${nome}.${tipo}`, conteudo.sistema, conteudo.conteudo)
      .then(({ entry }) => this.atualizaSituacao(arquivo, entry));

    Logger.debug(`Arquivo ${arquivo.id} transmitido no repositório ECM.`);
  }

  private atualizaSituacao(
    arquivo: ArquivoEntity,
    entry: NodeEntry,
  ): ArquivoEntity | PromiseLike<ArquivoEntity> {
    return this.arquivosService.salva({
      ...arquivo,
      idEcm: entry.id,
      situacao: SituacaoEcmEnum.ENVIADO,
      dataHoraTransmissao: new Date(),
      usuarioAtualizacao: BatchConstants.USUARIO_BATCH,
    });
  }

  private criaLogPeriodo(log: string): string {
    return log.replace('{data}', new Date().toLocaleString('pt-BR'));
  }
}
