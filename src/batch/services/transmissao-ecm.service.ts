import { Injectable, Logger } from '@nestjs/common';
import { ArquivoEntity } from 'src/arquivos/entities';
import { SituacaoEcmEnum } from 'src/arquivos/enums';
import { ArquivosService } from 'src/arquivos/services';
import { NodeEntry } from 'src/config/alfresco/interfaces';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { BatchConstants } from '../constants';

@Injectable()
export class TransmissaoEcmService {
  constructor(
    private arquivosService: ArquivosService,
    private alfrescoService: AlfrescoNodeService,
  ) {}

  async transmite(): Promise<void> {
    Logger.log(`Rotina de transmissão de arquivos iniciada às ${new Date()}.`);

    this.arquivosService
      .listaPendentesTransmissao()
      .then((arquivos) =>
        arquivos.forEach((arquivo) => this.incluiAlfresco(arquivo)),
      );

    Logger.log(
      `Rotina de transmissão de arquivos finalizada às ${new Date()}.`,
    );
  }

  private async incluiAlfresco(arquivo: ArquivoEntity): Promise<void> {
    Logger.debug(`Arquivo ${arquivo.id} em transmissão ao repositório ECM.`);

    const { conteudo } = arquivo;
    const { nome, tipo } = conteudo.informacoes;

    this.alfrescoService
      .upload(`${nome}.${tipo}`, conteudo.sistema)
      .then(({ entry }) =>
        this.alfrescoService.atualiza(entry.id, conteudo.conteudo),
      )
      .then(({ entry }) => this.atualizaSituacao(arquivo, entry));

    Logger.debug(`Arquivo ${arquivo.id} incluído no repositório ECM.`);
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
}
