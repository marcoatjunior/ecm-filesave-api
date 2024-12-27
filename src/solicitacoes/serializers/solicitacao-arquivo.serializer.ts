import { Injectable } from '@nestjs/common';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { SolicitacaoArquivoEntity } from '../entities';
import { SolicitacaoArquivoModel } from '../models';

@Injectable()
export class SolicitacaoArquivoSerializer extends BaseSerializer<
  SolicitacaoArquivoModel,
  SolicitacaoArquivoEntity
> {
  fromModel(model: SolicitacaoArquivoModel): SolicitacaoArquivoEntity {
    const entity = super.fromModel(model);
    entity.informacoes = { nome: model.nome, tipo: model.tipo };
    return entity;
  }
}
