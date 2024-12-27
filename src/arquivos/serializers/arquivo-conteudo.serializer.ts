import { Injectable } from '@nestjs/common';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { ArquivoConteudoEntity } from '../entities';
import { ArquivoModel } from '../models';

@Injectable()
export class ArquivoConteudoSerializer extends BaseSerializer<
  ArquivoModel,
  ArquivoConteudoEntity
> {
  fromModel(model: ArquivoModel): ArquivoConteudoEntity {
    const entity = super.fromModel(model);
    entity.conteudo = model.conteudo.buffer;
    entity.organizacao = model.organizacao;
    entity.sistema = model.sistema;
    entity.informacoes = { nome: model.nome, tipo: model.tipo };
    return entity;
  }
}
