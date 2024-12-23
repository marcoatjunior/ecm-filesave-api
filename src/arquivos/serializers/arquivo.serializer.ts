import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { ArquivoInclusaoModel } from '../models';
import { ArquivoEntity } from './../entities';

export class ArquivoSerializer extends BaseSerializer<
  ArquivoInclusaoModel,
  ArquivoEntity
> {
  fromDto(dto: ArquivoInclusaoModel): ArquivoEntity {
    const entity = super.fromDto(dto);
    entity.nome = dto.nome;
    return entity;
  }
}
