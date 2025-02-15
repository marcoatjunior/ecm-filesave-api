import { ApiProperty } from '@nestjs/swagger';
import { SolicitacaoArquivoModel } from './solicitacao-arquivo.model';

export class SolicitacaoModel {
  id: string;

  @ApiProperty({ required: true, example: 'ESCOLA ABC' })
  organizacao: string;

  @ApiProperty({ required: true, example: 'ABC Aluno' })
  sistema: string;

  @ApiProperty({
    required: true,
    type: () => [SolicitacaoArquivoModel],
    description: 'Lista de Arquivos',
  })
  arquivos: SolicitacaoArquivoModel[];
}
