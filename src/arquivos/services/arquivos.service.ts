import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ArquivoConteudoEntity, ArquivoEntity } from '../entities';
import { SituacaoEcmEnum } from '../enums';
import { ArquivoInclusaoModel } from '../models';
import { ArquivoSerializer } from '../serializers';
import { ArquivosConteudoService } from './arquivos-conteudo.service';

@Injectable()
export class ArquivosService {
  constructor(
    @InjectRepository(ArquivoEntity)
    private repository: Repository<ArquivoEntity>,
    private serializer: ArquivoSerializer,
    private conteudoService: ArquivosConteudoService,
    private alfrescoService: AlfrescoNodeService,
  ) {}

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
      .then(({ idEcm }) => this.alfrescoService.exclui(idEcm))
      .then(() => this.altera(id, { situacao: SituacaoEcmEnum.DELETADO }));
  }

  async altera(
    id: string,
    partial: QueryDeepPartialEntity<ArquivoEntity>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, partial);
  }

  async inclui(model: ArquivoInclusaoModel): Promise<string> {
    return this.repository
      .save(this.serializer.fromModel(model))
      .then(({ id }) => this.conteudoService.inclui({ ...model, id }))
      .then((arquivo) => this.incluiAlfresco(arquivo));
  }

  private async incluiAlfresco(arquivo: ArquivoConteudoEntity) {
    const { nome, tipo } = arquivo.informacoes;
    return this.alfrescoService
      .upload(`${nome}.${tipo}`, arquivo.sistema)
      .then(({ entry }) =>
        this.alfrescoService.atualiza(entry.id, arquivo.conteudo),
      )
      .then(({ entry }) =>
        this.altera(arquivo.id, {
          ...arquivo,
          idEcm: entry.id,
          situacao: SituacaoEcmEnum.ENVIADO,
          dataHoraAtualizacao: new Date(),
        }),
      )
      .then(() => arquivo.idArquivo);
  }
}
