import { Injectable } from '@nestjs/common';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { SolicitacaoModel } from '../models';
import { SolicitacaoEntity } from './../entities';

@Injectable()
export class SolicitacaoSerializer extends BaseSerializer<
  SolicitacaoModel,
  SolicitacaoEntity
> {
  fromModel(model: SolicitacaoModel): SolicitacaoEntity {
    const entity = super.fromModel(model);
    entity.organizacao = model.organizacao;
    entity.sistema = model.sistema;
    this.populaDataHoraExpiracao(entity);
    return entity;
  }

  private populaDataHoraExpiracao(entity: SolicitacaoEntity): void {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 15);
    entity.dataHoraExpiracao = date;
  }
}
