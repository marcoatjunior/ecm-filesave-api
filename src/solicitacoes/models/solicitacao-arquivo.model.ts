import { ApiProperty } from '@nestjs/swagger';

export class SolicitacaoArquivoModel {
  id: string;

  @ApiProperty({
    required: true,
    example: 'MANUAL TCC PÓS DESENVOLVIMENTO FULL STACK',
  })
  nome: string;

  @ApiProperty({ required: true, example: 'pdf' })
  tipo: string;
}
