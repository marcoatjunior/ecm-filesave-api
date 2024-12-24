import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquivoConteudoEntity } from 'src/arquivos/entities';
import { Repository } from 'typeorm';
import { ArquivoInclusaoModel } from '../models';
import { ArquivoConteudoSerializer } from '../serializers';

@Injectable()
export class ArquivosConteudoService {
  constructor(
    @InjectRepository(ArquivoConteudoEntity)
    private repository: Repository<ArquivoConteudoEntity>,
    private serializer: ArquivoConteudoSerializer,
  ) {}

  async inclui(model: ArquivoInclusaoModel): Promise<ArquivoConteudoEntity> {
    const entity = this.serializer.fromModel(model);
    return this.repository.save(entity);
  }
}
