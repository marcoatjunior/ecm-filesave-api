import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessViolationException } from 'src/common/exceptions';
import { validacoes } from 'src/common/resources';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { Repository } from 'typeorm';
import { ArquivoEntity } from '../entities';
import { SituacaoEcmEnum } from '../enums';

@Injectable()
export class ArquivosService {
  constructor(
    @InjectRepository(ArquivoEntity)
    private repository: Repository<ArquivoEntity>,
    private alfrescoService: AlfrescoNodeService,
  ) {}

  async listaPorSituacao(situacao: SituacaoEcmEnum): Promise<ArquivoEntity[]> {
    return this.repository.find({
      relations: ['conteudo'],
      where: { situacao },
    });
  }

  async consultaEnviado(id: string): Promise<ArquivoEntity> {
    const arquivo = await this.repository.findOne({
      where: { id, situacao: SituacaoEcmEnum.ENVIADO },
    });
    if (!arquivo) {
      throw new BusinessViolationException(validacoes.arquivoNaoExiste);
    }
    return arquivo;
  }

  async download(id: string): Promise<StreamableFile> {
    return this.consultaEnviado(id).then((arquivo) =>
      this.alfrescoService.download(arquivo.idEcm),
    );
  }

  async remove(id: string): Promise<void> {
    return this.consultaEnviado(id)
      .then((arquivo) =>
        this.salva({ ...arquivo, situacao: SituacaoEcmEnum.DELETADO }),
      )
      .then(() => void {});
  }

  async exclui(id: string): Promise<void> {
    this.repository.delete({ id });
  }

  async salva(arquivo: ArquivoEntity): Promise<ArquivoEntity> {
    return this.repository.save(arquivo);
  }
}
