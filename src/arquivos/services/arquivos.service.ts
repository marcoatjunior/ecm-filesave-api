import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { Repository } from 'typeorm';
import { ArquivoConteudoEntity, ArquivoEntity } from '../entities';
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

  async inclui(dto: ArquivoInclusaoModel): Promise<string> {
    const entity = this.serializer.fromDto(dto);
    return this.repository
      .save(entity)
      .then((arquivo) => this.incluiConteudo(dto, arquivo))
      .then(async (arquivo) => await this.incluiAlfresco(arquivo));
  }

  private incluiConteudo(
    dto: ArquivoInclusaoModel,
    arquivo: ArquivoEntity,
  ): ArquivoConteudoEntity | PromiseLike<ArquivoConteudoEntity> {
    return this.conteudoService.inclui({ ...dto, idArquivo: arquivo.id });
  }

  private async incluiAlfresco(arquivo: ArquivoConteudoEntity) {
    const { idArquivo, conteudo, informacoes, sistema } = arquivo;
    const { nome, tipo } = informacoes;
    const { entry } = await this.alfrescoService.upload(
      `${nome}.${tipo}`,
      sistema,
    );
    this.alfrescoService.atualizaConteudo(entry.id, conteudo);
    return idArquivo;
  }
}
