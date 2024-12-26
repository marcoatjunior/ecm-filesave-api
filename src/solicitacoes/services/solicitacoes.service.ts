import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitacaoEntity } from '../entities';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(SolicitacaoEntity)
    private repository: Repository<SolicitacaoEntity>,
  ) {}

  async salva(arquivo: SolicitacaoEntity): Promise<SolicitacaoEntity> {
    return this.repository.save(arquivo);
  }
}
