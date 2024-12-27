import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as qrcode from 'qrcode';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { SolicitacaoEntity } from '../entities';
import { BusinessViolationException } from 'src/common/exceptions';
import { validacoes } from 'src/common/resources';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(SolicitacaoEntity)
    private repository: Repository<SolicitacaoEntity>,
  ) {}

  async listaAtivas(sistema: string): Promise<SolicitacaoEntity[]> {
    return this.repository.find({
      relations: ['arquivos'],
      where: {
        sistema,
        dataHoraExpiracao: MoreThanOrEqual(new Date()),
      },
    });
  }

  async consulta(id: string): Promise<SolicitacaoEntity> {
    const solicitacao = await this.repository.findOne({
      relations: ['arquivos'],
      where: { id },
    });
    if (!solicitacao) {
      throw new BusinessViolationException(validacoes.solicitacaoNaoEncontrada);
    }
    return solicitacao;
  }

  async geraQrCode(id: string): Promise<StreamableFile> {
    return this.consulta(id).then(async (solicitacao) => {
      const imagem: Buffer = await qrcode.toBuffer(
        JSON.stringify(solicitacao),
        { width: 512 },
      );
      return new StreamableFile(imagem);
    });
  }

  async salva(arquivo: SolicitacaoEntity): Promise<SolicitacaoEntity> {
    return this.repository.save(arquivo);
  }
}
