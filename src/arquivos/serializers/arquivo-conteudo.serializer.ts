import { InformacoesEntity } from 'src/common/entities';
import { BaseSerializer } from 'src/common/serializers/base.serializer';
import { ArquivoConteudoEntity } from '../entities';
import { ArquivoInclusaoModel } from '../models';

export class ArquivoConteudoSerializer extends BaseSerializer<
  ArquivoInclusaoModel,
  ArquivoConteudoEntity
> {
  fromModel(dto: ArquivoInclusaoModel): ArquivoConteudoEntity {
    const entity = super.fromModel(dto);
    entity.idArquivo = dto.id;
    entity.conteudo = dto.conteudo.buffer;
    entity.organizacao = dto.organizacao;
    entity.sistema = dto.sistema;
    this.populaInformacoes(entity, dto);
    return entity;
  }

  private populaInformacoes(
    entity: ArquivoConteudoEntity,
    dto: ArquivoInclusaoModel,
  ) {
    entity.informacoes = {
      nome: dto.nome,
      tipo: dto.tipo,
      extras: dto.extras,
    } as InformacoesEntity;
  }
}
