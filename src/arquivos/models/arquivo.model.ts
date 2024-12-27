import { ApiProperty } from '@nestjs/swagger';

export class ArquivoModel {
  id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
    example: 'Selecione um arquivo',
  })
  conteudo: Express.Multer.File;

  @ApiProperty({ required: true, example: 'PUCRS' })
  organizacao: string;

  @ApiProperty({ required: true, example: 'POS-GRAD' })
  sistema: string;

  @ApiProperty({
    required: true,
    example: 'MANUAL TCC PÓS DESENVOLVIMENTO FULL STACK',
  })
  nome: string;

  @ApiProperty({ required: true, example: 'pdf' })
  tipo: string;
}
