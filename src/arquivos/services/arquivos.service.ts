import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async listaPendentesTransmissao(): Promise<ArquivoEntity[]> {
    return this.repository.find({
      relations: ['conteudo'],
      where: { situacao: SituacaoEcmEnum.PENDENTE },
    });
  }

  async consulta(id: string): Promise<ArquivoEntity> {
    return this.repository.findOne({ where: { id } });
  }

  async download(id: string): Promise<StreamableFile> {
    return this.consulta(id).then(({ idEcm }) =>
      this.alfrescoService.download(idEcm),
    );
  }

  async exclui(id: string): Promise<void> {
    this.consulta(id)
      .then((arquivo) =>
        this.salva({ ...arquivo, situacao: SituacaoEcmEnum.DELETADO }),
      )
      .then(({ idEcm }) => this.alfrescoService.exclui(idEcm));
  }

  async salva(arquivo: ArquivoEntity): Promise<ArquivoEntity> {
    return this.repository.save(arquivo);
  }
}
