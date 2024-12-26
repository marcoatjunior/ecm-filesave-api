import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { SolicitacaoEntity } from '../entities';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(SolicitacaoEntity)
    private repository: Repository<SolicitacaoEntity>,
  ) {}

  async listaAtivas(sistema: string): Promise<SolicitacaoEntity[]> {
    return this.repository.find({
      relations: ['arquivo'],
      where: {
        sistema,
        dataHoraExpiracao: LessThanOrEqual(new Date()),
      },
    });
  }

  async salva(arquivo: SolicitacaoEntity): Promise<SolicitacaoEntity> {
    return this.repository.save(arquivo);
  }
}
