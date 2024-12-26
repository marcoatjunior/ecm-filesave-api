import { InformacoesEntity } from 'src/common/entities';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { ArquivoConteudoEntity } from '../entities';
import { ArquivoInclusaoModel } from '../models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArquivoConteudoSerializer extends BaseSerializer<
  ArquivoInclusaoModel,
  ArquivoConteudoEntity
> {
  fromModel(model: ArquivoInclusaoModel): ArquivoConteudoEntity {
    const entity = super.fromModel(model);
    entity.conteudo = model.conteudo.buffer;
    entity.organizacao = model.organizacao;
    entity.sistema = model.sistema;
    this.populaInformacoes(entity, model);
    return entity;
  }

  private populaInformacoes(
    entity: ArquivoConteudoEntity,
    model: ArquivoInclusaoModel,
  ) {
    entity.informacoes = {
      nome: model.nome,
      tipo: model.tipo,
      extras: model.extras,
    } as InformacoesEntity;
  }
}
