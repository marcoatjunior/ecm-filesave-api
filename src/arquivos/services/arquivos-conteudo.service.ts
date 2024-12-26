import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArquivoConteudoEntity } from 'src/arquivos/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ArquivosConteudoService {
  constructor(
    @InjectRepository(ArquivoConteudoEntity)
    private repository: Repository<ArquivoConteudoEntity>,
  ) {}

  async exclui(id: string): Promise<void> {
    this.repository.delete({ id });
  }
}
