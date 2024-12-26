import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquivoConteudoEntity, ArquivoEntity } from 'src/arquivos/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ArquivosConteudoService {
  constructor(
    @InjectRepository(ArquivoConteudoEntity)
    private repository: Repository<ArquivoConteudoEntity>,
  ) {}

  async inclui(arquivo: ArquivoEntity): Promise<ArquivoConteudoEntity> {
    const { id, conteudo } = arquivo;
    return this.repository.save({ ...conteudo, idArquivo: id });
  }
}
