import { Injectable } from '@nestjs/common';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { ArquivoInclusaoModel } from '../models';
import { ArquivoEntity } from './../entities';

@Injectable()
export class ArquivoSerializer extends BaseSerializer<
  ArquivoInclusaoModel,
  ArquivoEntity
> {
  fromModel(model: ArquivoInclusaoModel): ArquivoEntity {
    const entity = super.fromModel(model);
    entity.nome = model.nome;
    entity.numeroBytes = model.conteudo.size;
    return entity;
  }
}
