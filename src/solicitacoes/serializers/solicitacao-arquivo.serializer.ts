import { Injectable } from '@nestjs/common';
import { InformacoesEntity } from 'src/common/entities';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { SolicitacaoArquivoEntity } from '../entities';
import { SolicitacaoModel } from '../models';

@Injectable()
export class SolicitacaoArquivoSerializer extends BaseSerializer<
  SolicitacaoModel,
  SolicitacaoArquivoEntity
> {
  fromModel(model: SolicitacaoModel): SolicitacaoArquivoEntity {
    const entity = super.fromModel(model);
    this.populaInformacoes(entity, model);
    return entity;
  }

  private populaInformacoes(
    entity: SolicitacaoArquivoEntity,
    model: SolicitacaoModel,
  ) {
    entity.informacoes = {
      nome: model.nome,
      tipo: model.tipo,
      extras: model.extras,
    } as InformacoesEntity;
  }
}
