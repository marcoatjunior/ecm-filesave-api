import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { ArquivoInclusaoModel } from '../models';
import { ArquivoEntity } from './../entities';

export class ArquivoSerializer extends BaseSerializer<
  ArquivoInclusaoModel,
  ArquivoEntity
> {
  fromModel(dto: ArquivoInclusaoModel): ArquivoEntity {
    const entity = super.fromModel(dto);
    entity.nome = dto.nome;
    entity.numeroBytes = dto.conteudo.size;
    return entity;
  }
}
