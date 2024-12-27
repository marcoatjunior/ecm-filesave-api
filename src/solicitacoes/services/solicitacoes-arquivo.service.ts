import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitacaoArquivoEntity } from '../entities';

@Injectable()
export class SolicitacoesArquivoService {
  constructor(
    @InjectRepository(SolicitacaoArquivoEntity)
    private repository: Repository<SolicitacaoArquivoEntity>,
  ) {}

  async exclui(id: string): Promise<void> {
    this.repository.delete({ id });
  }
}
